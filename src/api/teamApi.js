import apiClient from './axios';

/**
 * 팀원관리 API (관리자 - 로그인한 사용자와 같은 회사 소속만 조회)
 */
export const teamApi = {
  getMembers: async () => {
    const response = await apiClient.get('/admin/team/members');
    return response.data;
  },
};
