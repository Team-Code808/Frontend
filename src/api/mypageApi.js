import apiClient from './axios';

export const mypageApi = {
  // 프로필 조회
  getProfile: async (memberId) => {
    const response = await apiClient.get('/mypage/profile', {
      params: { memberId },
    });
    return response.data;
  },

  // 프로필 수정
  updateProfile: async (memberId, data) => {
    const response = await apiClient.put('/mypage/profile', data, {
      params: { memberId },
    });
    return response.data;
  },

  // 비밀번호 변경
  changePassword: async (memberId, data) => {
    const response = await apiClient.put('/mypage/password', data, {
      params: { memberId },
    });
    return response.data;
  },

  // 포인트 내역 조회
  getPointHistory: async (memberId) => {
    const response = await apiClient.get('/mypage/points', {
      params: { memberId },
    });
    return response.data;
  },

  // 기프티콘 목록 조회
  getCoupons: async (memberId) => {
    const response = await apiClient.get('/mypage/coupons', {
      params: { memberId },
    });
    return response.data;
  },

  // 알림 목록 조회
  getNotifications: async (memberId) => {
    const response = await apiClient.get('/mypage/notifications', {
      params: { memberId },
    });
    return response.data;
  },

  // 알림 읽음 처리
  markNotificationAsRead: async (memberId, notificationId) => {
    const response = await apiClient.put(`/mypage/notifications/${notificationId}/read`, null, {
      params: { memberId },
    });
    return response.data;
  },
};
