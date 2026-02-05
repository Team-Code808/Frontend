import apiClient from './axios';

// 관리자 모니터링 데이터 조회
export const fetchMonitoringData = async (period = 'current') => {
    const response = await apiClient.get('/admin/monitoring', {
        params: { period }
    });
    return response.data;
};
