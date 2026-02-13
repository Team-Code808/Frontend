import React, { useState, useEffect } from "react";
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
} from "lucide-react";
import * as S from "../Dashboard.styles"; // Dashboard styles usage
// import { teamApi } from '../../../api/teamApi'; // Removed hard dependency

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

function getFirstDayOffset(year, month) {
  return new Date(year, month - 1, 1).getDay();
}

const LEGEND_ITEMS = [
  { label: "출근", bg: "rgba(34, 197, 94, 0.2)" },
  { label: "지각", bg: "rgba(234, 179, 8, 0.2)" },
  { label: "결근", bg: "rgba(239, 68, 68, 0.2)" },
  { label: "휴가/휴가예정", bg: "rgba(167, 139, 250, 0.2)" },
];

const MOCK_HISTORY = [
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
];

// Mock API function (Local to this file or imported from API)
const fetchMockAttendance = async (memberId, year, month) => {
    // 0.2초 딜레이
    await new Promise((resolve) => setTimeout(resolve, 200));
    
    // 간단한 Mock 데이터 생성
    const daysInMonth = new Date(year, month, 0).getDate();
    const mockData = {};
    for (let i = 1; i <= daysInMonth; i++) {
        const rand = Math.random();
        if (rand > 0.9) mockData[i] = "결근";
        else if (rand > 0.8) mockData[i] = "지각";
        else mockData[i] = "출근";
    }
    return mockData;
};

export default function AgentDetailModal({ selectedMember, onClose }) {
  const member = selectedMember; // Compatible naming
  const now = new Date();
  const [displayYear, setDisplayYear] = useState(now.getFullYear());
  const [displayMonth, setDisplayMonth] = useState(now.getMonth() + 1);
  const [attendanceRecord, setAttendanceRecord] = useState({});

  useEffect(() => {
    if (!member?.id) {
      setAttendanceRecord({});
      return;
    }
    let cancelled = false;
    
    // Use Mock API directly here or inject via props if needed
    fetchMockAttendance(member.id, displayYear, displayMonth)
      .then((data) => {
        if (!cancelled) setAttendanceRecord(data || {});
      })
      .catch(() => {
        if (!cancelled) setAttendanceRecord({});
      });
    return () => { cancelled = true; };
  }, [member?.id, displayYear, displayMonth]);

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

  const monthLabel = `${displayYear}.${String(displayMonth).padStart(2, "0")}`;

  return (
    <S.ModalOverlay>
      <S.Backdrop onClick={onClose} />
      <S.ModalContainer>
        <S.ModalHeader status={member.status}>
          <S.ModalAvatar>{member.avatar}</S.ModalAvatar>
          <S.ModalInfo>
            <S.NameTitle>
              <h2>{member.name}</h2>
              <span>
                {member.role} • {member.dept}
              </span>
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
                <span>{member.joinDate ? `${member.joinDate} 입사` : "-"}</span>
              </S.ContactChip>
               <S.ContactChip>
                <Palmtree size={14} />
                <span>잔여 연차: {typeof member.remainingLeave === 'number' ? `${member.remainingLeave}일` : (member.remainingLeave ?? member.metrics?.leave ?? '-')}</span>
              </S.ContactChip>
            </S.ContactRow>
          </S.ModalInfo>
          <S.CloseModalButton onClick={onClose}>
            <X size={24} />
          </S.CloseModalButton>
        </S.ModalHeader>

        <S.DetailContent>
          <S.ContentGrid>
            <S.LeftColumn>
              {/* Calendar Widget (Reused from MemberDetailModal) */}
              <S.Container style={{ padding: 0, boxShadow: 'none', background: 'transparent' }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <button onClick={goPrevMonth} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><ChevronLeft size={20} /></button>
                        <span style={{ fontWeight: 'bold' }}>{monthLabel} 근태 현황</span>
                        <button onClick={goNextMonth} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><ChevronRight size={20} /></button>
                    </div>
                </div>
                <S.CalendarGrid>
                  {WEEKDAYS.map((d) => (
                    <S.WeekDay key={d}>{d}</S.WeekDay>
                  ))}
                  {Array.from({ length: firstDayOffset }, (_, i) => (
                    <div key={`empty-${i}`} />
                  ))}
                  {Array.from({ length: daysInMonth }, (_, i) => {
                    const day = i + 1;
                    const status = attendanceRecord[day] || "";
                    return (
                      <S.DayCell key={day} status={status}>
                        {day}
                      </S.DayCell>
                    );
                  })}
                </S.CalendarGrid>
              </S.Container>
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
                  <p>{member.metrics?.cooldowns || 0}</p>
                  <span>회</span>
                </S.WellnessValue>
              </S.WellnessItem>
              
               {/* Simplified Wellness Section */}
              <S.WellnessSection>
                 <S.SectionTitle>
                  <HeartPulse size={16} color="#fb7185" />
                  웰니스 모니터링
                </S.SectionTitle>
                 <S.WellnessItem>
                   <S.WellnessLabel>현재 스트레스</S.WellnessLabel>
                   <S.WellnessValue color="#f43f5e">
                    <p>{member.stress}%</p>
                   </S.WellnessValue>
                 </S.WellnessItem>
              </S.WellnessSection>
               
               {/* History Section */}
               <S.WellnessSection>
                <S.SectionTitle>
                  <History size={16} color="#818cf8" />
                  최근 활동
                </S.SectionTitle>
                <S.HistoryList>
                  {MOCK_HISTORY.map((item, idx) => (
                    <S.HistoryItem key={idx}>
                       <S.HistoryText>{item.title}</S.HistoryText>
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
