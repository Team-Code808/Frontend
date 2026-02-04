import React, { useState } from 'react';
import {
  X,
  Phone,
  Mail,
  Calendar,
  Palmtree,
  Zap,
  Activity,
  HeartPulse,
  History,
  MessageCircle,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import * as S from '../TeamManagement.styles';

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

function getFirstDayOffset(year, month) {
  return new Date(year, month - 1, 1).getDay();
}

const LEGEND_ITEMS = [
  { label: '출근', bg: 'rgba(34, 197, 94, 0.2)' },
  { label: '지각', bg: 'rgba(245, 158, 11, 0.2)' },
  { label: '결근', bg: 'rgba(244, 63, 94, 0.2)' },
];

const MOCK_HISTORY = [
  { title: '심층 심리 상담 완료', date: '2026.01.20', type: 'Consultation', icon: <MessageCircle size={18} /> },
  { title: '반차 휴가 사용', date: '2026.01.14', type: 'Leave', icon: <Palmtree size={18} /> },
];

export default function MemberDetailModal({ member, onClose }) {
  const now = new Date();
  const [displayYear, setDisplayYear] = useState(now.getFullYear());
  const [displayMonth, setDisplayMonth] = useState(now.getMonth() + 1);

  if (!member) return null;

  const daysInMonth = getDaysInMonth(displayYear, displayMonth);
  const firstDayOffset = getFirstDayOffset(displayYear, displayMonth);

  const goPrevMonth = () => {
    if (displayMonth === 1) {
      setDisplayMonth(12);
      setDisplayYear((y) => y - 1);
    } else {
      setDisplayMonth((m) => m - 1);
    }
  };

  const goNextMonth = () => {
    if (displayMonth === 12) {
      setDisplayMonth(1);
      setDisplayYear((y) => y + 1);
    } else {
      setDisplayMonth((m) => m + 1);
    }
  };

  const monthLabel = `${displayYear}.${String(displayMonth).padStart(2, '0')}`;

  return (
    <S.ModalOverlay>
      <S.Backdrop onClick={onClose} />
      <S.ModalContainer>
        <S.ModalHeader status={member.status}>
          <S.ModalAvatar>{member.avatar}</S.ModalAvatar>
          <S.ModalInfo>
            <S.NameTitle>
              <h2>{member.name}</h2>
              <span>{member.role} • {member.dept}</span>
            </S.NameTitle>
            <S.ContactRow>
              <S.ContactChip>
                <Phone />
                <span>{member.phone}</span>
              </S.ContactChip>
              <S.ContactChip>
                <Mail />
                <span>{member.email}</span>
              </S.ContactChip>
              <S.ContactChip>
                <Calendar />
                <span>{member.joinDate ? `${member.joinDate} 입사` : '-'}</span>
              </S.ContactChip>
              <S.ContactChip>
                <Palmtree size={14} />
                <span>잔여 연차: {typeof member.remainingLeave === 'number' ? `${member.remainingLeave}일` : (member.remainingLeave ?? member.metrics?.leave ?? '-')}</span>
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

        <S.DetailContent>
          <S.ContentGrid>
            <S.LeftColumn>
              <S.CalendarWidget>
                <S.WidgetHeader>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button
                      type="button"
                      onClick={goPrevMonth}
                      aria-label="이전 달"
                      style={{
                        padding: '0.25rem',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#94a3b8',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <p style={{ margin: 0, minWidth: '7rem', textAlign: 'center' }}>
                      <Calendar size={12} color="#818cf8" style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                      근태 현황 ({monthLabel})
                    </p>
                    <button
                      type="button"
                      onClick={goNextMonth}
                      aria-label="다음 달"
                      style={{
                        padding: '0.25rem',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#94a3b8',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      gap: '0.5rem',
                      fontSize: '0.625rem',
                      color: '#64748b',
                      alignItems: 'center',
                    }}
                  >
                    {LEGEND_ITEMS.map(({ label, bg }) => (
                      <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                        <div
                          style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '2px',
                            background: bg,
                          }}
                        />
                        {label}
                      </div>
                    ))}
                  </div>
                </S.WidgetHeader>
                <S.CalendarGrid>
                  {WEEKDAYS.map((d) => (
                    <S.WeekDay key={d}>{d}</S.WeekDay>
                  ))}
                  {Array.from({ length: firstDayOffset }, (_, i) => (
                    <div key={`empty-${i}`} />
                  ))}
                  {Array.from({ length: daysInMonth }, (_, i) => {
                    const day = i + 1;
                    const status = member.attendanceRecord?.[day] || '';
                    return (
                      <S.DayCell key={day} status={status}>
                        {day}
                      </S.DayCell>
                    );
                  })}
                </S.CalendarGrid>
              </S.CalendarWidget>
            </S.LeftColumn>

            <S.RightColumn>
              <S.WellnessItem>
                <S.WellnessLeft>
                  <S.WellnessIcon color="orange">
                    <Zap size={18} />
                  </S.WellnessIcon>
                  <S.WellnessLabel>쿨다운 횟수</S.WellnessLabel>
                </S.WellnessLeft>
                <S.WellnessValue color="#fb923c">
                  <p>{member.metrics.cooldowns}</p>
                  <span>회</span>
                </S.WellnessValue>
              </S.WellnessItem>

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
                    <p>{member.metrics.leave}</p>
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
                    <p>{member.metrics.alerts}</p>
                    <span>회</span>
                  </S.WellnessValue>
                </S.WellnessItem>
              </S.WellnessSection>

              <S.WellnessSection>
                <S.SectionTitle>
                  <History size={16} color="#818cf8" />
                  최근 인사 활동 이력
                </S.SectionTitle>
                <S.HistoryList>
                  {MOCK_HISTORY.map((item, idx) => (
                    <S.HistoryItem key={idx}>
                      <S.HistoryContent>
                        <S.HistoryIcon>{item.icon}</S.HistoryIcon>
                        <S.HistoryText>
                          <p>{item.title}</p>
                          <p>{item.date} • {item.type}</p>
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
}
