import React, { useState, useEffect } from 'react';
import useStore from '../../../store/useStore';
import apiClient from '../../../api/axios';
import {
  Clock,
  Calendar as CalendarIcon,
  Timer,
  FileText,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Plane,
  X,
  Send,
  CalendarPlus,
  Palmtree,
  Sparkles,
  AlertCircle,
  History,
  Briefcase,
  MessageSquare
} from 'lucide-react';
import * as S from './Attendance.styles';

const API_BASE_URL = '/employee/attendance';
const VACATION_API_URL = '/employee/vacation'; // 휴가 신청/취소는 별도 컨트롤러

const Attendance = () => {
  const { user } = useStore();
  const memberId = user?.id || 1; // Fallback to 1 if not logged in (or handle redirect)

  // 현재 날짜 상태 관리 (년, 월) - 초기값은 현재 날짜
  const [currentDate, setCurrentDate] = useState(new Date());

  const [selectedDay, setSelectedDay] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [historyPage, setHistoryPage] = useState(0);
  const [leavePage, setLeavePage] = useState(0);

  const HISTORY_PAGE_SIZE = 10;
  const LEAVE_PAGE_SIZE = 3;

  // API 데이터 상태
  const [summary, setSummary] = useState(null);
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [consultationRequests, setConsultationRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 휴가 신청 폼 상태
  const [vacationForm, setVacationForm] = useState({
    type: '연차',
    startDate: '',
    endDate: '',
    reason: '',
    halfDayType: '오후' // 반차일 경우 오전/오후 선택
  });

  // 현재 보고 있는 연도와 월
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0 ~ 11

  // 기준이 되는 오늘 날짜
  const today = new Date().getDate();

  // API 호출 함수들
  const fetchSummary = async () => {
    try {
      const response = await apiClient.get(`${API_BASE_URL}/summary`, {
        params: {
          year: year,
          month: month + 1, // 백엔드는 1-12월 사용
          memberId: memberId
        }
      });
      setSummary(response.data);
    } catch (err) {
      console.error('Failed to fetch summary:', err);
      setError('요약 정보를 불러오는데 실패했습니다.');
    }
  };

  const fetchHistory = async () => {
    try {
      const response = await apiClient.get(`${API_BASE_URL}/history`, {
        params: {
          year: year,
          month: month + 1, // 백엔드는 1-12월 사용
          memberId: memberId
        }
      });
      const history = response.data || [];
      setAttendanceHistory(history);
    } catch (err) {
      console.error('Failed to fetch history:', err);
      setError('근태 기록을 불러오는데 실패했습니다.');
    }
  };

  const fetchLeaves = async () => {
    try {
      const response = await apiClient.get(`${API_BASE_URL}/leaves`, {
        params: {
          memberId: memberId
        }
      });
      const leaves = response.data || [];
      setLeaveRequests(leaves);
    } catch (err) {
      console.error('Failed to fetch leaves:', err);
      setError('휴가 현황을 불러오는데 실패했습니다.');
    }
  };

  const fetchConsultations = async () => {
    try {
      const response = await apiClient.get('/consultations/me');
      const list = response.data || [];
      setConsultationRequests(list);
    } catch (err) {
      console.error('Failed to fetch consultations:', err);
      setConsultationRequests([]);
    }
  };

  // 휴가 목록 변경 시 페이지 범위 초과하면 첫 페이지로
  useEffect(() => {
    const maxPage = Math.max(0, Math.ceil(leaveRequests.length / LEAVE_PAGE_SIZE) - 1);
    if (leavePage > maxPage) setLeavePage(0);
  }, [leaveRequests.length, leavePage]);

  // 데이터 로딩
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      await Promise.all([fetchSummary(), fetchHistory(), fetchLeaves(), fetchConsultations()]);
      setLoading(false);
    };
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, month, memberId]);

  // 연/월 변경 시 타임라인 페이지 초기화
  useEffect(() => {
    setHistoryPage(0);
  }, [year, month]);

  // 날짜 범위가 겹치는지 확인하는 함수
  const checkDateOverlap = (startDate1, endDate1, startDate2, endDate2) => {
    const start1 = new Date(startDate1);
    const end1 = new Date(endDate1);
    const start2 = new Date(startDate2);
    const end2 = new Date(endDate2);
    return start1 <= end2 && start2 <= end1;
  };

  // 휴가 일수 계산 (반차는 0.5일, 연차는 실제 일수, 워케이션은 0일)
  const calculateVacationDays = (type, startDate, endDate) => {
    if (type === '워케이션') {
      return 0;
    }
    if (type === '반차') {
      return 0.5;
    }
    // 연차: 시작일과 종료일 사이의 일수 계산 (포함)
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  // 휴가 신청 전 중복 체크 및 남은 휴가 개수 체크
  const checkVacationValidation = (type, startDate, endDate) => {
    // 중복 체크
    const activeLeaves = leaveRequests.filter(
      leave => leave.status === '승인완료' || leave.status === '승인대기'
    );

    for (const leave of activeLeaves) {
      if (!leave.period) continue;

      // period 형식: "2026.01.25 - 01.26" 또는 "2026.01.14 (오후)" 또는 "2026.01.14"
      const parts = leave.period.split(' - ');
      let leaveStartDate, leaveEndDate;

      if (parts.length === 2) {
        // 기간 휴가: "2026.01.25 - 01.26"
        const startMatch = parts[0].match(/(\d{4})\.(\d{2})\.(\d{2})/);
        const endMatch = parts[1].match(/(\d{2})\.(\d{2})/);
        if (startMatch && endMatch) {
          const startYear = parseInt(startMatch[1]);
          const startMonth = parseInt(startMatch[2]);
          const startDay = parseInt(startMatch[3]);
          const endMonth = parseInt(endMatch[1]);
          const endDay = parseInt(endMatch[2]);
          
          // 종료일의 연도는 시작일과 같은 연도이거나 다음 연도
          const endYear = endMonth < startMonth ? startYear + 1 : startYear;
          
          leaveStartDate = `${startYear}-${String(startMonth).padStart(2, '0')}-${String(startDay).padStart(2, '0')}`;
          leaveEndDate = `${endYear}-${String(endMonth).padStart(2, '0')}-${String(endDay).padStart(2, '0')}`;
        }
      } else {
        // 단일 날짜 휴가: "2026.01.14 (오후)" 또는 "2026.01.14"
        const match = leave.period.match(/(\d{4})\.(\d{2})\.(\d{2})/);
        if (match) {
          const leaveYear = parseInt(match[1]);
          const leaveMonth = parseInt(match[2]);
          const leaveDay = parseInt(match[3]);
          leaveStartDate = `${leaveYear}-${String(leaveMonth).padStart(2, '0')}-${String(leaveDay).padStart(2, '0')}`;
          leaveEndDate = leaveStartDate;
        }
      }

      if (leaveStartDate && leaveEndDate) {
        if (checkDateOverlap(startDate, endDate, leaveStartDate, leaveEndDate)) {
          return { isValid: false, message: '해당 기간에 이미 신청되거나 승인된 휴가가 있습니다.' };
        }
      }
    }
    
    // 남은 휴가 개수 체크 (워케이션은 제외)
    if (type !== '워케이션' && summary) {
      const requestedDays = calculateVacationDays(type, startDate, endDate);
      const remainingDays = summary.remainingVacation || 0;
      
      if (requestedDays > remainingDays) {
        return { isValid: false, message: `남은 휴가가 부족합니다. (남은 휴가: ${remainingDays}일, 신청하려는 휴가: ${requestedDays}일)` };
      }
    }
    
    return { isValid: true };
  };

  // 휴가 신청 처리
  const handleVacationSubmit = async () => {
    if (!vacationForm.startDate || !vacationForm.endDate) {
      alert('시작일과 종료일을 모두 입력해주세요.');
      return;
    }

    // 중복 체크 및 남은 휴가 개수 체크
    const validation = checkVacationValidation(
      vacationForm.type,
      vacationForm.startDate,
      vacationForm.endDate
    );
    
    if (!validation.isValid) {
      alert(validation.message);
      return;
    }

    try {
      const requestData = {
        type: vacationForm.type,
        startDate: vacationForm.startDate,
        endDate: vacationForm.endDate,
        reason: vacationForm.reason || null
      };

      // 반차일 경우에만 halfDayType 추가
      if (vacationForm.type === '반차') {
        requestData.halfDayType = vacationForm.halfDayType;
      }

      const response = await apiClient.post(VACATION_API_URL, requestData, {
        params: {
          memberId: memberId
        }
      });

      if (response.data.id) {
        alert('휴가 신청이 완료되었습니다.');
        setIsModalOpen(false);
        setVacationForm({
          type: '연차',
          startDate: '',
          endDate: '',
          reason: '',
          halfDayType: '오후'
        });
        // 휴가 목록 새로고침
        await fetchLeaves();
      } else if (response.data.message) {
        alert(response.data.message);
      }
    } catch (err) {
      console.error('Failed to submit vacation request:', err);
      if (err.response?.data?.message) {
        alert(err.response.data.message);
      } else {
        alert('휴가 신청에 실패했습니다. 잠시 후 다시 시도해주세요.');
      }
    }
  };

  // 휴가 취소 처리
  const handleCancelVacation = async (vacationId) => {
    if (!confirm('휴가 신청을 취소하시겠습니까?')) {
      return;
    }

    try {
      const response = await apiClient.delete(`${VACATION_API_URL}/${vacationId}`, {
        params: {
          memberId: memberId
        }
      });

      if (response.data && response.data.id) {
        alert('휴가 신청이 취소되었습니다.');
        // 휴가 목록 및 요약 정보 새로고침
        await Promise.all([fetchLeaves(), fetchSummary()]);
      } else if (response.data && response.data.message) {
        alert(response.data.message);
      } else {
        alert('휴가 신청이 취소되었습니다.');
        await Promise.all([fetchLeaves(), fetchSummary()]);
      }
    } catch (err) {
      console.error('Failed to cancel vacation request:', err);
      if (err.response?.data?.message) {
        alert(err.response.data.message);
      } else {
        alert('휴가 취소에 실패했습니다. 잠시 후 다시 시도해주세요.');
      }
    }
  };

  // 동적으로 해당 월의 일수와 시작 요일 계산
  const getDaysInMonth = (y, m) => new Date(y, m + 1, 0).getDate();
  const getStartDayOffset = (y, m) => new Date(y, m, 1).getDay(); // 0(일) ~ 6(토)

  const daysInMonth = getDaysInMonth(year, month);
  const startDayOffset = getStartDayOffset(year, month);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDay(null); // 달이 바뀌면 선택 초기화
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDay(null); // 달이 바뀌면 선택 초기화
  };

  // 휴가 날짜 추출 (API 데이터에서)
  const getLeaveDays = () => {
    const leaveDaysMap = new Map(); // day -> { type, isWorkcation, status }
    leaveRequests.forEach(leave => {
      // 승인된 휴가와 반려된 휴가는 캘린더에 표시 (대기 중인 휴가는 표시하지 않음)
      if (leave.status !== '승인완료' && leave.status !== '반려') {
        return;
      }
      
      if (leave.period) {
        // period 형식: "2026.01.25 - 01.26" 또는 "2026.01.14 (오후)" 또는 "2026.01.14"
        const parts = leave.period.split(' - ');
        if (parts.length === 2) {
          // 기간 휴가: "2026.01.25 - 01.26"
          const startMatch = parts[0].match(/(\d{4})\.(\d{2})\.(\d{2})/);
          const endMatch = parts[1].match(/(\d{2})\.(\d{2})/);
          if (startMatch && endMatch) {
            const startYear = parseInt(startMatch[1]);
            const startMonth = parseInt(startMatch[2]);
            const startDay = parseInt(startMatch[3]);
            const endMonth = parseInt(endMatch[1]);
            const endDay = parseInt(endMatch[2]);

            // 시작일이 현재 보고 있는 월인 경우
            if (startYear === year && startMonth === month + 1) {
              // 같은 월 내에서의 기간
              if (endMonth === month + 1) {
                for (let d = startDay; d <= endDay; d++) {
                  leaveDaysMap.set(d, { type: leave.type, isWorkcation: leave.type === '워케이션', status: leave.status });
                }
              } else {
                // 시작일부터 월말까지
                for (let d = startDay; d <= daysInMonth; d++) {
                  leaveDaysMap.set(d, { type: leave.type, isWorkcation: leave.type === '워케이션', status: leave.status });
                }
              }
            }
            // 종료일이 현재 보고 있는 월인 경우 (시작일은 다른 월)
            else if (startYear === year && endMonth === month + 1) {
              // 월초부터 종료일까지
              for (let d = 1; d <= endDay; d++) {
                leaveDaysMap.set(d, { type: leave.type, isWorkcation: leave.type === '워케이션', status: leave.status });
              }
            }
          }
        } else {
          // 단일 날짜 휴가: "2026.01.14 (오후)" 또는 "2026.01.14"
          const match = leave.period.match(/(\d{4})\.(\d{2})\.(\d{2})/);
          if (match) {
            const leaveYear = parseInt(match[1]);
            const leaveMonth = parseInt(match[2]);
            const leaveDay = parseInt(match[3]);
            if (leaveYear === year && leaveMonth === month + 1) {
              leaveDaysMap.set(leaveDay, { type: leave.type, isWorkcation: leave.type === '워케이션', status: leave.status });
            }
          }
        }
      }
    });
    return leaveDaysMap;
  };

  const leaveDaysMap = getLeaveDays();

  // 상담 신청일 기준으로 day -> 상담 목록 (현재 연·월만)
  const getConsultationDaysMap = () => {
    const map = new Map();
    consultationRequests.forEach((c) => {
      if (!c.createdDate) return;
      const d = new Date(c.createdDate);
      if (d.getFullYear() !== year || d.getMonth() !== month) return;
      const day = d.getDate();
      if (!map.has(day)) map.set(day, []);
      map.get(day).push({ id: c.id, title: c.title, status: c.status, createdDate: c.createdDate });
    });
    return map;
  };
  const consultationDaysMap = getConsultationDaysMap();

  const calendarDays = Array.from({ length: 42 }, (_, i) => {
    const day = i - startDayOffset + 1;
    if (day <= 0 || day > daysInMonth) return null;

    let status = 'none';

    // 현재 월의 오늘 날짜 확인
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const isCurrentMonth = year === currentYear && month === currentMonth;

    // 휴가 날짜 확인 (우선순위가 높음)
    if (leaveDaysMap.has(day)) {
      const leaveInfo = leaveDaysMap.get(day);
      if (leaveInfo.status === '반려') {
        // 반려된 휴가는 대기 상태처럼 회색으로 표시
        status = 'leave-rejected';
      } else if (leaveInfo.isWorkcation) {
        status = 'workcation';
      } else {
        status = 'leave';
      }
    } else {
      // 근태 기록 확인
      const history = attendanceHistory.find(h => h.day === day);
      if (history) {
        if (history.status === '지각' || history.status === '결근') {
          status = 'late';
        } else if (history.status === '정상') {
          status = 'normal';
        }
      } else if (isCurrentMonth && day > today) {
        status = 'future';
      } else {
        status = 'none'; // 기록이 없는 날짜
      }
    }

    const hasConsultation = consultationDaysMap.has(day);
    return { day, status, hasConsultation };
  });

  const getSelectedDayDetails = () => {
    if (!selectedDay) return null;

    const history = attendanceHistory.find(h => h.day === selectedDay);

    // 휴가 확인 - 승인된 휴가만 캘린더에 표시되지만, 상세 현황에서는 모든 상태의 휴가를 확인
    const leaveInfo = leaveDaysMap.get(selectedDay);
    const leaveType = leaveInfo?.type ?? null;
    
    // 해당 날짜에 해당하는 모든 휴가 신청 찾기 (상태 포함)
    const leaveForDay = leaveRequests.find(leave => {
      if (!leave.period) return false;
      const parts = leave.period.split(' - ');
      if (parts.length === 2) {
        // 기간 휴가
        const startMatch = parts[0].match(/(\d{4})\.(\d{2})\.(\d{2})/);
        const endMatch = parts[1].match(/(\d{2})\.(\d{2})/);
        if (startMatch && endMatch) {
          const startYear = parseInt(startMatch[1]);
          const startMonth = parseInt(startMatch[2]);
          const startDay = parseInt(startMatch[3]);
          const endMonth = parseInt(endMatch[1]);
          const endDay = parseInt(endMatch[2]);
          
          if (startYear === year && startMonth === month + 1) {
            if (endMonth === month + 1) {
              return selectedDay >= startDay && selectedDay <= endDay;
            } else {
              return selectedDay >= startDay;
            }
          } else if (startYear === year && endMonth === month + 1) {
            return selectedDay <= endDay;
          }
        }
      } else {
        // 단일 날짜 휴가
        const match = leave.period.match(/(\d{4})\.(\d{2})\.(\d{2})/);
        if (match) {
          const leaveYear = parseInt(match[1]);
          const leaveMonth = parseInt(match[2]);
          const leaveDay = parseInt(match[3]);
          return leaveYear === year && leaveMonth === month + 1 && leaveDay === selectedDay;
        }
      }
      return false;
    });

    const isLeave = !!leaveForDay;
    const isWorkcation = leaveForDay?.type === '워케이션';
    const leaveStatus = leaveForDay?.status || null;

    // 해당 날짜에 신청한 상담 목록 (createdDate 기준)
    const consultationsForDay = consultationRequests.filter((c) => {
      if (!c.createdDate) return false;
      const d = new Date(c.createdDate);
      return d.getFullYear() === year && d.getMonth() === month && d.getDate() === selectedDay;
    });

    // 현재 월의 오늘 날짜 확인
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const isCurrentMonth = year === currentYear && month === currentMonth;
    const isFuture = isCurrentMonth && selectedDay > today;

    let statusLabel = '';
    if (isLeave) statusLabel = leaveForDay.type;
    else if (isFuture) statusLabel = '미정';
    else statusLabel = history?.status || '기록 없음';

    const consultationStatusLabel = (s) => (s === 'WAITING' ? '대기' : s === 'IN_PROGRESS' ? '진행중' : s === 'COMPLETED' ? '완료' : s === 'CANCELLED' ? '취소' : s);

    return {
      day: selectedDay,
      history,
      isLeave,
      isWorkcation,
      isFuture,
      leaveType: leaveForDay?.type || null,
      leaveStatus,
      status: statusLabel,
      consultationsForDay,
      consultationStatusLabel
    };
  };

  const details = getSelectedDayDetails();

  // 로딩 중이거나 에러가 있을 때 표시
  if (loading) {
    return (
      <S.Container>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <p>데이터를 불러오는 중...</p>
        </div>
      </S.Container>
    );
  }

  if (error && !summary && attendanceHistory.length === 0 && leaveRequests.length === 0 && consultationRequests.length === 0) {
    return (
      <S.Container>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', gap: '1rem' }}>
          <AlertCircle size={48} color="#f87171" />
          <p style={{ color: '#f87171' }}>{error}</p>
          <button
            onClick={() => {
              setError(null);
              setLoading(true);
              Promise.all([fetchSummary(), fetchHistory(), fetchLeaves(), fetchConsultations()]).finally(() => setLoading(false));
            }}
            style={{ padding: '0.5rem 1rem', backgroundColor: '#6366f1', color: 'white', border: 'none', borderRadius: '0.5rem', cursor: 'pointer' }}
          >
            다시 시도
          </button>
        </div>
      </S.Container>
    );
  }

  return (
    <S.Container>
      {/* Summary Cards */}
      <S.SummaryGrid>
        {[
          {
            icon: CalendarIcon,
            label: '이번 달 출근',
            val: summary ? String(summary.monthWorkDays) : '0',
            total: summary ? `/ ${summary.monthTotalDays}일` : '/ 0일',
            color: 'blue'
          },
          {
            icon: Timer,
            label: '지각/결근',
            val: summary ? String(summary.lateOrAbsenceCount) : '0',
            total: '건',
            color: 'orange'
          },
          {
            icon: Palmtree,
            label: '잔여 연차',
            val: summary ? String(summary.remainingVacation) : '0',
            total: '일',
            color: 'indigo'
          },
          {
            icon: Clock,
            label: '이번 주 근무',
            val: summary ? String(summary.weekWorkHours) : '0',
            total: '시간',
            color: 'green'
          }
        ].map((card, i) => (
          <S.SummaryCard key={i}>
            <S.CardHeader>
              <S.IconBox $color={card.color}>
                <card.icon size={20} />
              </S.IconBox>
              <span>{card.label}</span>
            </S.CardHeader>
            <S.CardValue>
              <span>{card.val}</span>
              <span>{card.total}</span>
            </S.CardValue>
          </S.SummaryCard>
        ))}
      </S.SummaryGrid>

      {/* Interactive Calendar & Details Section */}
      <S.MainSection>
        {/* Compact Calendar */}
        <S.CalendarColumn>
          <S.CalendarHeader>
            <h2>
              <CalendarDays size={20} color="#6366f1" />
              근태 캘린더
            </h2>
            <S.CalendarNav>
              <button onClick={handlePrevMonth}><ChevronLeft size={16} /></button>
              <span>{year}.{String(month + 1).padStart(2, '0')}</span>
              <button onClick={handleNextMonth}><ChevronRight size={16} /></button>
            </S.CalendarNav>
          </S.CalendarHeader>

          <S.CalendarGrid>
            {['일', '월', '화', '수', '목', '금', '토'].map(d => (
              <S.WeekDay key={d}>{d}</S.WeekDay>
            ))}
            {calendarDays.map((date, idx) => (
              <S.DayCell key={idx}>
                {date ? (
                  <S.DayButton
                    onClick={() => setSelectedDay(date.day)}
                    $isSelected={selectedDay === date.day}
                    $status={date.status}
                    $hasConsultation={date.hasConsultation}
                  >
                    <span>{date.day}</span>
                    {date.hasConsultation && <MessageSquare size={10} className="consultation-dot" />}
                  </S.DayButton>
                ) : <div style={{ width: '2.5rem', height: '2.5rem' }} />}
              </S.DayCell>
            ))}
          </S.CalendarGrid>

          <S.Legend>
            {[
              { label: '출근', color: 'green' },
              { label: '휴가', color: 'indigo' },
              { label: '워케이션', color: 'yellow' },
              { label: '지각', color: 'red' },
              { label: '상담', color: 'pink' },
              { label: '미정', color: 'slate' }
            ].map((l) => (
              <S.LegendItem key={l.label} $color={l.color}>
                <div />
                {l.label}
              </S.LegendItem>
            ))}
          </S.Legend>
        </S.CalendarColumn>

        {/* Selected Day Details Card */}
        <S.DetailsColumn>
          <S.DetailsCard>
            <S.StatusIndicatorBar
              $status={details?.isLeave ? (details?.isWorkcation ? '워케이션' : 'leave') : details?.status}
              $isLeave={details?.isLeave && !details?.isWorkcation}
            />

            <S.DetailsContent>
              <S.DetailsHeader>
                <div>
                  <p>상세 현황</p>
                  <h3>{year}년 {month + 1}월 {selectedDay || ''}일</h3>
                </div>
                <S.StatusBadge
                  $status={details?.status}
                  $isLeave={details?.isLeave && !details?.isWorkcation}
                >
                  {details?.status}
                </S.StatusBadge>
              </S.DetailsHeader>

              {details?.isLeave ? (
                <S.LeaveState>
                  <S.PlaneIconWrapper>
                    {details.isWorkcation ? <Briefcase size={48} color="#ca8a04" /> : <Plane size={48} color="#6366f1" />}
                  </S.PlaneIconWrapper>
                  <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                    <S.LeaveTitle>
                      [{details.leaveType}] {
                        details.leaveStatus === '승인완료' 
                          ? (details.isFuture ? '예정' : '진행 중')
                          : details.leaveStatus === '승인대기'
                          ? '승인 대기'
                          : '반려'
                      }
                    </S.LeaveTitle>
                    <S.LeaveDesc>
                      {details.leaveStatus === '승인완료' ? (
                        details.isWorkcation
                          ? '새로운 환경에서의 리프레시와 업무 집중! 성공적인 워케이션 되세요.'
                          : (details.isFuture
                            ? '다가오는 휴가 일정이 확인되었습니다. 즐거운 휴식 되세요!'
                            : '승인된 휴가로 인해 근무 기록이 없습니다. 에너지를 충전하는 소중한 시간이 되시길 바랍니다!')
                      ) : details.leaveStatus === '승인대기' ? (
                        '관리자의 승인을 기다리고 있습니다.'
                      ) : (
                        '반려된 휴가 신청입니다.'
                      )}
                    </S.LeaveDesc>
                  </div>
                  <S.InfoGrid>
                    <S.InfoBox>
                      <p>휴가 종류</p>
                      <p>{details.leaveType}</p>
                    </S.InfoBox>
                    <S.InfoBox $highlight={
                      details.leaveStatus === '승인완료' 
                        ? (details.isFuture ? '#3b82f6' : '#16a34a')
                        : details.leaveStatus === '승인대기'
                        ? '#f59e0b'
                        : '#ef4444'
                    }>
                      <p>결재 상태</p>
                      <p>{
                        details.leaveStatus === '승인완료'
                          ? (details.isFuture ? '승인 완료' : '사용 중')
                          : details.leaveStatus === '승인대기'
                          ? '승인 대기'
                          : '반려'
                      }</p>
                    </S.InfoBox>
                  </S.InfoGrid>
                </S.LeaveState>
              ) : details?.history ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
                  <S.InfoGrid>
                    <S.InfoBox>
                      <p>출근 시각</p>
                      <p>{details.history.clockIn}</p>
                    </S.InfoBox>
                    <S.InfoBox>
                      <p>퇴근 시각</p>
                      <p>{details.history.clockOut}</p>
                    </S.InfoBox>
                  </S.InfoGrid>
                  <S.WorkTimeDisplay>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ padding: '0.5rem', backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>
                        <Timer size={20} color="#6366f1" />
                      </div>
                      <span>총 근무 시간</span>
                    </div>
                    <span>{details.history.duration}</span>
                  </S.WorkTimeDisplay>
                  <S.NoteBox>
                    <p>근무 비고</p>
                    <p>{details.history.note}</p>
                  </S.NoteBox>
                </div>
              ) : details?.status === '미정' ? (
                <S.EmptyState>
                  <div>
                    <Sparkles size={40} color="#e2e8f0" />
                  </div>
                  <h4>미정 상태입니다</h4>
                  <p>
                    아직 기록이나 확정된 일정이 없습니다.<br />
                    출근 후 정상적인 근태 기록이 생성됩니다.
                  </p>
                </S.EmptyState>
              ) : (
                <S.EmptyState>
                  <div style={{ backgroundColor: '#fef2f2' }}>
                    <AlertCircle size={40} color="#f87171" />
                  </div>
                  <p style={{ fontWeight: 700, color: '#94a3b8' }}>해당 일자의 데이터가 없습니다.</p>
                </S.EmptyState>
              )}

              {details?.consultationsForDay?.length > 0 && (
                <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(30,41,59,0.2)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontWeight: 700, color: '#6366f1' }}>
                    <MessageSquare size={18} />
                    상담 신청
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {details.consultationsForDay.map((c) => (
                      <li key={c.id} style={{ padding: '0.5rem 0.75rem', background: 'rgba(99,102,241,0.08)', borderRadius: '0.5rem', fontSize: '0.875rem' }}>
                        <span style={{ fontWeight: 600 }}>{c.title}</span>
                        <span style={{ marginLeft: '0.5rem', color: '#64748b', fontSize: '0.75rem' }}>
                          {details.consultationStatusLabel(c.status)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </S.DetailsContent>
          </S.DetailsCard>
        </S.DetailsColumn>
      </S.MainSection>

      {/* Attendance History & Leave Status */}
      <S.HistorySection>
        <S.HistoryColumn>
          <S.SectionTitle>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <History size={20} color="#6366f1" />
              전체 기록 타임라인
            </div>
          </S.SectionTitle>
          <S.TableContainer>
            <S.Table>
              <thead>
                <tr>
                  {['날짜', '출근', '퇴근', '근무시간', '상태'].map(h => <th key={h}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {attendanceHistory
                  .slice(historyPage * HISTORY_PAGE_SIZE, (historyPage + 1) * HISTORY_PAGE_SIZE)
                  .map((item) => (
                    <tr key={item.id}>
                      <td><b>{item.date}</b></td>
                      <td>{item.clockIn}</td>
                      <td>{item.clockOut}</td>
                      <td>{item.duration}</td>
                      <td>
                        <S.TableStatus $status={item.status}>{item.status}</S.TableStatus>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </S.Table>
            {attendanceHistory.length > HISTORY_PAGE_SIZE && (
              <S.Pagination>
                <button
                  type="button"
                  disabled={historyPage <= 0}
                  onClick={() => setHistoryPage((p) => p - 1)}
                >
                  이전
                </button>
                <span>
                  {historyPage + 1} / {Math.ceil(attendanceHistory.length / HISTORY_PAGE_SIZE)}
                </span>
                <button
                  type="button"
                  disabled={historyPage >= Math.ceil(attendanceHistory.length / HISTORY_PAGE_SIZE) - 1}
                  onClick={() => setHistoryPage((p) => p + 1)}
                >
                  다음
                </button>
              </S.Pagination>
            )}
          </S.TableContainer>
        </S.HistoryColumn>

        <S.LeaveColumn>
          <S.SectionTitle>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileText size={20} color="#6366f1" />
              휴가 현황
            </div>
            <S.RequestButton onClick={() => setIsModalOpen(true)}>
              <CalendarPlus size={14} />
              신청
            </S.RequestButton>
          </S.SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {leaveRequests
              .slice(leavePage * LEAVE_PAGE_SIZE, (leavePage + 1) * LEAVE_PAGE_SIZE)
              .map((leave) => (
                <S.LeaveCard key={leave.id}>
                  <S.LeaveCardHeader>
                    <span>{leave.type} 신청</span>
                    <S.LeaveStatusBadge $status={leave.status}>{leave.status}</S.LeaveStatusBadge>
                  </S.LeaveCardHeader>
                  <S.LeavePeriod>{leave.period}</S.LeavePeriod>
                  <S.LeaveCardFooter>
                    <span>사용: <span>{leave.days}</span></span>
                    {leave.status === '승인대기' && (
                      <button onClick={() => handleCancelVacation(leave.id)}>취소</button>
                    )}
                  </S.LeaveCardFooter>
                </S.LeaveCard>
              ))}
            {leaveRequests.length > LEAVE_PAGE_SIZE && (
              <S.Pagination>
                <button
                  type="button"
                  disabled={leavePage <= 0}
                  onClick={() => setLeavePage((p) => p - 1)}
                >
                  이전
                </button>
                <span>
                  {leavePage + 1} / {Math.ceil(leaveRequests.length / LEAVE_PAGE_SIZE)}
                </span>
                <button
                  type="button"
                  disabled={leavePage >= Math.ceil(leaveRequests.length / LEAVE_PAGE_SIZE) - 1}
                  onClick={() => setLeavePage((p) => p + 1)}
                >
                  다음
                </button>
              </S.Pagination>
            )}
          </div>
        </S.LeaveColumn>
      </S.HistorySection>

      {/* Leave Request Modal */}
      {isModalOpen && (
        <S.ModalOverlay>
          <S.Backdrop onClick={() => setIsModalOpen(false)} />
          <S.ModalContainer>
            <S.ModalHeader>
              <S.ModalHeaderTop>
                <S.IconCircle>
                  <CalendarPlus size={24} color="white" />
                </S.IconCircle>
                <S.CloseButton onClick={() => setIsModalOpen(false)}>
                  <X size={24} color="white" />
                </S.CloseButton>
              </S.ModalHeaderTop>
              <S.ModalTitle>휴가 신청서</S.ModalTitle>
              <S.ModalSubtitle>부재 일정을 팀원들과 공유해 주세요.</S.ModalSubtitle>
            </S.ModalHeader>

            <S.ModalBody>
              <S.LabelGroup>
                <S.InputLabel>휴가 종류</S.InputLabel>
                <S.SelectWrapper>
                  <S.Select
                    value={vacationForm.type}
                    onChange={(e) => setVacationForm({ ...vacationForm, type: e.target.value })}
                  >
                    <option value="연차">연차 (1.0일)</option>
                    <option value="반차">반차 (0.5일)</option>
                    <option value="워케이션">워케이션 (0.0일) - 원격근무</option>
                  </S.Select>
                  <ChevronRight size={16} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%) rotate(90deg)', pointerEvents: 'none', color: '#94a3b8' }} />
                </S.SelectWrapper>
              </S.LabelGroup>

              {vacationForm.type === '반차' && (
                <S.LabelGroup>
                  <S.InputLabel>반차 시간</S.InputLabel>
                  <S.SelectWrapper>
                    <S.Select
                      value={vacationForm.halfDayType}
                      onChange={(e) => setVacationForm({ ...vacationForm, halfDayType: e.target.value })}
                    >
                      <option value="오전">오전 반차 (09:00 ~ 13:00)</option>
                      <option value="오후">오후 반차 (13:00 ~ 18:00)</option>
                    </S.Select>
                    <ChevronRight size={16} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%) rotate(90deg)', pointerEvents: 'none', color: '#94a3b8' }} />
                  </S.SelectWrapper>
                </S.LabelGroup>
              )}

              <S.InfoGrid>
                <S.LabelGroup>
                  <S.InputLabel>시작일</S.InputLabel>
                  <S.DateInput
                    type="date"
                    value={vacationForm.startDate}
                    onChange={(e) => setVacationForm({ ...vacationForm, startDate: e.target.value })}
                  />
                </S.LabelGroup>
                <S.LabelGroup>
                  <S.InputLabel>종료일</S.InputLabel>
                  <S.DateInput
                    type="date"
                    value={vacationForm.endDate}
                    onChange={(e) => setVacationForm({ ...vacationForm, endDate: e.target.value })}
                  />
                </S.LabelGroup>
              </S.InfoGrid>

              <S.LabelGroup>
                <S.InputLabel>신청 사유</S.InputLabel>
                <S.TextArea
                  placeholder="사유를 간단히 입력해 주세요 (선택 사항)"
                  value={vacationForm.reason}
                  onChange={(e) => setVacationForm({ ...vacationForm, reason: e.target.value })}
                />
              </S.LabelGroup>

              <S.SubmitModalButton onClick={handleVacationSubmit}>
                <Send size={20} />
                신청 완료
              </S.SubmitModalButton>
            </S.ModalBody>
          </S.ModalContainer>
        </S.ModalOverlay>
      )}
    </S.Container>
  );
};

export default Attendance;
