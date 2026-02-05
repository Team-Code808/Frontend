// src/pages/admin/Dashboard/components/DashboardStats.jsx
import React from "react";
import { Activity, CalendarCheck, MessageSquare, FileText } from "lucide-react";
import * as S from "../Dashboard.styles";

const DashboardStats = ({ companyStats }) => {
  const stats = [
    {
      label: "평균 스트레스",
      val: `${companyStats.avgStressPercentage}%`,
      trend: `${companyStats.stressChange > 0 ? "+" : ""}${
        companyStats.stressChange
      }%`,
      color: "indigo",
      icon: Activity,
    },
    {
      label: "전체 출근률",
      val: `${companyStats.todayAttendance}%`,
      trend: `${companyStats.attendanceChange > 0 ? "+" : ""}${
        companyStats.attendanceChange
      }%`,
      color: "blue",
      icon: CalendarCheck,
    },
    {
      label: "상담 요청",
      val: `${companyStats.consultationCount}건`,
      trend: "오늘 기준",
      color: "orange",
      icon: MessageSquare,
    },
    {
      label: "휴가(근태) 요청",
      val: `${companyStats.vacationCount}건`,
      trend: "승인 대기",
      color: "emerald",
      icon: FileText,
    },
  ];

  const getTrendType = (trend) => {
    if (trend.includes("+")) return "up";
    if (trend.includes("-")) return "down";
    return "neutral";
  };

  return (
    <S.StatsGrid>
      {stats.map((stat, i) => (
        <S.StatCard key={i}>
          <S.CardHeader>
            <S.IconBox color={stat.color}>
              <stat.icon size={20} />
            </S.IconBox>
            <span>{stat.label}</span>
          </S.CardHeader>
          <S.StatValue>{stat.val}</S.StatValue>
          <S.TrendText trendType={getTrendType(stat.trend)}>
            {stat.trend}
          </S.TrendText>
        </S.StatCard>
      ))}
    </S.StatsGrid>
  );
};

export default DashboardStats;
