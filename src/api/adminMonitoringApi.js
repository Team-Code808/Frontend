import apiClient from './axios';

// 관리자 모니터링 데이터 조회
export const fetchMonitoringData = async (period = 'current', year = null) => {
    const response = await apiClient.get('/admin/monitoring', {
        params: { period, year }
    });
    return response.data;
};

// 모니터링 엑셀 보고서 다운로드
export const downloadMonitoringExcel = async (period = 'current', year = null) => {
    const response = await apiClient.get('/admin/monitoring/excel', {
        params: { period, year },
        responseType: 'blob',       // 이진 파일 수신
    });

    const url = URL.createObjectURL(new Blob([response.data]));
    const a = document.createElement('a');
    a.href = url;
    a.download = `모니터링_보고서_${year ?? new Date().getFullYear()}_${period}.xlsx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);       // 메모리 정리
};
