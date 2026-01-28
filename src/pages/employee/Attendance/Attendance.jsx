import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  Briefcase
} from 'lucide-react';
import * as S from './Attendance.styles';

const API_BASE_URL = 'http://localhost:8080/api/employee/attendance';
const MEMBER_ID = 1; // 임시 memberId (나중에 인증 연동 시 수정)

const Attendance = () => {
  // 현재 날짜 상태 관리 (년, 월) - 초기값은 현재 날짜
  const [currentDate, setCurrentDate] = useState(new Date());

  const [selectedDay, setSelectedDay] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // API 데이터 상태
  const [summary, setSummary] = useState(null);
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 휴가 신청 폼 상태
  const [vacationForm, setVacationForm] = useState({
    type: '연차',
    startDate: '',
    endDate: '',
    reason: ''
  });

  // 현재 보고 있는 연도와 월
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0 ~ 11

  // 기준이 되는 오늘 날짜
  const today = new Date().getDate();

  // API 호출 함수들
  const fetchSummary = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/summary`, {
        params: {
          year: year,
          month: month + 1, // 백엔드는 1-12월 사용
          memberId: MEMBER_ID
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
      const response = await axios.get(`${API_BASE_URL}/history`, {
        params: {
          year: year,
          month: month + 1, // 백엔드는 1-12월 사용
          memberId: MEMBER_ID
        }
      });
      setAttendanceHistory(response.data || []);
    } catch (err) {
      console.error('Failed to fetch history:', err);
      setError('근태 기록을 불러오는데 실패했습니다.');
    }
  };

  const fetchLeaves = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/leaves`, {
        params: {
          memberId: MEMBER_ID
        }
      });
      setLeaveRequests(response.data || []);
    } catch (err) {
      console.error('Failed to fetch leaves:', err);
      setError('휴가 현황을 불러오는데 실패했습니다.');
    }
  };

  // 데이터 로딩
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      await Promise.all([fetchSummary(), fetchHistory(), fetchLeaves()]);
      setLoading(false);
    };
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, month]);

  // 휴가 신청 처리
  const handleVacationSubmit = async () => {
    if (!vacationForm.startDate || !vacationForm.endDate) {
      alert('시작일과 종료일을 모두 입력해주세요.');
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/vacation`, {
        type: vacationForm.type,
        startDate: vacationForm.startDate,
        endDate: vacationForm.endDate,
        reason: vacationForm.reason || null
      }, {
        params: {
          memberId: MEMBER_ID
        }
      });

      if (response.data.id) {
        alert('휴가 신청이 완료되었습니다.');
        setIsModalOpen(false);
        setVacationForm({
          type: '연차',
          startDate: '',
          endDate: '',
          reason: ''
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
    const leaveDays = new Set();
    leaveRequests.forEach(leave => {
      if (leave.period) {
        // period 형식: "2026.01.25 - 01.26" 또는 "2026.01.14 (오후)"
        const parts = leave.period.split(' - ');
        if (parts.length === 2) {
          // 기간 휴가
          const startMatch = parts[0].match(/(\d{4})\.(\d{2})\.(\d{2})/);
          const endMatch = parts[1].match(/(\d{2})\.(\d{2})/);
          if (startMatch && endMatch) {
            const startYear = parseInt(startMatch[1]);
            const startMonth = parseInt(startMatch[2]);
            const startDay = parseInt(startMatch[3]);
            const endDay = parseInt(endMatch[1]);
            
            if (startYear === year && startMonth === month + 1) {
              for (let d = startDay; d <= endDay; d++) {
                leaveDays.add(d);
              }
            }
          }
        } else {
          // 단일 날짜 휴가
          const match = leave.period.match(/(\d{4})\.(\d{2})\.(\d{2})/);
          if (match) {
            const leaveYear = parseInt(match[1]);
            const leaveMonth = parseInt(match[2]);
            const leaveDay = parseInt(match[3]);
            if (leaveYear === year && leaveMonth === month + 1) {
              leaveDays.add(leaveDay);
            }
          }
        }
      }
    });
    return leaveDays;
  };

  const leaveDays = getLeaveDays();

  const calendarDays = Array.from({ length: 42 }, (_, i) => {
    const day = i - startDayOffset + 1;
    if (day <= 0 || day > daysInMonth) return null;

    let status = 'none';

    // 현재 월의 오늘 날짜 확인
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const isCurrentMonth = year === currentYear && month === currentMonth;
    const isToday = isCurrentMonth && day === today;

    // 휴가 날짜 확인
    if (leaveDays.has(day)) {
      const leave = leaveRequests.find(l => {
        const period = l.period || '';
        if (period.includes('워케이션')) {
          return period.includes(`${year}.${String(month + 1).padStart(2, '0')}.${String(day).padStart(2, '0')}`);
        }
        return period.includes(`${year}.${String(month + 1).padStart(2, '0')}.${String(day).padStart(2, '0')}`);
      });
      if (leave?.type === '워케이션') {
        status = 'workcation';
      } else {
        status = 'leave';
      }
    } else {
      // 근태 기록 확인
      const history = attendanceHistory.find(h => h.day === day);
      if (history) {
        if (history.status === '지각') {
          status = 'late';
        } else {
          status = 'normal';
        }
      } else if (isCurrentMonth && day > today) {
        status = 'future';
      } else if (isCurrentMonth && day < today) {
        status = 'none'; // 기록이 없는 과거 날짜
      }
    }

    return { day, status };
  });

  const getSelectedDayDetails = () => {
    if (!selectedDay) return null;

    const history = attendanceHistory.find(h => h.day === selectedDay);

    // 휴가 확인
    let leaveType = null;
    const leave = leaveRequests.find(l => {
      const period = l.period || '';
      const dateStr = `${year}.${String(month + 1).padStart(2, '0')}.${String(selectedDay).padStart(2, '0')}`;
      return period.includes(dateStr);
    });

    if (leave) {
      leaveType = leave.type;
    }

    const isLeave = !!leaveType;
    const isWorkcation = leaveType === '워케이션';
    
    // 현재 월의 오늘 날짜 확인
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const isCurrentMonth = year === currentYear && month === currentMonth;
    const isFuture = isCurrentMonth && selectedDay > today;

    let statusLabel = '';
    if (isLeave) statusLabel = leaveType;
    else if (isFuture) statusLabel = '미정';
    else statusLabel = history?.status || '기록 없음';

    return {
      day: selectedDay,
      history,
      isLeave,
      isWorkcation,
      isFuture,
      leaveType,
      status: statusLabel
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

  if (error && !summary && attendanceHistory.length === 0 && leaveRequests.length === 0) {
    return (
      <S.Container>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', gap: '1rem' }}>
          <AlertCircle size={48} color="#f87171" />
          <p style={{ color: '#f87171' }}>{error}</p>
          <button 
            onClick={() => {
              setError(null);
              setLoading(true);
              Promise.all([fetchSummary(), fetchHistory(), fetchLeaves()]).finally(() => setLoading(false));
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
                  >
                    {date.day}
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
                    <S.LeaveTitle>[{details.leaveType}] {details.isFuture ? '예정' : '진행 중'}</S.LeaveTitle>
                    <S.LeaveDesc>
                      {details.isWorkcation
                        ? '새로운 환경에서의 리프레시와 업무 집중! 성공적인 워케이션 되세요.'
                        : (details.isFuture
                          ? '다가오는 휴가 일정이 확인되었습니다. 즐거운 휴식 되세요!'
                          : '승인된 휴가로 인해 근무 기록이 없습니다. 에너지를 충전하는 소중한 시간이 되시길 바랍니다!')
                      }
                    </S.LeaveDesc>
                  </div>
                  <S.InfoGrid>
                    <S.InfoBox>
                      <p>휴가 종류</p>
                      <p>{details.leaveType}</p>
                    </S.InfoBox>
                    <S.InfoBox $highlight={details.isFuture ? '#3b82f6' : '#16a34a'}>
                      <p>결재 상태</p>
                      <p>{details.isFuture ? '승인 완료' : '사용 중'}</p>
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
                {attendanceHistory.map((item) => (
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
            {leaveRequests.map((leave) => (
              <S.LeaveCard key={leave.id}>
                <S.LeaveCardHeader>
                  <span>{leave.type} 신청</span>
                  <S.LeaveStatusBadge $status={leave.status}>{leave.status}</S.LeaveStatusBadge>
                </S.LeaveCardHeader>
                <S.LeavePeriod>{leave.period}</S.LeavePeriod>
                <S.LeaveCardFooter>
                  <span>사용: <span>{leave.days}</span></span>
                  {leave.status === '승인대기' && <button>취소</button>}
                </S.LeaveCardFooter>
              </S.LeaveCard>
            ))}
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
