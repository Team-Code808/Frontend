import React, { useState } from 'react';
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

const Attendance = () => {
  // 현재 날짜 상태 관리 (년, 월) - 초기값은 2026년 1월
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0));

  const [selectedDay, setSelectedDay] = useState(20);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 현재 보고 있는 연도와 월
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0 ~ 11

  // 기준이 되는 오늘 날짜 (데모용 - 2026.01.20)
  const today = 20;

  const attendanceHistory = [
    { id: 1, day: 20, date: '2026.01.20 (화)', clockIn: '08:52', clockOut: '18:05', status: '정상', duration: '9h 13m', note: '특이사항 없음' },
    { id: 2, day: 19, date: '2026.01.19 (월)', clockIn: '09:12', clockOut: '18:30', status: '지각', duration: '9h 18m', note: '교통 체증으로 인한 지각' },
    { id: 3, day: 16, date: '2026.01.16 (금)', clockIn: '08:45', clockOut: '18:10', status: '정상', duration: '9h 25m', note: '특이사항 없음' },
    { id: 4, day: 15, date: '2026.01.15 (목)', clockIn: '08:58', clockOut: '17:55', status: '정상', duration: '8h 57m', note: '조기 퇴근 승인' },
  ];

  const leaveRequests = [
    { id: 1, type: '연차', period: '2026.01.25 - 01.26', status: '승인대기', days: '2일' },
    { id: 2, type: '반차', period: '2026.01.14 (오후)', status: '승인완료', days: '0.5일' },
    { id: 3, type: '워케이션', period: '2026.01.27 - 01.28', status: '승인완료', days: '0.0일' },
  ];

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

  const calendarDays = Array.from({ length: 42 }, (_, i) => {
    const day = i - startDayOffset + 1;
    if (day <= 0 || day > daysInMonth) return null;

    let status = 'none';

    // Mock data는 2026년 1월 기준이므로, 현재 보고 있는 달이 2026년 1월일 때만 상태 표시
    const isTargetMonth = year === 2026 && month === 0;

    if (isTargetMonth) {
      if ([14, 25, 26].includes(day)) {
        status = 'leave';
      } else if ([27, 28].includes(day)) {
        status = 'workcation';
      }
      else if (day <= today) {
        if ([5, 6, 7, 8, 9, 12, 13, 15, 16, 20].includes(day)) status = 'normal';
        if ([19].includes(day)) status = 'late';
      }
      else {
        status = 'future';
      }
    } else {
      status = 'none';
    }

    return { day, status };
  });

  const getSelectedDayDetails = () => {
    if (!selectedDay) return null;

    // 선택된 날짜에 대한 정보 조회도 2026년 1월 기준 mock data
    const isTargetMonth = year === 2026 && month === 0;
    if (!isTargetMonth) {
      return {
        day: selectedDay,
        history: null,
        isLeave: false,
        isWorkcation: false,
        isFuture: false,
        leaveType: null,
        status: '기록 없음'
      };
    }

    const history = attendanceHistory.find(h => h.day === selectedDay);

    let leaveType = null;
    if (selectedDay === 14) leaveType = '반차';
    if ([25, 26].includes(selectedDay)) leaveType = '연차';
    if ([27, 28].includes(selectedDay)) leaveType = '워케이션';

    const isLeave = !!leaveType;
    const isWorkcation = leaveType === '워케이션';
    const isFuture = selectedDay > today;

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

  return (
    <S.Container>
      {/* Summary Cards */}
      <S.SummaryGrid>
        {[
          { icon: CalendarIcon, label: '이번 달 출근', val: '14', total: '/ 21일', color: 'blue' },
          { icon: Timer, label: '지각/결근', val: '1', total: '건', color: 'orange' },
          { icon: Palmtree, label: '잔여 연차', val: '12.5', total: '일', color: 'indigo' },
          { icon: Clock, label: '이번 주 근무', val: '28.5', total: '시간', color: 'green' }
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
                  <S.Select>
                    <option>연차 (1.0일)</option>
                    <option>반차 (0.5일)</option>
                    <option>워케이션 (0.0일) - 원격근무</option>
                  </S.Select>
                  <ChevronRight size={16} style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%) rotate(90deg)', pointerEvents: 'none', color: '#94a3b8' }} />
                </S.SelectWrapper>
              </S.LabelGroup>

              <S.InfoGrid>
                <S.LabelGroup>
                  <S.InputLabel>시작일</S.InputLabel>
                  <S.DateInput type="date" />
                </S.LabelGroup>
                <S.LabelGroup>
                  <S.InputLabel>종료일</S.InputLabel>
                  <S.DateInput type="date" />
                </S.LabelGroup>
              </S.InfoGrid>

              <S.LabelGroup>
                <S.InputLabel>신청 사유</S.InputLabel>
                <S.TextArea placeholder="사유를 간단히 입력해 주세요 (선택 사항)" />
              </S.LabelGroup>

              <S.SubmitModalButton
                onClick={() => {
                  alert('휴가 신청이 완료되었습니다.');
                  setIsModalOpen(false);
                }}
              >
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
