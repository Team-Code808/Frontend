import apiClient from './axios';

/**
 * 팀원관리 API (관리자 - 로그인한 사용자와 같은 회사 소속만 조회)
 */
export const teamApi = {
  getMembers: async (page = 0, size = 10) => {
    const response = await apiClient.get('/admin/team/members', {
      params: { page, size },
    });
    return response.data;
  },

  /** 팀원 월별 근태 현황 (일 -> 출근/지각/결근/휴가/휴가예정) */
  getMemberAttendance: async (memberId, year, month) => {
    const response = await apiClient.get(`/admin/team/members/${memberId}/attendance`, {
      params: { year, month },
    });
    return response.data;
  },

  /** 회사 소속 부서명 목록 (추가된 부서만) */
  getDepartments: async () => {
    const response = await apiClient.get('/admin/team/departments');
    return response.data;
  },

    /** 회사 소속 부서 목록 (departmentId, departmentName) - 명함 등록 팀 선택용 */
  getDepartmentsList: async () => {
    const response = await apiClient.get('/admin/team/departments-list');
    return response.data;
  },

  /** 회사에 부서 추가 */
  createDepartment: async (departmentName) => {
    await apiClient.post('/admin/team/departments', { departmentName });
  },
};
