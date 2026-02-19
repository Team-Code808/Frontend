import styled, { keyframes } from 'styled-components';

// 다크 모드 색상
const darkTheme = {
    bg: '#0f172a',
    sidebar: '#1e293b',
    border: '#334155',
    text: '#f1f5f9',
    textSecondary: '#94a3b8',
    hover: 'rgba(255, 255, 255, 0.05)',
    active: 'rgba(59, 130, 246, 0.1)',
    messageBg: '#334155',
    myMessageBg: '#3b82f6',
    myMessageText: '#ffffff',
    inputBg: '#020617',
};

export const ChatContainer = styled.div`
    display: flex;
    height: calc(100vh - 260px); /* 헤더 및 여백 고려하여 조정 */
    background-color: ${props => props.$isDark ? darkTheme.bg : '#f4f6f8'};
    color: ${props => props.$isDark ? darkTheme.text : 'inherit'};
    overflow: hidden; /* 전체 스크롤 방지 */
`;

export const Sidebar = styled.div`
    width: 320px;
    background-color: ${props => props.$isDark ? darkTheme.sidebar : 'white'};
    border-right: 1px solid ${props => props.$isDark ? darkTheme.border : '#e0e0e0'};
    display: flex;
    flex-direction: column;
`;

export const ChatArea = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: ${props => props.$isDark ? darkTheme.bg : 'white'};
`;

export const RoomListStart = styled.div`
    padding: 20px;
    border-bottom: 1px solid ${props => props.$isDark ? darkTheme.border : '#f0f0f0'};
    h2 {
        margin: 0;
        font-size: 1.2rem;
        color: ${props => props.$isDark ? darkTheme.text : '#333'};
    }
`;

export const RoomItem = styled.div`
    padding: 15px 20px;
    border-bottom: 1px solid ${props => props.$isDark ? darkTheme.border : '#f0f0f0'};
    cursor: pointer;
    background-color: ${(props) => {
        if (props.$active) return props.$isDark ? darkTheme.active : '#e6f7ff';
        return 'transparent';
    }};
    transition: background-color 0.2s;

    &:hover {
        background-color: ${props => props.$isDark ? darkTheme.hover : '#f0f0f0'};
    }

    .room-name {
        font-weight: 600;
        margin-bottom: 5px;
        color: ${props => props.$isDark ? darkTheme.text : '#333'};
    }

    .last-message {
        font-size: 0.9rem;
        color: ${props => props.$isDark ? darkTheme.textSecondary : '#666'};
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    
    .time {
        font-size: 0.8rem;
        color: ${props => props.$isDark ? darkTheme.textSecondary : '#999'};
        margin-top: 5px;
        text-align: right;
    }
`;

export const MessageList = styled.div`
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: ${props => props.$isDark ? darkTheme.bg : '#f9f9f9'};
`;

export const MessageRow = styled.div`
    display: flex;
    width: 100%;
    justify-content: ${props => props.$isMe ? 'flex-end' : 'flex-start'};
    margin-bottom: 5px;
`;

export const MessageGroup = styled.div`
    display: flex;
    align-items: flex-end;
    gap: 5px;
    max-width: 70%; 
`;

export const MessageBubble = styled.div`
    padding: 10px 15px;
    border-radius: 20px;
    background-color: ${(props) => {
        if (props.$isMe) return props.$isDark ? darkTheme.myMessageBg : '#dcf8c6';
        return props.$isDark ? darkTheme.messageBg : '#ffffff';
    }};
    color: ${(props) => {
        if (props.$isMe) return props.$isDark ? darkTheme.myMessageText : 'inherit';
        return props.$isDark ? darkTheme.text : 'inherit';
    }};
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    position: relative;
    word-break: break-all; 
    word-wrap: break-word; 
    white-space: pre-wrap; 
    
    .sender {
        font-size: 0.75rem;
        margin-bottom: 4px;
        color: ${(props) => {
        if (props.$isMe) return props.$isDark ? '#e2e8f0' : '#e3f2fd'; // 다크 모드에서 약간 더 밝게
        return props.$isDark ? darkTheme.textSecondary : '#888';
    }};
    }
    
    .time {
        font-size: 0.7rem;
        margin-top: 5px;
        text-align: right;
        color: ${(props) => props.$isDark ? 'white' : 'black'};
    }
`;


// 메뉴 등장을 위한 키프레임 애니메이션
const menuAppear = `
  from {
    opacity: 0;
    transform: translateY(-10px);
}
  to {
    opacity: 1;
    transform: translateY(0);
}
`;

export const MessageActionsMenu = styled.div`
position: absolute;
top: 0;
right: calc(100% + 10px); /* 말풍선 왼쪽으로 배치 */
/* left는 auto */
background: white;
border-radius: 12px;
box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
z-index: 100;
display: flex;
flex-direction: column;
overflow: hidden;
min-width: 120px;
border: 1px solid rgba(0, 0, 0, 0.05);
animation: 0.2s ease-out 0s 1 normal forwards running ${keyframes`
        from { opacity: 0; transform: translateY(-5px); }
        to { opacity: 1; transform: translateY(0); }
    `};

    button {
    display: flex;
    align-items: center;
    gap: 8px;
    border: none;
    background: none;
    padding: 10px 16px;
    cursor: pointer;
    font-size: 0.9rem;
    color: #475569;
    text-align: left;
    transition: all 0.2s;
    font-weight: 500;
    white-space: nowrap; 
        
        &:hover {
        background-color: #f8fafc;
        color: #1e293b;
    }

        &:not(:last-child) {
        border-bottom: 1px solid #f1f5f9;
    }
        
        &.delete-btn {
        color: #ef4444; /* 삭제 버튼은 빨간색 */
            &:hover {
            background-color: #fef2f2;
            color: #dc2626;
        }
    }

        svg {
        width: 16px;
        height: 16px;
    }
}
`;



// 메시지 안 읽은 사람 수 (1, 2 등)
export const UnreadCount = styled.div`
    font-size: 0.7rem;
    color: #ef4444;
    font-weight: 600;
    margin-bottom: 2px;
    align-self: flex-end;
    margin-right: ${props => props.$isMe ? '4px' : '0'};
    margin-left: ${props => props.$isMe ? '0' : '4px'};
`;

// 채팅방 목록의 안 읽은 메시지 수 뱃지
export const UnreadBadge = styled.div`
    background-color: #ef4444; // 빨간색
    color: white;
    font-size: 0.75rem;
    font-weight: bold;
    min-width: 20px;
    height: 20px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 6px;
    margin-left: 10px; // 이름/내용과 간격
`;

export const InputArea = styled.form`
padding: 20px;
background-color: ${props => props.$isDark ? darkTheme.sidebar : 'white'};
border-top: 1px solid ${props => props.$isDark ? darkTheme.border : '#e0e0e0'};
display: flex;
gap: 10px;

    input {
    flex: 1;
    padding: 12px;
    background-color: ${props => props.$isDark ? darkTheme.inputBg : 'white'};
    color: ${props => props.$isDark ? darkTheme.text : 'inherit'};
    border: 1px solid ${props => props.$isDark ? darkTheme.border : '#ddd'};
    border-radius: 8px;
    outline: none;
    font-size: 1rem;

        &:focus {
        border-color: #2196f3;
    }

        &::placeholder {
        color: ${props => props.$isDark ? darkTheme.textSecondary : '#aaa'};
    }
}

    button {
    padding: 0 24px;
    background-color: #2196f3;
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;

        &:hover {
        background-color: #1976d2;
    }
        
        &:disabled {
        background-color: ${props => props.$isDark ? '#475569' : '#ccc'};
        color: ${props => props.$isDark ? '#94a3b8' : 'white'};
        cursor: not-allowed;
    }
}
`;

export const EmptyState = styled.div`
flex: 1;
display: flex;
align-items: center;
justify-content: center;
color: ${props => props.$isDark ? darkTheme.textSecondary : '#888'};
font-size: 1.1rem;
`;

export const DateSeparator = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin: 20px 0;
color: ${props => props.$isDark ? darkTheme.textSecondary : '#888'};
font-size: 0.85rem;
font-weight: 500;

    &::before,
    &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid ${props => props.$isDark ? darkTheme.border : '#e0e0e0'};
    margin: 0 10px;
}
`;

export const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
`;

export const ModalContainer = styled.div`
    background-color: ${props => props.$isDark ? darkTheme.sidebar : 'white'};
    width: 400px;
    max-height: 80vh;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    color: ${props => props.$isDark ? darkTheme.text : 'inherit'};
`;

export const ModalHeader = styled.div`
    padding: 16px 20px;
    border-bottom: 1px solid ${props => props.$isDark ? darkTheme.border : '#eee'};
    font-size: 1.1rem;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const SearchInput = styled.input`
    margin: 15px 20px 10px;
    padding: 10px;
    border: 1px solid ${props => props.$isDark ? darkTheme.border : '#ddd'};
    border-radius: 8px;
    background-color: ${props => props.$isDark ? darkTheme.bg : '#f9f9f9'};
    color: ${props => props.$isDark ? darkTheme.text : 'inherit'};
    outline: none;

    &:focus {
        border-color: #2196f3;
    }
`;

export const UserList = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 0 10px;
`;

export const UserItem = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    cursor: pointer;
    border-radius: 8px;
    transition: background-color 0.2s;

    &:hover {
        background-color: ${props => props.$isDark ? darkTheme.hover : '#f5f5f5'};
    }

    input[type="checkbox"] {
        margin-right: 12px;
        width: 18px;
        height: 18px;
        cursor: pointer;
    }

    .info {
        flex: 1;
        display: flex;
        flex-direction: column;
        
        .name {
            font-weight: 500;
            margin-bottom: 2px;
        }
        
        .dept {
            font-size: 0.8rem;
            color: ${props => props.$isDark ? darkTheme.textSecondary : '#888'};
        }
    }
`;

export const ButtonGroup = styled.div`
    padding: 15px 20px;
    border-top: 1px solid ${props => props.$isDark ? darkTheme.border : '#eee'};
    display: flex;
    justify-content: flex-end;
    gap: 10px;
`;

export const ConfirmButton = styled.button`
    padding: 8px 16px;
    background-color: #2196f3;
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;

    &:disabled {
        background-color: #90caf9;
        cursor: not-allowed;
    }

    &:hover:not(:disabled) {
        background-color: #1976d2;
    }
`;

export const CancelButton = styled.button`
    padding: 8px 16px;
    background-color: transparent;
    color: ${props => props.$isDark ? darkTheme.text : '#666'};
    border: 1px solid ${props => props.$isDark ? darkTheme.border : '#ddd'};
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;

    &:hover {
        background-color: ${props => props.$isDark ? 'rgba(255,255,255,0.05)' : '#f5f5f5'};
    }
`;
