import React, { useState, useRef, useEffect } from 'react';
import apiClient from '../../../api/axios';
import useStore from '../../../store/useStore';
import {
  Users,
  Mail,
  Phone,
  ArrowRight,
  ChevronDown,
  Check,
  AlertCircle
} from 'lucide-react';
import * as S from './Department.styles';

const Department = () => {
  // 전역 스토어에서 사용자 정보(내 부서 ID) 가져오기
  const { user } = useStore();
  const myDepartmentId = user?.departmentId || 1; // user 정보가 없으면 기본값 1

  // 1. UI Status State (필터는 로컬 상태로 관리)
  const [filterStatus, setFilterStatus] = useState('전체');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 2. Data State
  const [departmentInfo, setDepartmentInfo] = useState(null);
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 3. Fetch Data Effect
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // 부서 정보와 팀원 목록을 병렬로 조회 (직접 axios 호출)
        const [infoResponse, membersResponse] = await Promise.all([
          apiClient.get(`/departments/${myDepartmentId}`),
          apiClient.get(`/departments/${myDepartmentId}/members`)
        ]);

        setDepartmentInfo(infoResponse.data);
        setMembers(membersResponse.data);
      } catch (err) {
        console.error("데이터 로딩 실패:", err);
        setError("부서 정보를 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    if (myDepartmentId) {
      fetchData();
    }
  }, [myDepartmentId]);

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

  const filteredMembers = members.filter(member => {
    if (filterStatus === '전체') return true;
    return member.status === filterStatus;
  });

  if (error) {
    return (
      <S.Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <div style={{ textAlign: 'center', color: '#ef4444' }}>
          <AlertCircle size={48} style={{ marginBottom: '16px' }} />
          <p>{error}</p>
        </div>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.HeaderSection>
        <S.HeaderContent>
          <S.Title>{departmentInfo?.departmentName || '...'}</S.Title>
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
                <p>{departmentInfo?.memberCount || 0}명</p>
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
                  {['전체', '출근 전', '업무 중', '자리 비움', '쿨다운', '퇴근', '휴가 중'].map((option) => (
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
            <S.MemberCard key={member.memberId}>
              <S.CardInner>
                {/* Avatar */}
                <S.Avatar>
                  {/* 아바타가 없으면 이모지로 대체하거나 기본 이미지 */}
                  {member.avatar || (member.role === '팀장' ? '👨‍💼' : '🧑‍💻')}
                </S.Avatar>

                {/* Name & Role */}
                <S.MemberInfo>
                  <S.NameRow>
                    <h3>{member.name}</h3>
                    {/* 상태값 스타일링 매핑 필요 (현재는 텍스트 그대로 사용) */}
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
          {!isLoading && filteredMembers.length === 0 && (
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
