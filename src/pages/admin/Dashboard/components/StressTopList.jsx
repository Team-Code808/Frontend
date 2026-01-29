import React, { useState } from "react";
import { AlertTriangle, Search, Users, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import * as S from "../Dashboard.styles";
import { agents, departments } from "../data/mockData";

const StressTopList = ({ onSelectMember }) => {
  const navigate = useNavigate();
  const [selectedDept, setSelectedDept] = useState("전체");

  const filteredAgents = agents
    .filter((a) => selectedDept === "전체" || a.dept === selectedDept)
    .sort((a, b) => b.stress - a.stress)
    .slice(0, 5);

  return (
    <S.TopListSection>
      <S.SectionHeader>
        <S.HeaderLeft>
          <h3>
            <AlertTriangle size={18} color="#fb923c" />
            스트레스 고위험군
          </h3>
          <p
            style={{
              fontSize: "0.625rem",
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "-0.05em",
            }}
          >
            Stress Top 5
          </p>
        </S.HeaderLeft>
        <S.SearchButton>
          <Search size={16} />
        </S.SearchButton>
      </S.SectionHeader>

      <S.FilterTabs>
        {departments.map((dept) => (
          <S.TabButton
            key={dept}
            onClick={() => setSelectedDept(dept)}
            active={selectedDept === dept}
          >
            {dept}
          </S.TabButton>
        ))}
      </S.FilterTabs>

      <S.AgentList>
        {filteredAgents.map((agent) => (
          <S.AgentCard
            key={agent.id}
            onClick={() => onSelectMember(agent)}
            style={{ cursor: "pointer" }}
          >
            <S.AgentAvatar>{agent.avatar}</S.AgentAvatar>
            <S.AgentInfo>
              <S.NameRow>
                <p>{agent.name}</p>
                <span>{agent.stress}%</span>
              </S.NameRow>
              <S.StatusRow status={agent.status}>
                <span>{agent.dept}</span>
                <span />
                <span>{agent.status}</span>
              </S.StatusRow>
            </S.AgentInfo>
            <S.ActionButton>
              <ChevronRight size={16} />
            </S.ActionButton>
          </S.AgentCard>
        ))}
        {filteredAgents.length === 0 && (
          <S.EmptyState>
            <Users />
            <p>해당 부서 데이터 없음</p>
          </S.EmptyState>
        )}
      </S.AgentList>

      <S.DetailButton onClick={() => navigate("/app/admin/monitoring")}>
        상세 모니터링 이동
      </S.DetailButton>
    </S.TopListSection>
  );
};

export default StressTopList;
