import apiClient from "../../../../api/axios";

export const getDashboardStats = async (companyId, date) => {
  try {
    const response = await apiClient.get("/dashboard/stats", {
      params: {
        companyId,
        date,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Dashboard stats fetch error:", error);
    throw error;
  }
};
