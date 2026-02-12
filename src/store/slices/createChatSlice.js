export const createChatSlice = (set, get) => ({
    chat: {
        chatRooms: [],
        currentRoomId: null,
        messages: [],
        isConnected: false,
        stompClient: null,

        // Actions
        setChatRooms: (rooms) => set((state) => ({
            chat: { ...state.chat, chatRooms: rooms }
        })),
        setCurrentRoomId: (roomId) => set((state) => ({
            chat: { ...state.chat, currentRoomId: roomId }
        })),
        setMessages: (messages) => set((state) => ({
            chat: { ...state.chat, messages: messages }
        })),
        addMessage: (message) => set((state) => {
            const existingIndex = state.chat.messages.findIndex(m => m.id === message.id);
            if (existingIndex !== -1) {
                const newMessages = [...state.chat.messages];
                newMessages[existingIndex] = { ...newMessages[existingIndex], ...message };
                return { chat: { ...state.chat, messages: newMessages } };
            } else {
                return { chat: { ...state.chat, messages: [...state.chat.messages, message] } };
            }
        }),
        updateReadStatus: (lastReadMessageId) => set((state) => ({
            chat: {
                ...state.chat,
                messages: state.chat.messages.map(msg => {
                    if (msg.unreadCount > 0 && msg.id <= lastReadMessageId) {
                        return { ...msg, unreadCount: 0 };
                    }
                    return msg;
                })
            }
        })),
        setIsConnected: (status) => set((state) => ({
            chat: { ...state.chat, isConnected: status }
        })),
        setStompClient: (client) => set((state) => ({
            chat: { ...state.chat, stompClient: client }
        })),
        updateMessageInList: (updatedMessage) => set((state) => ({
            chat: {
                ...state.chat,
                messages: state.chat.messages.map(msg =>
                    msg.id === updatedMessage.id ? { ...msg, ...updatedMessage } : msg
                )
            }
        })),
    }
});
