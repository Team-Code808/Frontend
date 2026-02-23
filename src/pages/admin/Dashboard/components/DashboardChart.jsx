import React, { useState } from "react";
import { HeartPulse, Activity } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import * as S from "../Dashboard.styles";

const DashboardChart = ({ departmentStats, yesterdayDeptStats }) => {
  const [chartType, setChartType] = useState("realtime");

  const deptRealtimeData = React.useMemo(
    () =>
      departmentStats.map((dept) => ({
        dept: dept.departmentName,
        val: dept.avgStressPercentage,
      })),
    [departmentStats]
  );

  const deptYesterdayData = React.useMemo(
    () =>
      (yesterdayDeptStats || []).map((dept) => ({
        dept: dept.departmentName,
        val: dept.avgStressPercentage,
      })),
    [yesterdayDeptStats]
  );

  const deptCooldownData = React.useMemo(
    () =>
      departmentStats.map((dept) => ({
        dept: dept.departmentName,
        val: dept.cooldownCount,
      })),
    [departmentStats]
  );

  const currentData = React.useMemo(() => {
    if (chartType === "realtime") return deptRealtimeData;
    if (chartType === "yesterday") return deptYesterdayData;
    return deptCooldownData;
  }, [chartType, deptRealtimeData, deptYesterdayData, deptCooldownData]);

  const avgVal = React.useMemo(() => {
    if (!currentData.length) return 0;
    const sum = currentData.reduce((acc, d) => acc + d.val, 0);
    return chartType === "cooldown" ? sum : Math.round(sum / currentData.length);
  }, [currentData, chartType]);

  return (
    <S.ChartSection>
      <S.SectionHeader>
        <S.HeaderLeft>
          <h3>
            {chartType === "realtime" ? (
              <>
                <Activity size={20} color="#fb7185" />
                부서별 실시간 스트레스 지수
              </>
            ) : chartType === "yesterday" ? (
              <>
                <HeartPulse size={20} color="#818cf8" />
                부서별 전날 스트레스 지수
              </>
            ) : (
              <>
                <Activity size={20} color="#60a5fa" />
                부서별 누적 쿨다운 횟수
              </>
            )}
          </h3>
          <p>
            {chartType === "realtime"
              ? "현재 부서별 멘탈 건강 상태 실시간 분석"
              : chartType === "yesterday"
              ? "전일 부서별 멘탈 건강 통합 지표 분석"
              : "부서별 쿨다운(휴식) 요청 빈도 분석"}
          </p>
        </S.HeaderLeft>

        <S.ChartTabContainer>
          <S.ChartTabButton
            active={chartType === "realtime"}
            activeColor="#fb7185"
            onClick={() => setChartType("realtime")}
          >
            실시간
          </S.ChartTabButton>
          <S.ChartTabButton
            active={chartType === "yesterday"}
            activeColor="#818cf8"
            onClick={() => setChartType("yesterday")}
          >
            전날
          </S.ChartTabButton>
          <S.ChartTabButton
            active={chartType === "cooldown"}
            activeColor="#60a5fa"
            onClick={() => setChartType("cooldown")}
          >
            쿨다운
          </S.ChartTabButton>
        </S.ChartTabContainer>

        <S.AvgBadge>
          <span>
            {chartType === "cooldown"
              ? `총 ${avgVal}회`
              : `평균 ${avgVal}%`}
          </span>
        </S.AvgBadge>
      </S.SectionHeader>

      <S.ChartWrapper>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={currentData}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#334155"
            />
            <XAxis
              dataKey="dept"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 700 }}
            />
            <YAxis hide domain={[0, "auto"]} />
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.03)" }}
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "16px",
                padding: "12px",
              }}
              itemStyle={{
                color: chartType === "realtime" ? "#fb7185" : chartType === "yesterday" ? "#818cf8" : "#60a5fa",
                fontWeight: 900,
              }}
              labelStyle={{
                color: "#94a3b8",
                fontSize: "10px",
                marginBottom: "4px",
              }}
              formatter={(value) => [
                chartType === "cooldown" ? `${value}회` : `${value}%`,
                chartType === "realtime" ? "실시간" : chartType === "yesterday" ? "전날" : "쿨다운",
              ]}
            />
            <Bar dataKey="val" radius={[8, 8, 0, 0]} barSize={32}>
              {currentData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    chartType === "realtime"
                      ? entry.val > 50
                        ? "#fb7185"
                        : entry.val > 35
                        ? "#818cf8"
                        : "#475569"
                      : chartType === "yesterday"
                      ? entry.val > 35
                        ? "#818cf8"
                        : "#475569"
                      : entry.val > 2
                      ? "#60a5fa"
                      : "#475569"
                  }
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </S.ChartWrapper>
    </S.ChartSection>
  );
};

export default DashboardChart;
