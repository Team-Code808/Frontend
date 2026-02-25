import React, { useEffect, useState, useRef } from 'react';
import useStore from '../../../store/useStore';
import { ChatArea, MessageList, MessageBubble, InputArea, DateSeparator, UnreadCount, MessageRow, MessageGroup, MessageActionsMenu } from './Chat.styles';
import axios from '../../../api/axios';
import { Pencil, Trash2 } from 'lucide-react';

const ChatRoom = ({ isDark }) => {
    const {
        currentRoomId,
        messages,
        setMessages,
        stompClient,
        isConnected,
        chatRooms
    } = useStore(state => state.chat);

    // 현재 로그인한 사용자 정보 가져오기
    const { user } = useStore();

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

    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const prevScrollHeightRef = useRef(null);
    const messageEndRef = useRef(null);

    const [inputText, setInputText] = useState('');
    const [editingMessageId, setEditingMessageId] = useState(null);
    const [editContent, setEditContent] = useState('');
    const [activeMessageId, setActiveMessageId] = useState(null); // 메뉴 표시용 ID

    // 채팅방 변경 시 초기 메시지 로드
    useEffect(() => {
        if (!currentRoomId) return;

        setMessages([]); // 메시지 초기화
        setHasMore(true);
        setIsLoading(false);

        fetchHistory(); // 초기 로드 (최신 메시지)
    }, [currentRoomId, setMessages]); // user 의존성 제거 (무한 루프 방지)

    const fetchHistory = async (lastId = null) => {
        if (!currentRoomId || isLoading) return;

        setIsLoading(true);
        try {
            const params = { size: 50 };
            if (lastId) {
                params.lastMessageId = lastId;
            }

            const response = await axios.get(`/chat/history/${currentRoomId}`, { params });
            const newMessages = response.data;

            if (newMessages.length < 50) {
                setHasMore(false);
            }

            // 현재 상태의 메시지 가져오기 (getState 사용)
            const currentMessages = useStore.getState().chat.messages;

            let updatedMessages;
            if (lastId) {
                // 과거 메시지 로드: 앞에 추가
                // 중복 제거
                const existingIds = new Set(currentMessages.map(m => m.id));
                const filteredNew = newMessages.filter(m => !existingIds.has(m.id));
                updatedMessages = [...filteredNew, ...currentMessages];
            } else {
                // 초기 로드: 그냥 설정 (또는 최신순으로 덮어쓰기)
                updatedMessages = newMessages;
            }

            setMessages(updatedMessages);

            // 초기 로드인 경우 맨 아래로 스크롤
            if (!lastId && newMessages.length > 0) {
                setTimeout(() => {
                    messageEndRef.current?.scrollIntoView();
                }, 0);
            }

            // 마지막 메시지 읽음 처리 (초기 로드 시에만)
            if (!lastId && newMessages.length > 0) {
                const lastMessage = newMessages[newMessages.length - 1];
                markAsRead(lastMessage.id);
            }

        } catch (error) {
            console.error('Failed to fetch chat history:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleScroll = (e) => {
        const { scrollTop, scrollHeight } = e.target;

        // 맨 위로 스크롤 시 이전 메시지 로드
        if (scrollTop === 0 && hasMore && !isLoading && messages.length > 0) {
            prevScrollHeightRef.current = scrollHeight; // 현재 스크롤 높이 저장
            const firstMessageId = messages[0].id;
            fetchHistory(firstMessageId);
        }
    };

    // 메시지 추가 시 스크롤 위치 조정 (과거 메시지 로드 시)
    useEffect(() => {
        if (prevScrollHeightRef.current) {
            const messageList = document.querySelector('.message-list-container');
            if (messageList) {
                const newScrollHeight = messageList.scrollHeight;
                const scrollDiff = newScrollHeight - prevScrollHeightRef.current;
                messageList.scrollTop = scrollDiff;
                prevScrollHeightRef.current = null;
            }
        }
    }, [messages]);

    const [lastMarkedReadId, setLastMarkedReadId] = useState(null);

    const lastMessageIdRef = useRef(null);

    // 새 메시지 수신 시 스크롤 하단 이동 및 읽음 처리
    useEffect(() => {
        if (messages.length > 0) {
            const lastMessage = messages[messages.length - 1];
            const isNewMessage = lastMessageIdRef.current !== lastMessage.id;

            // 마지막 메시지가 변경되었을 때만 스크롤 (새 메시지 수신/발신)
            // 단, 과거 메시지 로딩 시에는 lastMessage가 변하지 않으므로 스크롤되지 않음
            if (isNewMessage) {
                lastMessageIdRef.current = lastMessage.id;

                if (!prevScrollHeightRef.current) {
                    setTimeout(() => {
                        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                }
            }

            if (user) {
                const myId = user.memberId || user.id;
                // 내가 보낸 메시지가 아니고, 아직 읽음 처리 요청을 안 했으면 요청
                if (String(lastMessage.senderId) !== String(myId)) {
                    if (lastMarkedReadId !== lastMessage.id) {
                        markAsRead(lastMessage.id);
                        setLastMarkedReadId(lastMessage.id);
                    }
                }
            }
        }
    }, [messages, user, lastMarkedReadId]);

    // 메뉴 외부 클릭 시 닫기
    useEffect(() => {
        const handleClickOutside = () => {
            setActiveMessageId(null);
        };

        window.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, []);

    // 컨텍스트 메뉴 핸들러
    const handleContextMenu = (e, messageId) => {
        if (!messageId) return;
        e.preventDefault();
        e.stopPropagation();

        setActiveMessageId(prev => prev === messageId ? null : messageId);
    };

    const markAsRead = async (lastReadMessageId) => {
        if (!currentRoomId) return;
        try {
            await axios.post(`/chat/room/${currentRoomId}/read`, { lastReadMessageId });
        } catch (error) {
            console.error('Failed to mark as read:', error);
        }
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputText.trim() || !stompClient || !isConnected) return;

        const message = {
            roomId: currentRoomId,
            content: inputText,
        };

        stompClient.publish({
            destination: '/pub/chat/message',
            body: JSON.stringify(message),
        });

        setInputText('');
    };

    const handleEdit = (msg) => {
        setEditingMessageId(msg.id);
        setEditContent(msg.content);
    };

    const handleCancelEdit = () => {
        setEditingMessageId(null);
        setEditContent('');
    };

    const handleSubmitEdit = async (e) => {
        e.preventDefault();
        if (!editContent.trim()) return;

        try {
            await axios.patch(`/chat/message/${editingMessageId}`, { content: editContent });

            // 로컬 상태 즉시 업데이트 (Optimistic UI)
            useStore.getState().chat.updateMessageInList({
                id: editingMessageId,
                content: editContent
            });

            setEditingMessageId(null);
            setEditContent('');
        } catch (error) {
            console.error('Failed to edit message:', error);
            alert('메시지 수정에 실패했습니다.');
        }
    };

    const handleDelete = async (messageId) => {
        if (!window.confirm("정말로 이 메시지를 삭제하시겠습니까?")) return;

        try {
            await axios.delete(`/chat/message/${messageId}`);

            // 로컬 상태 즉시 업데이트 (Optimistic UI)
            useStore.getState().chat.updateMessageInList({
                id: messageId,
                content: "삭제된 메시지입니다.",
                isDeleted: true
            });
        } catch (error) {
            console.error('Failed to delete message:', error);
            alert('메시지 삭제에 실패했습니다.');
        }
    };

    // 시간 포맷팅
    const formatTime = (timeString) => {
        if (!timeString) return '';
        const date = new Date(timeString);
        if (isNaN(date.getTime())) return '';
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    // 날짜 포맷팅 헬퍼 함수 (YYYY년 MM월 DD일)
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return '';
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
                <h3 style={{ margin: 0 }}>
                    {currentRoomName ? `${currentRoomName}님과의 채팅방` : `채팅방 ${currentRoomId && `(${currentRoomId})`}`}
                </h3>
                <div style={{ fontSize: '0.8rem', color: isConnected ? (isDark ? '#4ade80' : 'green') : (isDark ? '#f87171' : 'red') }}>
                    {isConnected ? '● 연결됨' : '○ 연결 중...'}
                </div>
            </div>
            <MessageList
                $isDark={isDark}
                onScroll={handleScroll}
                className="message-list-container"
            >
                {isLoading && messages.length > 0 && (
                    <div style={{ textAlign: 'center', padding: '10px', fontSize: '0.8rem', color: '#888' }}>
                        이전 메시지 불러오는 중...
                    </div>
                )}
                {messages.map((msg, index) => {
                    const myId = user?.memberId || user?.id;
                    const isMe = user && (String(myId) === String(msg.senderId));

                    // 메시지 생성 시간 처리 (배열인 경우 포함)
                    let createdDate = msg.createdDate;
                    if (Array.isArray(createdDate)) {
                        createdDate = new Date(
                            createdDate[0],
                            createdDate[1] - 1,
                            createdDate[2],
                            createdDate[3],
                            createdDate[4],
                            createdDate[5]
                        );
                    }

                    const dateObj = new Date(createdDate);
                    const currentDate = isNaN(dateObj.getTime()) ? null : dateObj.toDateString();

                    const prevMsgDate = index > 0 ? messages[index - 1].createdDate : null;
                    let prevDateObj = null;
                    if (prevMsgDate) {
                        if (Array.isArray(prevMsgDate)) {
                            prevDateObj = new Date(
                                prevMsgDate[0], prevMsgDate[1] - 1, prevMsgDate[2],
                                prevMsgDate[3], prevMsgDate[4], prevMsgDate[5]
                            );
                        } else {
                            prevDateObj = new Date(prevMsgDate);
                        }
                    }
                    const prevDate = (prevDateObj && !isNaN(prevDateObj.getTime())) ? prevDateObj.toDateString() : null;

                    const showDateSeparator = index === 0 || (currentDate && currentDate !== prevDate);
                    const isEditing = editingMessageId === msg.id;

                    return (
                        <React.Fragment key={msg.id || index}>
                            {showDateSeparator && currentDate && (
                                <DateSeparator $isDark={isDark}>
                                    {formatDate(createdDate)}
                                </DateSeparator>
                            )}
                            <MessageRow $isMe={isMe}>
                                <MessageGroup>
                                    {isMe && msg.unreadCount > 0 && (
                                        <UnreadCount $isMe={true}>{msg.unreadCount}</UnreadCount>
                                    )}
                                    <MessageBubble
                                        $isMe={isMe}
                                        $isDark={isDark}
                                        onContextMenu={(e) => isMe && !msg.isDeleted && !isEditing ? handleContextMenu(e, msg.id) : null}
                                        style={{ cursor: isMe && !msg.isDeleted && !isEditing ? 'pointer' : 'default' }}
                                    >
                                        {!isMe && <div className="sender">{msg.senderName}</div>}
                                        {isEditing ? (
                                            <form onSubmit={handleSubmitEdit} style={{ display: 'flex', gap: '5px' }} onClick={e => e.stopPropagation()}>
                                                <input
                                                    value={editContent}
                                                    onChange={(e) => setEditContent(e.target.value)}
                                                    autoFocus
                                                    style={{ padding: '4px', borderRadius: '4px', border: '1px solid #ccc' }}
                                                />
                                                <button type="submit" style={{ fontSize: '0.7rem', padding: '2px 5px' }}>확인</button>
                                                <button type="button" onClick={handleCancelEdit} style={{ fontSize: '0.7rem', padding: '2px 5px' }}>취소</button>
                                            </form>
                                        ) : (
                                            <div>{msg.content}</div>
                                        )}
                                        <div className="time">{formatTime(createdDate)}</div>

                                        {isMe && !msg.isDeleted && !isEditing && activeMessageId === msg.id && (
                                            <MessageActionsMenu $isMe={isMe}>
                                                <button onClick={(e) => { e.stopPropagation(); handleEdit(msg); setActiveMessageId(null); }}>
                                                    <Pencil size={14} /> 수정
                                                </button>
                                                <button className="delete-btn" onClick={(e) => { e.stopPropagation(); handleDelete(msg.id); setActiveMessageId(null); }}>
                                                    <Trash2 size={14} /> 삭제
                                                </button>
                                            </MessageActionsMenu>
                                        )}
                                    </MessageBubble>
                                    {!isMe && msg.unreadCount > 0 && (
                                        <UnreadCount $isMe={false}>{msg.unreadCount}</UnreadCount>
                                    )}
                                </MessageGroup>
                            </MessageRow>
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
