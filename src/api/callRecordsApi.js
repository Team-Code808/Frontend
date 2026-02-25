import apiClient from "./axios";

/**
 * 통화 목록 (내 통화 / 전체)
 */
export const fetchCallRecords = async (scope = "my", page = 0, size = 20) => {
  const res = await apiClient.get("/call-records", {
    params: { scope, page, size },
  });
  return res.data?.data ?? { content: [], totalElements: 0, totalPages: 0 };
};

/**
 * 전화번호 검색
 */
export const searchByPhone = async (phone) => {
  const res = await apiClient.get("/call-records/search", {
    params: { phone },
  });
  return res.data?.data ?? [];
};

/**
 * 통화 종료 후 녹음 업로드 (진행률 콜백 포함)
 */
export const uploadCallRecording = async (
  file,
  customerPhone,
  callStartedAt,
  callEndedAt,
  onProgress
) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("customerPhone", customerPhone);
  formData.append("callStartedAt", callStartedAt);
  formData.append("callEndedAt", callEndedAt);

  const res = await apiClient.post("/call-records", formData, {
    headers: {
      "Content-Type": false,
    },
    onUploadProgress: (progressEvent) => {
      if (onProgress && progressEvent.total) {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        onProgress(percentCompleted);
      }
    },
  });
  return res.data?.data;
};
