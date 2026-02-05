
import apiClient from './axios';

export const applicationsApi = {
  /** 관리자: 회사 전체 휴가 신청 목록 (백엔드: GET /api/admin/vacation) */
  getLeaves: async () => {
    const response = await apiClient.get('/admin/vacation');
    return response.data;
  },

  /** 휴가 승인 */
  approveLeave: async (vacationId) => {
    const response = await apiClient.put(`/admin/vacation/${vacationId}/approve`);
    return response.data;
  },

  /** 휴가 반려 (승인과 동일하게 본문 없이 PUT) */
  rejectLeave: async (vacationId) => {
    const response = await apiClient.put(`/admin/vacation/${vacationId}/reject`);
    return response.data;
  },

  /** 상담 신청 목록 (관리자, 회사별) - 휴가/입사처럼 전체 상태 유지 */
  getConsultations: async () => {
    const response = await apiClient.get('/admin/consultations');
    return response.data;
  },

  /** 상담 완료 처리 (승인과 동일) */
  completeConsultation: async (consultationId) => {
    await apiClient.put(`/admin/consultations/${consultationId}/complete`);
  },

  /** 상담 취소 처리 (반려와 동일) */
  cancelConsultation: async (consultationId) => {
    await apiClient.put(`/admin/consultations/${consultationId}/cancel`);
  },

  /** 관리자: 입사 신청(대기) 목록 (백엔드: GET /api/admin/joins) */
  getJoins: async () => {
    const response = await apiClient.get('/admin/joins');
    return response.data;
  },

  /** 입사 신청 승인 */
  approveJoin: async (memberId) => {
    await apiClient.put(`/admin/joins/${memberId}/approve`);
  },

  /** 입사 신청 반려 */
  rejectJoin: async (memberId) => {
    await apiClient.put(`/admin/joins/${memberId}/reject`);
  },
};
