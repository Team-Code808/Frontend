import React, { useState, useRef, useEffect } from 'react';
import useStore from '../../../store/useStore';
import {
  Users,
  Mail,
  Phone,
  ArrowRight,
  ChevronDown,
  Check
} from 'lucide-react';
import * as S from './Department.styles';

const teamMembers = [
  { id: 1, name: '이민수', role: '팀장', status: '업무 중', email: 'ms.lee@calmdesk.com', avatar: '👨‍💼', phone: '010-2841-7011' },
  { id: 2, name: '김지아', role: '시니어 상담원', status: '업무 중', email: 'ja.kim@calmdesk.com', avatar: '👩‍💼', phone: '010-3921-7025' },
  { id: 3, name: '박하준', role: '주니어 상담원', status: '자리비움', email: 'hj.park@calmdesk.com', avatar: '👨‍💻', phone: '010-4822-7042' },
  { id: 4, name: '최윤아', role: '상담원', status: '업무 중', email: 'ya.choi@calmdesk.com', avatar: '👩‍🔬', phone: '010-5811-7103' },
  { id: 5, name: '정태양', role: '상담원', status: '휴가 중', email: 'ty.jung@calmdesk.com', avatar: '🧔', phone: '010-6721-7118' },
  { id: 6, name: '서예진', role: '상담원', status: '업무 중', email: 'yj.seo@calmdesk.com', avatar: '👩‍🎨', phone: '010-7214-7150' },
];

const Department = () => {
  const { ui, setDepartmentFilter } = useStore();
  const filterStatus = ui.departmentFilter;
  const setFilterStatus = setDepartmentFilter; // Alias for minimal code change
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredMembers = teamMembers.filter(member => {
    if (filterStatus === '전체') return true;
    return member.status === filterStatus;
  });

  return (
    <S.Container>
      {/* Department Header */}
      <S.HeaderSection>
        <S.HeaderContent>
          <S.BadgeGroup>
            <S.Badge type="primary">CS 사업본부</S.Badge>
            <S.Badge>서울 제1센터</S.Badge>
          </S.BadgeGroup>
          <S.Title>고객행복 1팀</S.Title>
          <S.Description>
            고객의 소리를 경청하고 차별화된 가치를 전달하는 우리 팀입니다.
          </S.Description>

          <S.StatsGroup>
            <S.StatItem>
              <S.StatIconBox>
                <Users size={24} />
              </S.StatIconBox>
              <S.StatInfo>
                <p>팀원 구성</p>
                <p>12명</p>
              </S.StatInfo>
            </S.StatItem>
          </S.StatsGroup>
        </S.HeaderContent>
        <S.BgDecoration>
          <Users size={320} />
        </S.BgDecoration>
      </S.HeaderSection>

      {/* Team Members List (Horizontal Layout) */}
      <S.TeamSection>
        <S.FilterHeader>
          <S.FilterTitle>
            팀원 연락망 <span>실시간 상태</span>
          </S.FilterTitle>
          <S.Controls>
            <S.DropdownWrapper ref={dropdownRef}>
              <S.DropdownTrigger
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                $isOpen={isDropdownOpen}
              >
                {filterStatus === '전체' ? '전체 보기' : filterStatus}
                <ChevronDown size={16} style={{ color: '#94a3b8', transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
              </S.DropdownTrigger>

              {isDropdownOpen && (
                <S.DropdownMenu>
                  {['전체', '업무 중', '자리비움', '휴가 중'].map((option) => (
                    <S.DropdownItem
                      key={option}
                      onClick={() => {
                        setFilterStatus(option);
                        setIsDropdownOpen(false);
                      }}
                      $isSelected={filterStatus === option}
                    >
                      {option === '전체' ? '전체 보기' : option}
                      {filterStatus === option && <Check size={14} color="#3b82f6" />}
                    </S.DropdownItem>
                  ))}
                </S.DropdownMenu>
              )}
            </S.DropdownWrapper>
            <S.ExcelButton>엑셀 다운로드</S.ExcelButton>
          </S.Controls>
        </S.FilterHeader>

        <S.MemberList>
          {filteredMembers.map((member) => (
            <S.MemberCard key={member.id}>
              <S.CardInner>
                {/* Avatar */}
                <S.Avatar>
                  {member.avatar}
                </S.Avatar>

                {/* Name & Role */}
                <S.MemberInfo>
                  <S.NameRow>
                    <h3>{member.name}</h3>
                    <S.StatusPill $status={member.status}>
                      {member.status}
                    </S.StatusPill>
                  </S.NameRow>
                  <S.RoleText>{member.role}</S.RoleText>
                </S.MemberInfo>

                {/* Contact Info (Horizontal Split) */}
                <S.ContactInfo>
                  <S.ContactItem type="email">
                    <div><Mail size={16} /></div>
                    <S.EmailText>{member.email}</S.EmailText>
                  </S.ContactItem>
                  <S.ContactItem type="phone">
                    <div><Phone size={16} /></div>
                    <div>
                      <S.PhoneLabel>개인번호</S.PhoneLabel>
                      <S.PhoneText>{member.phone}</S.PhoneText>
                    </div>
                  </S.ContactItem>
                </S.ContactInfo>


              </S.CardInner>
            </S.MemberCard>
          ))}
          {filteredMembers.length === 0 && (
            <S.EmptyState>
              해당 상태의 팀원이 없습니다.
            </S.EmptyState>
          )}
        </S.MemberList>
      </S.TeamSection>
    </S.Container>
  );
};

export default Department;
