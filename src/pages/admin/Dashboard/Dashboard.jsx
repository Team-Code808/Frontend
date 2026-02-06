import React, { useState } from "react";
import * as S from "./Dashboard.styles";
import useDashboardData from "./hooks/useDashboardData";

import DashboardBanner from "./components/DashboardBanner";
import DashboardStats from "./components/DashboardStats";
import DashboardChart from "./components/DashboardChart";
import StressTopList from "./components/StressTopList";
import MemberDetailModal from "../TeamManagement/components/MemberDetailModal";

const AdminDashboard = () => {
  const { dashboardData, loading, error } = useDashboardData();
  const [selectedMember, setSelectedMember] = useState(null);

  if (loading) {
    return (
      <S.Container>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "400px",
            color: "#94a3b8",
            fontSize: "1.25rem",
            fontWeight: 700,
          }}
        >
          데이터를 불러오는 중...
        </div>
      </S.Container>
    );
  }

  if (error) {
    return (
      <S.Container>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "400px",
            color: "#f43f5e",
            fontSize: "1rem",
            fontWeight: 700,
          }}
        >
          데이터를 불러올 수 없습니다: {error}
        </div>
      </S.Container>
    );
  }

  const handleSelectMember = (member) => {
    // MemberDetailModal이 기대하는 형식으로 데이터 변환
    const adaptedMember = {
      id: member.memberId,
      name: member.memberName,
      dept: member.departmentName,
      stress: member.stressPercentage,
      // 필요한 다른 필드들은 기본값 처리
      role: member.rankName || "-",
      phone: member.phone || "-",
      email: member.email || "-",
      joinDate: member.joinDate || "-",
      status: member.attendanceStatus || "-",
      metrics: {
        cooldowns: 0,
        leave: "-",
        alerts: 0,
        ...member.metrics,
      },
    };
    setSelectedMember(adaptedMember);
  };

  // Mock 근태 데이터 생성 함수 (API가 없을 때 사용)
  const fetchMockAttendance = async (memberId, year, month) => {
    // 0.5초 딜레이로 API 호출 흉내
    await new Promise((resolve) => setTimeout(resolve, 500));

    const daysInMonth = new Date(year, month, 0).getDate();
    const mockData = {};

    for (let i = 1; i <= daysInMonth; i++) {
      // 랜덤하게 상태 생성 (대부분 출근)
      const rand = Math.random();
      if (rand > 0.95) mockData[i] = "결근";
      else if (rand > 0.9) mockData[i] = "지각";
      else if (rand > 0.85) mockData[i] = "휴가";
      else mockData[i] = "출근";
    }
    return mockData;
  };

  return (
    <S.Container>
      <DashboardBanner companyStats={dashboardData.companyStats} />

      <DashboardStats companyStats={dashboardData.companyStats} />

      <S.MainGrid>
        <DashboardChart departmentStats={dashboardData.departmentStats} />

        <StressTopList
          highRiskMembers={dashboardData.highRiskMembers}
          departmentStats={dashboardData.departmentStats}
          onSelectMember={handleSelectMember}
        />
      </S.MainGrid>

      {selectedMember && (
        <MemberDetailModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
          fetchAttendance={fetchMockAttendance}
        />
      )}
    </S.Container>
  );
};

export default AdminDashboard;
