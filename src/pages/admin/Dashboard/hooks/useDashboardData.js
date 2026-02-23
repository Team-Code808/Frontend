import { useState, useEffect, useRef } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";
import {
  getDashboardStats,
  getYesterdayDashboardStats,
} from "../api/dashboardApi";
import { API_URL } from "../../../../Config";
import { tokenManager } from "../../../../utils/tokenManager";

const useDashboardData = () => {
  const [realtimeData, setRealtimeData] = useState(null);
  const [yesterdayData, setYesterdayData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const eventSourceRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const initDashboardData = async () => {
      try {
        const [today, yesterday] = await Promise.all([
          getDashboardStats(),
          getYesterdayDashboardStats(),
        ]);
        // console.log("오늘 데이터 수신:", today);
        // console.log("전날 데이터 수신:", yesterday);
        if (isMounted) {
          setRealtimeData(today); // 오늘 데이터로 초기값 세팅
          setYesterdayData(yesterday);
        }
      } catch (err) {
        console.error(
          "대시보드 데이터 요청 실패:",
          err.response?.status,
          err.message
        );
        if (isMounted) setError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    initDashboardData();

    // SSE 연결 (오면 realtimeData 교체)
    const connectSSE = () => {
      const token = tokenManager.getAccessToken();
      if (!token) {
        console.error("SSE 연결 실패: 토큰 없음");
        return;
      }

      const sseUrl = `${API_URL}/api/dashboard/subscribe`;
      console.log("SSE 연결 시도:", sseUrl);

      eventSourceRef.current = new EventSourcePolyfill(sseUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
        heartbeatTimeout: 60 * 1000,
      });

      eventSourceRef.current.onopen = () => {
        console.log("SSE 연결 성공");
      };

      // 최초 연결 확인 이벤트
      eventSourceRef.current.addEventListener("connect", (event) => {
        console.log("SSE connect 이벤트:", event.data);
      });

      // 실시간 대시보드 데이터 (오면 교체)
      eventSourceRef.current.addEventListener("dashboard", (event) => {
        console.log("SSE dashboard 이벤트 수신:", event.data);
        try {
          const data = JSON.parse(event.data);
          if (isMounted) setRealtimeData(data);
        } catch (e) {
          console.error("SSE 데이터 파싱 실패:", e);
        }
      });

      eventSourceRef.current.onerror = (err) => {
        console.error("SSE 에러:", {
          readyState: eventSourceRef.current?.readyState,
          status: err.status,
          message: err.message,
        });
        eventSourceRef.current.close();

        setTimeout(() => {
          if (isMounted) {
            console.log("SSE 재연결 시도");
            connectSSE();
          }
        }, 3000);
      };
    };

    connectSSE();

    return () => {
      isMounted = false;
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        console.log("SSE 연결 해제");
      }
    };
  }, []);

  return {
    realtimeData,
    yesterdayData,
    loading,
    error,
  };
};

export default useDashboardData;
