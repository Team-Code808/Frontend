import axios from 'axios';
import { API_URL } from '../../Config';

const getAuthHeader = () => {
    const token = localStorage.getItem('authToken'); // localStorage 키값이 'authToken'인지 확인하세요!
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const createNotificationSlice = (set, get) => ({
    notifications: [],

    // 1. 초기 알림 목록 불러오기 (헤더 추가)
    fetchNotifications: async (memberId) => {
        if (!memberId) return;
        try {
            const response = await axios.get(`${API_URL}/api/notifications/${memberId}`, {
                headers: getAuthHeader() // ⬅️ 헤더 추가
            });
            const formattedData = response.data.map(noti => ({
                id: noti.id,
                title: noti.title,
                message: noti.content,
                read: noti.status === 'Y',
                time: new Date(noti.createDate).toLocaleDateString(),
                targetRole: noti.targetRole || "USER",
                redirectUrl: noti.redirectUrl
            }));

            set({ notifications: formattedData });
        } catch (error) {
            console.error("알림 목록 로드 실패:", error);
        }
    },


    // 2. 실시간 새 알림 추가 (로컬 상태만 변경하므로 헤더 필요 없음)
    addNotification: (newNoti) => set((state) => ({
        notifications: [newNoti, ...state.notifications]
    })),


    // 3. 개별 알림 읽음 처리 (헤더 추가)
    markAsRead: async (notificationId) => {
        try {
            await axios.patch(`${API_URL}/api/notifications/${notificationId}/read`, {}, {
                headers: getAuthHeader() // ⬅️ 헤더 추가
            });
            
            set((state) => ({
                notifications: state.notifications.map(n =>
                    n.id === notificationId ? { ...n, read: true } : n
                )
            }));
        } catch (error) {
            console.error("알림 읽음 처리 실패:", error);
        }
    },

    
    // 4. 모든 알림 읽음 처리 (헤더 추가)
    markAllAsRead: async (memberId) => {
        try {
            await axios.patch(`${API_URL}/api/notifications/read-all/${memberId}`, {}, {
                headers: getAuthHeader() // ⬅️ 헤더 추가
            });
            
            set((state) => ({
                notifications: state.notifications.map(n => ({ ...n, read: true }))
            }));
        } catch (error) {
            console.error("전체 읽음 처리 실패:", error);
        }
    }
});