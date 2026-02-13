import apiClient from "../../api/axios"; // 설정하신 apiClient 임포트

export const createNotificationSlice = (set, get) => ({
    notifications: [],
    isLoading: false,

    // 1. 초기 알림 목록 불러오기
    fetchNotifications: async (memberId) => {
        // memberId가 없으면 현재 store에 저장된 user 정보에서 가져오기 시도
        const targetId = memberId || get().user?.memberId;
        if (!targetId) return;

        set({ isLoading: true });
        try {
            // apiClient를 사용하므로 headers: getAuthHeader()를 매번 넣을 필요가 없습니다.
            const response = await apiClient.get(`/notifications/${targetId}`);
            
            const formattedData = response.data.map(noti => ({
                id: noti.id,
                title: noti.title,
                message: noti.content,
                read: noti.status === 'Y',
                time: new Date(noti.createDate).toLocaleDateString(),
                targetRole: noti.targetRole || "USER",
                redirectUrl: noti.redirectUrl
            }));

            set({ notifications: formattedData, isLoading: false });
            console.log(`✅ [${targetId}] 알림 로드 완료:`, formattedData.length, "건");
        } catch (error) {
            console.error("❌ 알림 목록 로드 실패:", error);
            set({ isLoading: false });
        }
    },

    // 2. 실시간 새 알림 추가
    addNotification: (newNoti) => set((state) => ({
        notifications: [newNoti, ...state.notifications]
    })),

    // 3. 개별 알림 읽음 처리
    markAsRead: async (notificationId) => {
        // 낙관적 업데이트 (서버 응답 전 UI 먼저 변경)
        const previousNotifications = get().notifications;
        set((state) => ({
            notifications: state.notifications.map(n =>
                n.id === notificationId ? { ...n, read: true } : n
            )
        }));

        try {
            await apiClient.patch(`/notifications/${notificationId}/read`);
            console.log(`✅ 알림 [${notificationId}] 읽음 처리 완료`);
        } catch (error) {
            console.error("❌ 알림 읽음 처리 실패:", error);
            // 에러 시 롤백 (선택 사항)
            set({ notifications: previousNotifications });
        }
    },

    // 4. 모든 알림 읽음 처리
    markAllAsRead: async (memberId) => {
        const targetId = memberId || get().user?.memberId;
        if (!targetId) return;

        const previousNotifications = get().notifications;
        set((state) => ({
            notifications: state.notifications.map(n => ({ ...n, read: true }))
        }));

        try {
            await apiClient.patch(`/notifications/read-all/${targetId}`);
            console.log(`✅ 사용자 [${targetId}] 전체 알림 읽음 처리 완료`);
        } catch (error) {
            console.error("❌ 전체 읽음 처리 실패:", error);
            set({ notifications: previousNotifications });
        }
    }
});