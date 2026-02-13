import React, { useEffect, useState } from 'react';
import useStore from '../../../store/useStore';
import { RoomListStart, RoomItem, UnreadBadge } from './Chat.styles';
import axios from '../../../api/axios';
import CreateChatModal from './CreateChatModal';
import { Plus } from 'lucide-react';

const ChatRoomList = ({ isDark }) => {
    const {
        chatRooms,
        currentRoomId,
        setChatRooms,
        setCurrentRoomId,
        resetUnreadCount
    } = useStore(state => state.chat);

    const { user } = useStore();

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    useEffect(() => {
        const fetchChatRooms = async () => {
            try {
                console.log('Fetching chat rooms...');
                const response = await axios.get('/chat/rooms');
                console.log('Chat rooms fetched:', response.data);
                setChatRooms(response.data);
            } catch (error) {
                console.error('Failed to fetch chat rooms:', error);
            }
        };

        fetchChatRooms();
    }, [setChatRooms, isCreateModalOpen]); // 모달 닫힐 때(생성 후) 목록 갱신

    const handleRoomClick = (roomId) => {
        setCurrentRoomId(roomId);
        resetUnreadCount(roomId);
    };

    const formatTime = (timeString) => {
        if (!timeString) return '';
        const date = new Date(timeString);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const getRoomName = (roomName) => {
        if (!roomName || !user?.name) return roomName;
        const names = roomName.split(',').map(n => n.trim());
        const filteredNames = names.filter(n => n !== user.name);
        return filteredNames.length > 0 ? filteredNames.join(', ') : roomName;
    };

    const handleCreateSuccess = (roomId) => {
        // 채팅방 생성 성공 시 해당 방으로 이동
        setCurrentRoomId(roomId);
        // 목록 갱신은 useEffect 의존성에 의해 처리됨
    };

    return (
        <>
            <RoomListStart $isDark={isDark} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>메시지</h2>
                <button
                    onClick={() => setIsCreateModalOpen(true)}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: isDark ? '#fff' : '#333',
                        padding: '5px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Plus size={20} />
                </button>
            </RoomListStart>
            <div style={{ flex: 1, overflowY: 'auto' }}>
                {chatRooms.map(room => (
                    <RoomItem
                        key={room.id}
                        $active={currentRoomId === room.roomId}
                        $isDark={isDark}
                        onClick={() => handleRoomClick(room.roomId)}
                    >
                        <div className="room-name">{getRoomName(room.name)}</div>
                        <div className="last-message">{room.lastMessageContent}</div>
                        <div className="time">{formatTime(room.lastMessageTime)}</div>
                        <div style={{ marginLeft: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '5px' }}>
                            {room.unreadCount > 0 && (
                                <UnreadBadge>{room.unreadCount}</UnreadBadge>
                            )}
                        </div>
                    </RoomItem>
                ))}
            </div>
            {isCreateModalOpen && (
                <CreateChatModal
                    onClose={() => setIsCreateModalOpen(false)}
                    onSuccess={handleCreateSuccess}
                    isDark={isDark}
                />
            )}
        </>
    );
};

export default ChatRoomList;
