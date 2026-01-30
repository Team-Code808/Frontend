import React from "react";
import {
  Phone,
  Mail,
  Calendar,
  X,
  Zap,
  HeartPulse,
  Palmtree,
  Activity,
  History,
  MessageCircle,
  ExternalLink,
} from "lucide-react";
import * as S from "../Dashboard.styles";

const AgentDetailModal = ({ selectedMember, onClose }) => {
  if (!selectedMember) return null;

  return (
    <S.ModalOverlay>
      <S.Backdrop onClick={onClose} />
      <S.ModalContainer>
        {/* 상단 프로필 헤더 */}
        <S.ModalHeader status={selectedMember.status}>
          <S.ModalAvatar>{selectedMember.avatar}</S.ModalAvatar>
          <S.ModalInfo>
            <S.NameTitle>
              <h2>{selectedMember.name}</h2>
              <span>
                {selectedMember.role} • {selectedMember.dept}
              </span>
            </S.NameTitle>
            <S.ContactRow>
              <S.ContactChip>
                <Phone />
                <span>{selectedMember.phone}</span>
              </S.ContactChip>
              <S.ContactChip>
                <Mail />
                <span>{selectedMember.email}</span>
              </S.ContactChip>
              <S.ContactChip>
                <Calendar />
                <span>{selectedMember.joinDate} 입사</span>
              </S.ContactChip>
            </S.ContactRow>
          </S.ModalInfo>

          <S.ModalActions>
            <S.CallButton>상담 호출</S.CallButton>
          </S.ModalActions>
          <S.CloseModalButton onClick={onClose}>
            <X size={24} />
          </S.CloseModalButton>
        </S.ModalHeader>

        {/* 메인 콘텐츠 영역 */}
        <S.DetailContent>
          <S.ContentGrid>
            {/* 왼쪽 영역: 스트레스 및 성과 */}
            <S.LeftColumn>
              {/* 실시간 스트레스 바 */}
              <S.StressWidget>
                <S.WidgetHeader>
                  <p>
                    <Calendar size={12} color="#818cf8" />
                    근태 현황 (2026.01)
                  </p>
                  <div
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      fontSize: "0.625rem",
                      color: "#64748b",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "2px",
                      }}
                    >
                      <div
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "2px",
                          background: "rgba(34, 197, 94, 0.2)",
                        }}
                      ></div>
                      출근
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "2px",
                      }}
                    >
                      <div
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "2px",
                          background: "rgba(245, 158, 11, 0.2)",
                        }}
                      ></div>
                      지각
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "2px",
                      }}
                    >
                      <div
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "2px",
                          background: "rgba(244, 63, 94, 0.2)",
                        }}
                      ></div>
                      결근
                    </div>
                  </div>
                </S.WidgetHeader>
                <S.CalendarGrid>
                  {["일", "월", "화", "수", "목", "금", "토"].map((d) => (
                    <S.WeekDay key={d}>{d}</S.WeekDay>
                  ))}
                  {Array.from({ length: 31 }, (_, i) => {
                    const day = i + 1;
                    const status = selectedMember.attendanceRecord?.[day] || "";

                    return (
                      <S.DayCell key={day} status={status}>
                        {day}
                      </S.DayCell>
                    );
                  })}
                </S.CalendarGrid>
              </S.StressWidget>
            </S.LeftColumn>

            {/* 오른쪽 영역: 웰니스 및 이력 */}
            <S.RightColumn>
              {/* Cooldown Stats */}
              <S.WellnessItem>
                <S.WellnessLeft>
                  <S.WellnessIcon color="orange">
                    <Zap size={18} />
                  </S.WellnessIcon>
                  <S.WellnessLabel>쿨다운 횟수</S.WellnessLabel>
                </S.WellnessLeft>
                <S.WellnessValue color="#fb923c">
                  <p>{selectedMember.metrics.cooldowns}</p>
                  <span>회</span>
                </S.WellnessValue>
              </S.WellnessItem>
              {/* 웰니스 모니터링 */}
              <S.WellnessSection>
                <S.SectionTitle>
                  <HeartPulse size={16} color="#fb7185" />
                  웰니스 모니터링
                </S.SectionTitle>
                <S.WellnessItem>
                  <S.WellnessLeft>
                    <S.WellnessIcon color="indigo">
                      <Palmtree size={18} />
                    </S.WellnessIcon>
                    <S.WellnessLabel>잔여 연차</S.WellnessLabel>
                  </S.WellnessLeft>
                  <S.WellnessValue>
                    <p>{selectedMember.metrics.leave}</p>
                    <span>일</span>
                  </S.WellnessValue>
                </S.WellnessItem>
                <S.WellnessItem>
                  <S.WellnessLeft>
                    <S.WellnessIcon color="rose">
                      <Activity size={18} />
                    </S.WellnessIcon>
                    <S.WellnessLabel>스트레스 경고</S.WellnessLabel>
                  </S.WellnessLeft>
                  <S.WellnessValue color="#f43f5e">
                    <p>{selectedMember.metrics.alerts}</p>
                    <span>회</span>
                  </S.WellnessValue>
                </S.WellnessItem>
              </S.WellnessSection>

              {/* 최근 활동 이력 */}
              <S.WellnessSection>
                <S.SectionTitle>
                  <History size={16} color="#818cf8" />
                  최근 인사 활동 이력
                </S.SectionTitle>
                <S.HistoryList>
                  {[
                    {
                      title: "심층 심리 상담 완료",
                      date: "2026.01.20",
                      type: "Consultation",
                      icon: <MessageCircle size={18} />,
                    },
                    {
                      title: "반차 휴가 사용",
                      date: "2026.01.14",
                      type: "Leave",
                      icon: <Palmtree size={18} />,
                    },
                  ].map((item, idx) => (
                    <S.HistoryItem key={idx}>
                      <S.HistoryContent>
                        <S.HistoryIcon>{item.icon}</S.HistoryIcon>
                        <S.HistoryText>
                          <p>{item.title}</p>
                          <p>
                            {item.date} • {item.type}
                          </p>
                        </S.HistoryText>
                      </S.HistoryContent>
                      <ExternalLink size={12} color="#475569" />
                    </S.HistoryItem>
                  ))}
                </S.HistoryList>
              </S.WellnessSection>
            </S.RightColumn>
          </S.ContentGrid>
        </S.DetailContent>
      </S.ModalContainer>
    </S.ModalOverlay>
  );
};

export default AgentDetailModal;
