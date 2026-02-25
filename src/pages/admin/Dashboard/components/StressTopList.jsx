import React, { useState } from "react";
import { AlertTriangle, Search, Users, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import * as S from "../Dashboard.styles";

const StressTopList = ({
  highRiskMembers,
  departmentStats,
  onSelectMember,
}) => {
  const navigate = useNavigate();
  const [selectedDept, setSelectedDept] = useState("전체");

  const departments = React.useMemo(
    () => ["전체", ...departmentStats.map((d) => d.departmentName)],
    [departmentStats]
  );

  const filteredMembers = React.useMemo(
    () =>
      highRiskMembers
        .filter(
          (m) => selectedDept === "전체" || m.departmentName === selectedDept
        )
        .slice(0, 5),
    [highRiskMembers, selectedDept]
  );

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
        {filteredMembers.map((member) => (
          <S.AgentCard
            key={member.memberId}
            onClick={() => onSelectMember(member)}
            style={{ cursor: "pointer" }}
          >
            <S.AgentAvatar>👤</S.AgentAvatar>
            <S.AgentInfo>
              <S.NameRow>
                <p>{member.memberName}</p>
                <span>{member.stressPercentage}%</span>
              </S.NameRow>
              <S.StatusRow>
                <span>{member.departmentName}</span>
                <span />
                <span>{member.summaryDate}</span>
              </S.StatusRow>
            </S.AgentInfo>
            <S.ActionButton>
              <ChevronRight size={16} />
            </S.ActionButton>
          </S.AgentCard>
        ))}
        {filteredMembers.length === 0 && (
          <S.EmptyState>
            <Users />
            <p>해당 부서 데이터 없음</p>
          </S.EmptyState>
        )}
      </S.AgentList>

      <S.DetailButton onClick={() => {
        navigate("/app/monitoring");
        onClose()
      }}>
        상세 모니터링 이동
      </S.DetailButton>
    </S.TopListSection>
  );
};

export default StressTopList;
