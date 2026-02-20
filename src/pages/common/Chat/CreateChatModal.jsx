import React, { useState, useEffect } from 'react';
import axios from '../../../api/axios';
import {
    Overlay,
    ModalContainer,
    ModalHeader,
    SearchInput,
    UserList,
    UserItem,
    ButtonGroup,
    ConfirmButton,
    CancelButton
} from './Chat.styles';

const CreateChatModal = ({ onClose, onSuccess, isDark }) => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedUsers, setSelectedUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/chat/members');
                setUsers(response.data);
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        };
        fetchUsers();
    }, []);

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.departmentName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleUserToggle = (memberId) => {
        setSelectedUsers(prev => {
            if (prev.includes(memberId)) {
                return prev.filter(id => id !== memberId);
            } else {
                return [...prev, memberId];
            }
        });
    };

    const handleCreate = async () => {
        if (selectedUsers.length === 0) return;

        try {
            const response = await axios.post('/chat/create', {
                targetMemberIds: selectedUsers,
                roomName: null // 방 제목 고정 (백엔드에서 처리)
            });
            onSuccess(response.data); // roomId 반환
            onClose();
        } catch (error) {
            console.error('Failed to create chat room:', error);
            alert('채팅방 생성에 실패했습니다.');
        }
    };

    return (
        <Overlay onClick={onClose}>
            <ModalContainer $isDark={isDark} onClick={e => e.stopPropagation()}>
                <ModalHeader $isDark={isDark}>
                    채팅방 만들기
                </ModalHeader>

                <SearchInput
                    $isDark={isDark}
                    type="text"
                    placeholder="이름, 부서 검색"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />

                <UserList>
                    {filteredUsers.map(user => (
                        <UserItem
                            key={user.memberId}
                            $isDark={isDark}
                            onClick={() => handleUserToggle(user.memberId)}
                        >
                            <input
                                type="checkbox"
                                checked={selectedUsers.includes(user.memberId)}
                                readOnly
                            />
                            <div className="info">
                                <span className="name">{user.name}</span>
                                <span className="dept">{user.departmentName} {user.rankName}</span>
                            </div>
                        </UserItem>
                    ))}
                </UserList>

                <ButtonGroup $isDark={isDark}>
                    <CancelButton $isDark={isDark} onClick={onClose}>취소</CancelButton>
                    <ConfirmButton
                        disabled={selectedUsers.length === 0}
                        onClick={handleCreate}
                    >
                        {selectedUsers.length}명 초대
                    </ConfirmButton>
                </ButtonGroup>
            </ModalContainer>
        </Overlay>
    );
};

export default CreateChatModal;
