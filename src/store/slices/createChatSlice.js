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
        setMessages: (newMessages) => set((state) => {
            // 기존 메시지와 병합하여 unreadCount가 더 낮은(최신) 값을 유지
            // (HTTP 히스토리 응답이 늦게 도착하여 WS 실시간 업데이트를 덮어쓰는 Race Condition 방지)
            const mergedMessages = newMessages.map(newMsg => {
                const existingMsg = state.chat.messages.find(m => m.id === newMsg.id);
                if (existingMsg) {
                    if (existingMsg.unreadCount < newMsg.unreadCount) {
                        console.log(`[setMessages] Preserving newer state for Msg ID ${newMsg.id}: History(${newMsg.unreadCount}) -> Kept(${existingMsg.unreadCount})`);
                        return { ...newMsg, unreadCount: existingMsg.unreadCount };
                    }
                }
                return newMsg;
            });
            console.log(`[setMessages] Updated ${mergedMessages.length} messages.`);
            return { chat: { ...state.chat, messages: mergedMessages } };
        }),
        addMessage: (message) => set((state) => {
            const existingIndex = state.chat.messages.findIndex(m => m.id === message.id);
            if (existingIndex !== -1) {
                const newMessages = [...state.chat.messages];
                // 기존 메시지 가져오기
                const existingMsg = newMessages[existingIndex];

                // 수정/삭제 이벤트로 인해 unreadCount가 0으로 들어오는 경우, 기존 값을 유지
                const preservedUnreadCount = (message.unreadCount !== undefined && message.unreadCount !== 0)
                    ? message.unreadCount
                    : existingMsg.unreadCount;

                newMessages[existingIndex] = {
                    ...existingMsg,
                    ...message,
                    unreadCount: preservedUnreadCount
                };
                return { chat: { ...state.chat, messages: newMessages } };
            } else {
                return { chat: { ...state.chat, messages: [...state.chat.messages, message] } };
            }
        }),
        updateReadStatus: (fromId, toId) => set((state) => {
            const numericFromId = Number(fromId);
            const numericToId = Number(toId);

            console.log(`[updateReadStatus] Range: ${numericFromId} ~ ${numericToId}`);

            return {
                chat: {
                    ...state.chat,
                    messages: state.chat.messages.map(msg => {
                        const numericMsgId = Number(msg.id);
                        // fromId < msg.id <= toId 범위에 있는 메시지만 카운트 감소
                        if (msg.unreadCount > 0 && numericMsgId > numericFromId && numericMsgId <= numericToId) {
                            console.log(`[updateReadStatus] Decrementing: ID=${numericMsgId}, Current=${msg.unreadCount}`);
                            return { ...msg, unreadCount: Math.max(0, msg.unreadCount - 1) };
                        }
                        return msg;
                    })
                }
            };
        }),
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
                    msg.id === updatedMessage.id
                        ? {
                            ...msg,
                            ...updatedMessage,
                            // unreadCount가 0이더라도, 수정/삭제 이벤트에서 온 0값이라면 무시하고 기존 값 유지
                            // 단, 읽음 처리 로직에 의해 0이 된 경우는 다름 (이 함수는 주로 내용 변경용)
                            unreadCount: (updatedMessage.unreadCount !== undefined && updatedMessage.unreadCount !== 0)
                                ? updatedMessage.unreadCount
                                : msg.unreadCount
                        }
                        : msg
                )
            }
        })),
        resetUnreadCount: (roomId) => set((state) => ({
            chat: {
                ...state.chat,
                chatRooms: state.chat.chatRooms.map(room =>
                    room.roomId === roomId
                        ? { ...room, unreadCount: 0 }
                        : room
                )
            }
        })),
        updateChatList: (message) => set((state) => ({
            chat: {
                ...state.chat,
                chatRooms: state.chat.chatRooms.map(room => {
                    if (room.roomId !== message.roomId) return room;

                    // 메시지 타입에 따른 안 읽은 개수 처리
                    // TALK(신규 메시지)이고 현재 보고 있는 방이 아닐 때만 카운트 증가
                    const newUnreadCount = state.chat.currentRoomId === message.roomId
                        ? 0
                        : (message.messageType === 'TALK' ? (room.unreadCount || 0) + 1 : (room.unreadCount || 0));

                    // 수정/삭제된 메시지가 현재 목록에 표시된 마지막 메시지보다 최신이거나 같은 경우에만 요약 정보 업데이트
                    const isNewerOrSame = !room.lastMessageTime || new Date(message.createdDate) >= new Date(room.lastMessageTime);

                    return {
                        ...room,
                        lastMessageContent: isNewerOrSame ? message.content : room.lastMessageContent,
                        lastMessageTime: isNewerOrSame ? message.createdDate : room.lastMessageTime,
                        unreadCount: newUnreadCount
                    };
                }).sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime))
            }
        })),
    }
});
