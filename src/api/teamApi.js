import apiClient from './axios';

/**
 * 팀원관리 API (관리자 - 로그인한 사용자와 같은 회사 소속만 조회)
 */
export const teamApi = {
  getMembers: async () => {
    const response = await apiClient.get('/admin/team/members');
    return response.data;
  },

  /** 팀원 월별 근태 현황 (일 -> 출근/지각/결근/휴가/휴가예정) */
  getMemberAttendance: async (memberId, year, month) => {
    const response = await apiClient.get(`/admin/team/members/${memberId}/attendance`, {
      params: { year, month },
    });
    return response.data;
  },
};
