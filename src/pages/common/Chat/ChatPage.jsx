import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ChatRoomList from './ChatRoomList';
import ChatRoom from './ChatRoom';
import { ChatContainer, Sidebar, ChatArea, EmptyState } from './Chat.styles';
import useStore from '../../../store/useStore';

const ChatPage = () => {
    const { currentRoomId, setCurrentRoomId } = useStore(state => state.chat);
    const isAdminMode = useStore(state => state.isAdminMode);
    const location = useLocation();

    useEffect(() => {
        // 다른 페이지에서 채팅방을 선택하고 들어온 경우 (location.state.roomId 존재)
        if (location.state?.roomId) {
            setCurrentRoomId(location.state.roomId);
        } else {
            // 그 외의 경우 (메뉴 클릭 등)에는 선택된 방 초기화 (빈 화면 표시)
            setCurrentRoomId(null);
        }
    }, [location.state, setCurrentRoomId]);

    return (
        <ChatContainer $isDark={isAdminMode}>
            <Sidebar $isDark={isAdminMode}>
                <ChatRoomList isDark={isAdminMode} />
            </Sidebar>
            <ChatArea $isDark={isAdminMode}>
                {currentRoomId ? (
                    <ChatRoom isDark={isAdminMode} />
                ) : (
                    <EmptyState $isDark={isAdminMode}>
                        채팅방을 선택하거나 새로운 대화를 시작해보세요.
                    </EmptyState>
                )}
            </ChatArea>
        </ChatContainer>
    );
};


export default ChatPage;
