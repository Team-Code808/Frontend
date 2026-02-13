import { useState, useEffect } from "react";
import { getDashboardStats } from "../api/dashboardApi";

const useDashboardData = (initialCompanyId = 1, initialDate = "2026-02-05") => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const data = await getDashboardStats(initialCompanyId, initialDate);
        setDashboardData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [initialCompanyId, initialDate]);

  return { dashboardData, loading, error };
};

export default useDashboardData;
