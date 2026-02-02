import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  ChevronRight,
  AlertTriangle,
  Mail,
  Phone,
  X,
  MessageCircle,
  History,
  ExternalLink,
  Activity,
  Trophy,
  Palmtree,
  Calendar,
  Zap,
  Coins,
  HeartPulse,
  Plus,
  Building2
} from 'lucide-react';
import useStore from '../../../store/useStore';
import * as S from './TeamManagement.styles';

const DEFAULT_DEPARTMENTS = ['상담 1팀', '상담 2팀', '상담 3팀', '운영지원', '기술지원'];

// Helper to generate mock attendance data
const generateMockAttendance = (seed) => {
  const attendance = {};
  for (let i = 1; i <= 31; i++) {
    // Basic pattern based on seed to make them different
    const rand = (seed + i * 7) % 100;

    // Weekends (Jan 1, 2026 is Thursday)
    // 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
    const dayOfWeek = (i + 3) % 7; // (1+3)%7 = 4 (Thu)

    if (dayOfWeek === 0 || dayOfWeek === 6) {
      attendance[i] = ''; // Weekend
    } else {
      if (rand < 5) attendance[i] = 'absent';
      else if (rand < 15) attendance[i] = 'late';
      else if (rand < 25) attendance[i] = 'vacation';
      else attendance[i] = 'present';
    }
  }
  return attendance;
};

const MOCK_TEAM = [
  {
    id: 1, name: '이민수', dept: '상담 1팀', role: '팀장', stress: 32, phone: '010-2841-7011', email: 'ms.lee@calmdesk.com', joinDate: '2022.05.10', avatar: '👨‍💼', status: '출근',
    metrics: { csat: 4.8, aht: '3m 45s', attendance: 98, leave: 14.5, cooldowns: 2, alerts: 0, points: '4,850' },
    attendanceRecord: generateMockAttendance(1)
  },
  {
    id: 2, name: '박진호', dept: '상담 1팀', role: '시니어', stress: 88, phone: '010-3921-7025', email: 'jh.park@calmdesk.com', joinDate: '2021.11.15', avatar: '👨‍💻', status: '자리비움',
    metrics: { csat: 4.2, aht: '4m 12s', attendance: 92, leave: 8, cooldowns: 12, alerts: 5, points: '2,120' },
    attendanceRecord: generateMockAttendance(2)
  },
  {
    id: 3, name: '이지은', dept: '상담 2팀', role: '상담원', stress: 82, phone: '010-4822-7042', email: 'je.lee@calmdesk.com', joinDate: '2023.02.01', avatar: '👩‍💼', status: '자리비움',
    metrics: { csat: 4.5, aht: '3m 58s', attendance: 95, leave: 11, cooldowns: 8, alerts: 3, points: '3,400' },
    attendanceRecord: generateMockAttendance(3)
  },
  {
    id: 4, name: '강동원', dept: '상담 1팀', role: '상담원', stress: 79, phone: '010-5811-7103', email: 'dw.kang@calmdesk.com', joinDate: '2022.08.20', avatar: '🧔', status: '휴가',
    metrics: { csat: 3.9, aht: '5m 05s', attendance: 89, leave: 5.5, cooldowns: 15, alerts: 4, points: '1,850' },
    attendanceRecord: generateMockAttendance(4)
  },
  {
    id: 5, name: '김태리', dept: '상담 3팀', role: '상담원', stress: 75, phone: '010-6721-7118', email: 'tr.kim@calmdesk.com', joinDate: '2023.01.10', avatar: '👩‍🔬', status: '출근',
    metrics: { csat: 4.7, aht: '3m 30s', attendance: 100, leave: 18, cooldowns: 1, alerts: 1, points: '5,200' },
    attendanceRecord: generateMockAttendance(5)
  },
  {
    id: 6, name: '최우식', dept: '상담 2팀', role: '상담원', stress: 72, phone: '010-7214-7150', email: 'ws.choi@calmdesk.com', joinDate: '2022.12.05', avatar: '👨‍🎨', status: '퇴근',
    metrics: { csat: 4.1, aht: '4m 45s', attendance: 94, leave: 12, cooldowns: 6, alerts: 2, points: '2,900' },
    attendanceRecord: generateMockAttendance(6)
  },
  {
    id: 7, name: '서예진', dept: '상담 3팀', role: '상담원', stress: 45, phone: '010-8123-7200', email: 'yj.seo@calmdesk.com', joinDate: '2024.01.15', avatar: '👩‍🎨', status: '출근',
    metrics: { csat: 4.9, aht: '3m 20s', attendance: 99, leave: 15, cooldowns: 0, alerts: 0, points: '1,200' },
    attendanceRecord: generateMockAttendance(7)
  },
];

const AdminTeamManagement = () => {
  const { user } = useStore();
  const [selectedDept, setSelectedDept] = useState('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);
  const [showAddDeptModal, setShowAddDeptModal] = useState(false);
  const [newDeptName, setNewDeptName] = useState('');
  const [departments, setDepartments] = useState(['전체', ...DEFAULT_DEPARTMENTS]);

  // 회사 정보에서 부서 목록 가져오기
  useEffect(() => {
    if (user?.companyCode) {
      const companies = JSON.parse(localStorage.getItem('companies') || '[]');
      const company = companies.find(c => c.companyCode === user.companyCode);
      if (company && company.departments) {
        setDepartments(['전체', ...company.departments]);
      }
    }
  }, [user]);

  const handleAddDepartment = () => {
    if (!newDeptName.trim()) {
      alert('부서명을 입력해주세요.');
      return;
    }

    if (departments.includes(newDeptName.trim())) {
      alert('이미 존재하는 부서입니다.');
      return;
    }

    if (user?.companyCode) {
      const companies = JSON.parse(localStorage.getItem('companies') || '[]');
      const companyIndex = companies.findIndex(c => c.companyCode === user.companyCode);
      
      if (companyIndex >= 0) {
        const updatedDepartments = [...companies[companyIndex].departments, newDeptName.trim()];
        companies[companyIndex].departments = updatedDepartments;
        localStorage.setItem('companies', JSON.stringify(companies));
        setDepartments(['전체', ...updatedDepartments]);
        setNewDeptName('');
        setShowAddDeptModal(false);
      } else {
        alert('회사 정보를 찾을 수 없습니다.');
      }
    } else {
      alert('회사 코드가 없습니다.');
    }
  };

  const filteredTeam = MOCK_TEAM.filter(member => {
    const matchesDept = selectedDept === '전체' || member.dept === selectedDept;
    const matchesSearch = member.name.includes(searchQuery);
    return matchesDept && matchesSearch;
  });

  const stats = {
    total: MOCK_TEAM.length,
    danger: MOCK_TEAM.filter(m => m.stress >= 80).length,
    caution: MOCK_TEAM.filter(m => m.stress >= 70 && m.stress < 80).length,
  };

  return (
    <S.Container>
      <S.SummaryGrid>
        <S.StatCard>
          <S.IconBox color="blue">
            <Users size={24} />
          </S.IconBox>
          <S.StatInfo color="white">
            <p>전체 인원</p>
            <p>{stats.total}명</p>
          </S.StatInfo>
        </S.StatCard>
        <S.StatCard>
          <S.IconBox color="rose">
            <AlertTriangle size={24} />
          </S.IconBox>
          <S.StatInfo color="rose">
            <p>위험군</p>
            <p>{stats.danger}명</p>
          </S.StatInfo>
        </S.StatCard>
        <S.StatCard>
          <S.IconBox color="orange">
            <Activity size={24} />
          </S.IconBox>
          <S.StatInfo color="orange">
            <p>주의 필요</p>
            <p>{stats.caution}명</p>
          </S.StatInfo>
        </S.StatCard>
      </S.SummaryGrid>

      <S.SearchBar>
        <S.FilterSelectWrapper>
          <S.FilterSelect
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </S.FilterSelect>
          <S.AddDeptButton onClick={() => setShowAddDeptModal(true)}>
            <Plus size={16} />
            부서 추가
          </S.AddDeptButton>
        </S.FilterSelectWrapper>
        <S.SearchInputWrapper>
          <Search />
          <S.SearchInput
            type="text"
            placeholder="직원 이름 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </S.SearchInputWrapper>
      </S.SearchBar>

      <S.MemberList>
        {filteredTeam.map(member => (
          <S.MemberCard key={member.id} onClick={() => setSelectedMember(member)}>
            <S.CardContent>
              <S.MemberProfile>
                <S.AvatarBox>{member.avatar}</S.AvatarBox>
                <S.MemberNames>
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                </S.MemberNames>
              </S.MemberProfile>

              <S.MemberStats>
                <S.StatColumn white>
                  <span>Department</span>
                  <span>{member.dept}</span>
                </S.StatColumn>
                <S.StatColumn stress value={member.stress}>
                  <span>Stress</span>
                  <span>{member.stress}%</span>
                </S.StatColumn>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <S.StatusBadge status={member.status}>{member.status}</S.StatusBadge>
                </div>
              </S.MemberStats>
              <ChevronRight size={16} color="#334155" />
            </S.CardContent>
          </S.MemberCard>
        ))}
      </S.MemberList>

      {selectedMember && (
        <S.ModalOverlay>
          <S.Backdrop onClick={() => setSelectedMember(null)} />
          <S.ModalContainer>

            {/* Upper Profile Header */}
            <S.ModalHeader status={selectedMember.status}>
              <S.ModalAvatar>{selectedMember.avatar}</S.ModalAvatar>
              <S.ModalInfo>
                <S.NameTitle>
                  <h2>{selectedMember.name}</h2>
                  <span>{selectedMember.role} • {selectedMember.dept}</span>
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
                  <S.ContactChip>
                    <Palmtree size={14} />
                    <span>잔여 연차: {selectedMember.metrics.leave}일</span>
                  </S.ContactChip>
                </S.ContactRow>
              </S.ModalInfo>

              <S.ModalActions>
                <S.CallButton>상담 호출</S.CallButton>
              </S.ModalActions>
              <S.CloseModalButton onClick={() => setSelectedMember(null)}>
                <X size={24} />
              </S.CloseModalButton>
            </S.ModalHeader>

            {/* Main Content Area */}
            <S.DetailContent>
              <S.ContentGrid>
                {/* Left Section: Stress & Performance */}
                <S.LeftColumn>
                  <S.CalendarWidget>
                    <S.WidgetHeader>
                      <p>
                        <Calendar size={12} color="#818cf8" />
                        근태 현황 (2026.01)
                      </p>
                      <div style={{ display: 'flex', gap: '0.5rem', fontSize: '0.625rem', color: '#64748b', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                          <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: 'rgba(34, 197, 94, 0.2)' }}></div>
                          출근
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                          <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: 'rgba(245, 158, 11, 0.2)' }}></div>
                          지각
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                          <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: 'rgba(244, 63, 94, 0.2)' }}></div>
                          결근
                        </div>
                      </div>
                    </S.WidgetHeader>
                    <S.CalendarGrid>
                      {['일', '월', '화', '수', '목', '금', '토'].map(d => (
                        <S.WeekDay key={d}>{d}</S.WeekDay>
                      ))}
                      {Array.from({ length: 31 }, (_, i) => {
                        const day = i + 1;
                        const status = selectedMember.attendanceRecord?.[day] || '';

                        return (
                          <S.DayCell key={day} status={status}>
                            {day}
                          </S.DayCell>
                        );
                      })}
                    </S.CalendarGrid>
                  </S.CalendarWidget>
                </S.LeftColumn>

                {/* Right Section: Wellness & History */}
                <S.RightColumn>
                  {/* Cooldown Stats (Moved) */}
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
                        { title: '심층 심리 상담 완료', date: '2026.01.20', type: 'Consultation', icon: <MessageCircle size={18} /> },
                        { title: '반차 휴가 사용', date: '2026.01.14', type: 'Leave', icon: <Palmtree size={18} /> }
                      ].map((item, idx) => (
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
      )}

      {/* 부서 추가 모달 */}
      {showAddDeptModal && (
        <S.ModalOverlay>
          <S.Backdrop onClick={() => setShowAddDeptModal(false)} />
          <S.AddDeptModalContainer>
            <S.AddDeptModalHeader>
              <h3>부서 추가</h3>
              <S.CloseModalButton onClick={() => setShowAddDeptModal(false)}>
                <X size={24} />
              </S.CloseModalButton>
            </S.AddDeptModalHeader>
            <S.AddDeptModalContent>
              <S.InputGroup>
                <label>부서명</label>
                <S.AddDeptInput
                  type="text"
                  placeholder="부서명을 입력하세요"
                  value={newDeptName}
                  onChange={(e) => setNewDeptName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleAddDepartment();
                    }
                  }}
                  autoFocus
                />
              </S.InputGroup>
              <S.AddDeptButtonGroup>
                <S.AddDeptCancelButton onClick={() => setShowAddDeptModal(false)}>
                  취소
                </S.AddDeptCancelButton>
                <S.AddDeptSubmitButton onClick={handleAddDepartment}>
                  추가
                </S.AddDeptSubmitButton>
              </S.AddDeptButtonGroup>
            </S.AddDeptModalContent>
          </S.AddDeptModalContainer>
        </S.ModalOverlay>
      )}
    </S.Container>
  );
};

export default AdminTeamManagement;
