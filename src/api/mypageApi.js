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

  // 스트레스 요약 조회
  getStress: async (memberId) => {
    const response = await apiClient.get('/mypage/stress', {
      params: { memberId },
    });
    return response.data;
  },
};

// 관리자 마이페이지 API
export const adminMypageApi = {
  // 프로필 조회
  getProfile: async (memberId) => {
    const response = await apiClient.get(`/admin/mypage/${memberId}/profile`);
    return response.data;
  },

  // 프로필 수정
  updateProfile: async (memberId, data) => {
    const response = await apiClient.put(`/admin/mypage/${memberId}/profile`, data);
    return response.data;
  },

  // 비밀번호 변경
  changePassword: async (memberId, data) => {
    const response = await apiClient.put(`/admin/mypage/${memberId}/password`, data);
    return response.data;
  },

  // 포인트 내역 조회
  getPointHistory: async (memberId) => {
    const response = await apiClient.get(`/admin/mypage/${memberId}/points`);
    return response.data;
  },

  // 기프티콘 목록 조회
  getCoupons: async (memberId) => {
    const response = await apiClient.get(`/admin/mypage/${memberId}/coupons`);
    return response.data;
  },
};