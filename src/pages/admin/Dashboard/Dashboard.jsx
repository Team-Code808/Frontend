import React, { useState, useEffect } from "react";
import * as S from "./Dashboard.styles";
import useDashboardData from "./hooks/useDashboardData";
import { teamApi } from "../../../api/teamApi";

import DashboardBanner from "./components/DashboardBanner";
import DashboardStats from "./components/DashboardStats";
import DashboardChart from "./components/DashboardChart";
import StressTopList from "./components/StressTopList";
import MemberDetailModal from "../TeamManagement/components/MemberDetailModal";

const AdminDashboard = () => {
  const { dashboardData, loading, error } = useDashboardData();
  const [selectedMember, setSelectedMember] = useState(null);
  const [allMembers, setAllMembers] = useState([]);

  // 전체 팀원 데이터 가져오기
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const members = await teamApi.getMembers();
        setAllMembers(members);
      } catch (err) {
        console.error("팀원 데이터 로드 실패:", err);
      }
    };
    fetchMembers();
  }, []);

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
    console.log("member : ", member);

    // allMembers에서 해당 멤버의 전체 정보 찾기
    const fullData = allMembers.find((m) => m.memberId === member.memberId);

    if (fullData) {
      const adaptedMember = {
        id: fullData.memberId,
        name: fullData.name,
        dept: fullData.departmentName,
        stress: member.stressPercentage || fullData.stress,
        role: fullData.rankName || "-",
        phone: fullData.phone || "-",
        email: fullData.email || "-",
        joinDate: fullData.joinDate || "-",
        status: fullData.attendanceStatus || "-",
        metrics: {
          cooldowns: fullData.cooldownCount || 0,
          leave: fullData.remainingLeave || "-",
          alerts: 0,
        },
      };
      setSelectedMember(adaptedMember);
    } else {
      // fullData를 못 찾은 경우 기본 데이터로 표시
      const adaptedMember = {
        id: member.memberId,
        name: member.memberName,
        dept: member.departmentName,
        stress: member.stressPercentage,
        role: "-",
        phone: "-",
        email: "-",
        joinDate: "-",
        status: "-",
        metrics: {
          cooldowns: 0,
          leave: "-",
          alerts: 0,
        },
      };
      setSelectedMember(adaptedMember);
    }
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
        />
      )}
    </S.Container>
  );
};

export default AdminDashboard;
