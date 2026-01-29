import React, { useState } from "react";
import * as S from "./Dashboard.styles";

// Components
import DashboardBanner from "./components/DashboardBanner";
import DashboardStats from "./components/DashboardStats";
import DashboardChart from "./components/DashboardChart";
import StressTopList from "./components/StressTopList";
import AgentDetailModal from "./components/AgentDetailModal";

const AdminDashboard = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  return (
    <S.Container>
      {/* 관리자 퀵 배너 */}
      <DashboardBanner />

      {/* 통계 그리드 - 부드러운 다크 테마 */}
      <DashboardStats />

      <S.MainGrid>
        {/* 부서별 주간 스트레스 차트 */}
        <DashboardChart />

        {/* 스트레스 고위험군 Top 5 리스트 */}
        <StressTopList onSelectMember={setSelectedMember} />
      </S.MainGrid>

      <AgentDetailModal
        selectedMember={selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </S.Container>
  );
};

export default AdminDashboard;
