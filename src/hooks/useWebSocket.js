import { useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import useStore from '../store/useStore';
import { API_URL } from '../Config';
import { tokenManager } from '../utils/tokenManager';

const useWebSocket = () => {
    // Auth slice에서 토큰을 가져오지 않고 tokenManager 사용 (zustand persist 문제 방지)
    const {
        setIsConnected,
        setStompClient,
        addMessage,
        currentRoomId,
        isConnected,
        stompClient // Store에서 가져옴
    } = useStore((state) => state.chat);

    const user = useStore((state) => state.user);

    // clientRef는 connection effect 내부에서만 인스턴스 관리를 위해 사용
    // (Strict Mode 대응 및 cleanup 시점 관리)
    const clientRef = useRef(null);

    useEffect(() => {
        const token = tokenManager.getAccessToken();

        // 토큰이 없으면 연결하지 않음
        if (!token) return;

        // 이미 연결되어 있고 활성화 상태라면 패스
        if (clientRef.current && clientRef.current.active) return;

        // 스토어에 이미 클라이언트가 있고 연결된 상태라면 패스 (새로고침이 아닌 리렌더링 시)
        // 하지만 stompClient 객체의 상태를 신뢰할 수 있는지 확인 필요
        if (stompClient && stompClient.connected) {
            clientRef.current = stompClient;
            return;
        }

        const brokerURL = API_URL.replace('http', 'ws') + '/ws-stomp';

        const client = new Client({
            brokerURL: brokerURL,
            connectHeaders: {
                Authorization: `Bearer ${token}`,
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            onConnect: () => {
                console.log('Connected to WebSocket');
                setIsConnected(true);
                setStompClient(client);
            },
            onStompError: (frame) => {
                console.error('Broker reported error: ' + frame.headers['message']);
                console.error('Additional details: ' + frame.body);
            },
            onWebSocketClose: () => {
                console.log('WebSocket connection closed');
                setIsConnected(false);
                setStompClient(null);
            }
        });

        client.activate();
        clientRef.current = client;

        return () => {
            // 컴포넌트 언마운트 시에만 연결 해제 (페이지 이동 등)
            // 의존성 배열에서 stompClient를 제거했으므로, 이 cleanup은 
            // 컴포넌트가 unmount 되거나 token이 바뀔 때만 실행됨.
            if (clientRef.current) {
                console.log("Deactivating WebSocket client...");
                clientRef.current.deactivate();
                clientRef.current = null;
                setIsConnected(false);
                setStompClient(null);
            }
        };
    }, [setIsConnected, setStompClient]); // stompClient 제거

    // 방이 변경될 때마다 해당 방 구독
    // clientRef 대신 store의 stompClient 사용
    useEffect(() => {
        if (!currentRoomId || !stompClient || !isConnected) return;

        // stompClient가 실제로 연결되어 있는지 확인
        if (!stompClient.connected) return;

        console.log(`Subscribing to room: ${currentRoomId}`);
        let subscription;
        let readSubscription;

        const { addMessage, updateReadStatus, updateChatList } = useStore.getState().chat;
        const user = useStore.getState().user; // hook 내부 user 대신 getState 사용 (useEffect 의존성 관리 단순화 위해, 또는 prop으로 받아야 함)
        // 하지만 hook 상단에서 user를 가져왔다면 의존성에 넣는 게 맞음.
        // 여기서는 위에서 const { user } = useStore(); 가 없으므로 추가 필요.

        try {
            subscription = stompClient.subscribe(
                `/sub/chat/room/${currentRoomId}`,
                (message) => {
                    console.log('STOMP Message Received:', message.body);
                    try {
                        const receivedMsg = JSON.parse(message.body);
                        console.log('Parsed Message:', receivedMsg);
                        addMessage(receivedMsg);
                    } catch (e) {
                        console.error('JSON Parse Error:', e);
                    }
                }
            );

            readSubscription = stompClient.subscribe(
                `/sub/chat/room/${currentRoomId}/read`,
                (message) => {
                    console.log('[useWebSocket] Read Event Received:', message.body);
                    const { fromMessageId, toMessageId } = JSON.parse(message.body);
                    updateReadStatus(fromMessageId, toMessageId);
                }
            );
        } catch (error) {
            console.error("Subscription failed:", error);
            if (error.message.includes("no underlying STOMP connection")) {
                setIsConnected(false);
                setStompClient(null);
            }
        }

        return () => {
            console.log(`Unsubscribing from room: ${currentRoomId}`);
            if (subscription) subscription.unsubscribe();
            if (readSubscription) readSubscription.unsubscribe();
        };
    }, [currentRoomId, isConnected, stompClient, setIsConnected, setStompClient]);

    // 사용자별 개인 채널 구독 (안 읽은 메시지 수 및 목록 갱신용)
    useEffect(() => {
        if (!stompClient || !isConnected) return;
        if (!stompClient.connected) return;

        const user = useStore.getState().user;
        if (!user || !user.email) return;

        console.log(`Subscribing to user topic: ${user.email}`);
        let userSubscription;
        let shopSubscription; // 상점 업데이트용 추가

        // Zustand 스토어는 평탄화되어 있으므로 직접 추출합니다.
        const { updateChatList, updateShopItems, setItems } = useStore.getState();

        try {
            userSubscription = stompClient.subscribe(
                `/sub/chat/user/${user.email}`,
                (message) => {
                    try {
                        const receivedMsg = JSON.parse(message.body);
                        updateChatList(receivedMsg);
                    } catch (e) {
                        console.error('JSON Parse Error in user topic:', e);
                    }
                }
            );

            // 💡 상점 업데이트 채널 구독 (/sub/shop/company/{companyId})
            if (user.companyId) {
                const companyId = parseInt(String(user.companyId).split(':')[0], 10);
                console.log(`Subscribing to shop topic: /sub/shop/company/${companyId}`);
                shopSubscription = stompClient.subscribe(
                    `/sub/shop/company/${companyId}`,
                    (message) => {
                        try {
                            const items = JSON.parse(message.body);
                            console.log('📦 Shop Update Received via WebSocket:', items);

                            // 1. 직원용 포인트몰 데이터 갱신
                            if (updateShopItems) updateShopItems(items);
                            // 2. 관리자용 기프티콘 관리 데이터 갱신
                            if (setItems) setItems(items);
                        } catch (e) {
                            console.error('JSON Parse Error in shop topic:', e);
                        }
                    }
                );
            }
        } catch (error) {
            console.error("Subscription failed:", error);
        }

        return () => {
            if (userSubscription) userSubscription.unsubscribe();
            if (shopSubscription) shopSubscription.unsubscribe();
        };
    }, [isConnected, stompClient, user?.email]);

    return stompClient;
};

export default useWebSocket;
