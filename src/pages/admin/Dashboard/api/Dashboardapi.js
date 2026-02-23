import apiClient from "../../../../api/axios";

export const getDashboardStats = async () => {
  try {
    const response = await apiClient.get("/dashboard/stats");
    return response.data;
  } catch (error) {
    console.error("Dashboard stats fetch error:", error);
    throw error;
  }
};

export const getYesterdayDashboardStats = async () => {
  try {
    const response = await apiClient.get("/dashboard/stats/yesterday");
    return response.data;
  } catch (error) {
    console.error("Yesterday dashboard stats fetch error:", error);
    throw error;
  }
};
