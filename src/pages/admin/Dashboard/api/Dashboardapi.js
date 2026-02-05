import axios from "axios";
import { API_URL } from "../../../../Config.jsx";

export const getDashboardStats = async (companyId, date) => {
  const token = localStorage.getItem("authToken");
  try {
    const response = await axios.get(`${API_URL}/api/dashboard/stats`, {
      params: {
        companyId,
        date,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Dashboard stats fetch error:", error);
    throw error;
  }
};
