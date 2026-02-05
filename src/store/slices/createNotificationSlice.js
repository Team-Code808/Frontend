// store/slices/createNotificationSlice.js
import axios from 'axios';
import { API_URL } from '../../Config';

// 알림 전용 기본 경로 설정
const NOTI_API = `${API_URL}/api/notifications`;

export const createNotificationSlice = (set, get) => ({
  notifications: [],
  isLoading: false,

  // SSE 실시간 알림 구독
  subscribeToNotifications: (userId) => {
    // EventSource는 axios를 쓰지 않고 브라우저 표준 API를 사용합니다.
    const eventSource = new EventSource(`${NOTI_API}/subscribe?userId=${userId}`);

    eventSource.addEventListener("notification", (event) => {
      const newNotif = JSON.parse(event.data);
      set((state) => ({
        notifications: [newNotif, ...state.notifications]
      }));
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
      // 엔드포인트: http://localhost:8080/api/notifications
      const response = await axios.get(NOTI_API);
      set({ notifications: response.data, isLoading: false });
    } catch (error) {
      console.error("알림 로드 실패:", error);
      set({ isLoading: false });
    }
  },

  // 2. 단일 알림 읽음 처리 (PATCH)
  markAsRead: async (id) => {
    try {
      // 엔드포인트: http://localhost:8080/api/notifications/{id}/read
      await axios.patch(`${NOTI_API}/${id}/read`);
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
      // 엔드포인트: http://localhost:8080/api/notifications/read-all
      await axios.post(`${NOTI_API}/read-all`);
      set((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, read: true })),
      }));
    } catch (error) {
      console.error("전체 읽음 처리 오류:", error);
    }
  },
});