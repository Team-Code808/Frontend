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
        if (!stompClient.connected) {
            console.log('STOMP client is not connected yet. Waiting...');
            return;
        }

        console.log(`Subscribing to room: ${currentRoomId}`);
        let subscription;

        try {
            subscription = stompClient.subscribe(
                `/sub/chat/room/${currentRoomId}`,
                (message) => {
                    const receivedMsg = JSON.parse(message.body);
                    console.log('Received message:', receivedMsg);
                    addMessage(receivedMsg);
                }
            );
        } catch (error) {
            console.error("Subscription failed:", error);
            // 구독 실패 시 (연결 끊김 등) isConnected 상태 업데이트 시도
            if (error.message.includes("no underlying STOMP connection")) {
                setIsConnected(false);
                setStompClient(null);
            }
        }

        return () => {
            console.log(`Unsubscribing from room: ${currentRoomId}`);
            if (subscription) {
                try {
                    subscription.unsubscribe();
                } catch (e) {
                    console.error('Failed to unsubscribe:', e);
                }
            }
        };
    }, [currentRoomId, addMessage, isConnected, stompClient]);

    return stompClient;
};

export default useWebSocket;
