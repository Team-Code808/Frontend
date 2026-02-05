// store/slices/createNotificationSlice.js
import axios from 'axios';
import { API_URL } from '../../Config';

const NOTI_API = `${API_URL}/api/notifications`;

// 토큰 가져오기 유틸리티
const getAuthHeader = () => {
    const token = localStorage.getItem('authToken'); // 키값이 'token'인지 'authToken'인지 확인하세요!
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const createNotificationSlice = (set, get) => ({
  notifications: [],
  isLoading: false,

  subscribeToNotifications: (userId) => {
    const eventSource = new EventSource(`${NOTI_API}/subscribe?userId=${userId}`);

    eventSource.addEventListener("notification", (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("🔔 실시간 알림 수신:", data);
        
        set((state) => ({
          notifications: [{
            id: data.id,
            title: data.title,
            message: data.message,
            read: data.isRead,
            createdAt: data.createdAt
          }, ...state.notifications]
        })); 
      } catch (err) {
        console.error("알림 파싱 실패:", err);
      }
    });

    eventSource.onerror = (err) => {
      console.error("SSE 연결 오류:", err);
      eventSource.close();
    };

    return () => eventSource.close();
  },

  // 1. 알림 목록 불러오기 (GET)
  fetchNotifications: async () => {
    set({ isLoading: true });
    try {
      // headers 추가
      const response = await axios.get(NOTI_API, { headers: getAuthHeader() });
      set({ notifications: response.data, isLoading: false });
    } catch (error) {
      console.error("알림 로드 실패:", error);
      set({ isLoading: false });
    }
  },

  // 2. 단일 알림 읽음 처리 (PATCH)
  markAsRead: async (id) => {
    try {
      // PATCH 요청: 세 번째 인자가 config(headers)입니다.
      await axios.patch(`${NOTI_API}/${id}/read`, {}, { headers: getAuthHeader() });
      
      set((state) => ({
        notifications: state.notifications.map((n) =>
          n.id === id ? { ...n, read: true } : n
        ),
      }));
    } catch (error) {
      console.error("읽음 처리 오류:", error);
    }
  },

  // 3. 모든 알림 읽음 처리 (POST)
  markAllAsRead: async () => {
    try {
      // POST 요청: 세 번째 인자가 config(headers)입니다.
      await axios.post(`${NOTI_API}/read-all`, {}, { headers: getAuthHeader() });
      
      set((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, read: true })),
      }));
    } catch (error) {
      console.error("전체 읽음 처리 오류:", error);
    }
  },
});