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
import { deptStressData, deptCooldownData } from "../data/mockData";

const DashboardChart = () => {
  const [chartType, setChartType] = useState("stress"); // 'stress' or 'cooldown'

  return (
    <S.ChartSection>
      <S.SectionHeader>
        <S.HeaderLeft>
          <h3>
            {chartType === "stress" ? (
              <>
                <HeartPulse size={20} color="#fb7185" />
                부서별 평균 스트레스 지수
              </>
            ) : (
              <>
                <Activity size={20} color="#60a5fa" />
                주간 부서별 누적 쿨다운 횟수
              </>
            )}
          </h3>
          <p>
            {chartType === "stress"
              ? "실시간 부서별 멘탈 건강 통합 지표 분석"
              : "지난 7일간 부서별 쿨다운(휴식) 요청 빈도 분석"}
          </p>
        </S.HeaderLeft>

        <S.ChartTabContainer>
          <S.ChartTabButton
            active={chartType === "stress"}
            activeColor="#fb7185"
            onClick={() => setChartType("stress")}
          >
            스트레스
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
          <span>{chartType === "stress" ? "평균 34%" : "총 45회"}</span>
        </S.AvgBadge>
      </S.SectionHeader>

      <S.ChartWrapper>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartType === "stress" ? deptStressData : deptCooldownData}
          >
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
                color: chartType === "stress" ? "#fb7185" : "#60a5fa",
                fontWeight: 900,
              }}
              labelStyle={{
                color: "#94a3b8",
                fontSize: "10px",
                marginBottom: "4px",
              }}
              formatter={(value) => [
                chartType === "stress" ? `${value}%` : `${value}회`,
                chartType === "stress" ? "스트레스" : "쿨다운",
              ]}
            />
            <Bar
              dataKey={chartType === "stress" ? "stress" : "count"}
              radius={[8, 8, 0, 0]}
              barSize={32}
            >
              {(chartType === "stress" ? deptStressData : deptCooldownData).map(
                (entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      chartType === "stress"
                        ? entry.stress > 50
                          ? "#fb7185"
                          : entry.stress > 35
                          ? "#818cf8"
                          : "#475569"
                        : entry.count > 10
                        ? "#60a5fa"
                        : "#475569"
                    }
                  />
                )
              )}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </S.ChartWrapper>
    </S.ChartSection>
  );
};

export default DashboardChart;
