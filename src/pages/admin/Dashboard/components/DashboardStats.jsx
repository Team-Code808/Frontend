import React from "react";
import { Activity, CalendarCheck, MessageSquare, FileText } from "lucide-react";
import * as S from "../Dashboard.styles";

const DashboardStats = ({ companyStats, yesterdayStats }) => {
  // 변화율 계산 함수 (포인트 차이)
  const calculateChange = (today, yesterday) => {
    if (!yesterday || yesterday === 0) return 0;
    const change = today - yesterday;
    return Math.round(change * 10) / 10;
  };

  const stressChange = yesterdayStats
    ? calculateChange(
        companyStats.avgStressPercentage,
        yesterdayStats.avgStressPercentage
      )
    : 0;

  const attendanceChange = yesterdayStats
    ? calculateChange(
        companyStats.todayAttendance,
        yesterdayStats.todayAttendance
      )
    : 0;

  const stats = [
    {
      label: "평균 스트레스",
      val: `${companyStats.avgStressPercentage}%`,
      trend: yesterdayStats
        ? `${stressChange > 0 ? "+" : ""}${stressChange}%p`
        : "전날 데이터 없음",
      trendType:
        stressChange > 0 ? "danger" : stressChange < 0 ? "good" : "neutral",
      yesterdayVal: yesterdayStats
        ? `전날: ${yesterdayStats.avgStressPercentage}%`
        : null,
      color: "indigo",
      icon: Activity,
    },
    {
      label: "전체 출근률",
      val: `${companyStats.todayAttendance}%`,
      trend: yesterdayStats
        ? `${attendanceChange > 0 ? "+" : ""}${attendanceChange}%p`
        : "전날 데이터 없음",
      trendType:
        attendanceChange > 0
          ? "good"
          : attendanceChange < 0
          ? "danger"
          : "neutral",
      yesterdayVal: yesterdayStats
        ? `전날: ${yesterdayStats.todayAttendance}%`
        : null,
      color: "blue",
      icon: CalendarCheck,
    },
    {
      label: "상담 요청",
      val: yesterdayStats ? `${yesterdayStats.consultationCount}건` : "-",
      trend: "미처리",
      trendType: "neutral",
      yesterdayVal: null,
      color: "orange",
      icon: MessageSquare,
    },
    {
      label: "휴가(근태) 요청",
      val: yesterdayStats ? `${yesterdayStats.vacationCount}건` : "-",
      trend: "승인 대기",
      trendType: "neutral",
      yesterdayVal: null,
      color: "emerald",
      icon: FileText,
    },
  ];

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
          <S.TrendText trendType={stat.trendType}>{stat.trend}</S.TrendText>
          {stat.yesterdayVal && (
            <S.YesterdayText>{stat.yesterdayVal}</S.YesterdayText>
          )}
        </S.StatCard>
      ))}
    </S.StatsGrid>
  );
};

export default DashboardStats;
