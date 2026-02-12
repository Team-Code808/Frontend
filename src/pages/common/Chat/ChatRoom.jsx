import React, { useEffect, useState, useRef } from 'react';
import useStore from '../../../store/useStore';
import { ChatArea, MessageList, MessageBubble, InputArea, DateSeparator } from './Chat.styles';
import axios from '../../../api/axios';

const ChatRoom = ({ isDark }) => {
    const {
        currentRoomId,
        messages,
        setMessages,
        stompClient,
        isConnected,
        chatRooms
    } = useStore(state => state.chat);

    // 현재 로그인한 사용자 정보 가져오기 (Auth Store)
    const { user } = useStore();
    // user 객체에는 memberId, email, name 등 포함
    // 메시지 렌더링 시 user.memberId와 msg.senderId를 비교하여 '나의 메시지'인지 식별하는 데 사용됨.

    // 현재 채팅방 이름 가져오기
    const getCurrentRoomName = () => {
        if (!chatRooms || !currentRoomId) return '';
        const room = chatRooms.find(r => r.roomId === currentRoomId);
        const roomName = room ? room.name : '';

        if (!roomName || !user?.name) return roomName;
        const names = roomName.split(',').map(n => n.trim());
        const filteredNames = names.filter(n => n !== user.name);
        return filteredNames.length > 0 ? filteredNames.join(', ') : roomName;
    };

    const currentRoomName = getCurrentRoomName();

    const [inputText, setInputText] = useState('');
    const messageEndRef = useRef(null);

    // 채팅방 변경 시 이전 기록 가져오기
    useEffect(() => {
        if (!currentRoomId) return;

        console.log('Current Room ID changed:', currentRoomId);
        console.log('Current User:', user);

        const fetchHistory = async () => {
            try {
                console.log(`Fetching history for room ${currentRoomId}...`);
                const response = await axios.get(`/chat/history/${currentRoomId}`);
                console.log('Chat history fetched:', response.data);
                setMessages(response.data);
            } catch (error) {
                console.error('Failed to fetch chat history:', error);
            }
        };

        fetchHistory();
    }, [currentRoomId, setMessages, user]);

    // 메시지 리스트 스크롤 하단 고정
    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputText.trim() || !stompClient || !isConnected) return;

        const message = {
            roomId: currentRoomId,
            content: inputText,
        };

        console.log('Sending message:', message);
        stompClient.publish({
            destination: '/pub/chat/message',
            body: JSON.stringify(message),
        });

        setInputText('');
    };

    // 시간 포맷팅 헬퍼 함수
    const formatTime = (timeString) => {
        if (!timeString) return '';
        const date = new Date(timeString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    // 날짜 포맷팅 헬퍼 함수 (YYYY년 MM월 DD일)
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{
                padding: '20px',
                borderBottom: `1px solid ${isDark ? '#334155' : '#f0f0f0'}`,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                color: isDark ? '#f1f5f9' : 'inherit'
            }}>
                {/* 현재 채팅방 이름이나 상대방 이름 표시 */}
                <h3 style={{ margin: 0 }}>
                    {currentRoomName ? `${currentRoomName}님과의 채팅방` : `채팅방 ${currentRoomId && `(${currentRoomId})`}`}
                </h3>
                <div style={{ fontSize: '0.8rem', color: isConnected ? (isDark ? '#4ade80' : 'green') : (isDark ? '#f87171' : 'red') }}>
                    {isConnected ? '● 연결됨' : '○ 연결 중...'}
                </div>
            </div>
            <MessageList $isDark={isDark}>
                {messages.map((msg, index) => {
                    // msg.senderId와 user.memberId (또는 user.id) 비교
                    const myId = user?.memberId || user?.id; // user might be null initially
                    // Ensure robust comparison (string vs number)
                    const isMe = user && (String(myId) === String(msg.senderId));

                    // 날짜 변경 확인 로직
                    const currentDate = new Date(msg.createdDate).toDateString();
                    const prevDate = index > 0 ? new Date(messages[index - 1].createdDate).toDateString() : null;
                    const showDateSeparator = index === 0 || currentDate !== prevDate;

                    return (
                        <React.Fragment key={msg.id || index}>
                            {showDateSeparator && (
                                <DateSeparator $isDark={isDark}>
                                    {formatDate(msg.createdDate)}
                                </DateSeparator>
                            )}
                            <MessageBubble $isMe={isMe} $isDark={isDark}>
                                {!isMe && <div className="sender">{msg.senderName}</div>}
                                <div>{msg.content}</div>
                                <div className="time">{formatTime(msg.createdDate)}</div>
                            </MessageBubble>
                        </React.Fragment>
                    );
                })}
                <div ref={messageEndRef} />
            </MessageList>
            <InputArea onSubmit={handleSendMessage} $isDark={isDark}>
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={isConnected ? "메시지를 입력하세요..." : "연결 중입니다..."}
                    disabled={!isConnected}
                />
                <button type="submit" disabled={!inputText.trim() || !isConnected}>
                    전송
                </button>
            </InputArea>
        </div>
    );
};

export default ChatRoom;
