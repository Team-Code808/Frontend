import styled from 'styled-components';

// Dark Mode Colors
const darkTheme = {
    bg: '#0f172a',       // Slate 900
    sidebar: '#1e293b',  // Slate 800
    border: '#334155',   // Slate 700
    text: '#f1f5f9',     // Slate 100
    textSecondary: '#94a3b8', // Slate 400
    hover: 'rgba(255, 255, 255, 0.05)',
    active: 'rgba(59, 130, 246, 0.1)', // Blue tint
    messageBg: '#334155', // Slate 700
    myMessageBg: '#3b82f6', // Blue 500
    myMessageText: '#ffffff',
    inputBg: '#020617', // Slate 950
};

export const ChatContainer = styled.div`
    display: flex;
    height: calc(100vh - 80px); /* 헤더 높이 제외 */
    background-color: ${props => props.$isDark ? darkTheme.bg : '#f4f6f8'};
    color: ${props => props.$isDark ? darkTheme.text : 'inherit'};
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

export const MessageBubble = styled.div`
    max-width: 70%;
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
    align-self: ${(props) => (props.$isMe ? 'flex-end' : 'flex-start')};
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    position: relative;
    word-break: break-word;

    .sender {
        font-size: 0.75rem;
        margin-bottom: 4px;
        color: ${(props) => {
        if (props.$isMe) return props.$isDark ? '#e2e8f0' : '#e3f2fd'; // Slightly lighter for dark mode
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
