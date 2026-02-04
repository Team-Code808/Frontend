import React, { useState, useEffect } from 'react';
import useStore from '../../../store/useStore';
import { DEFAULT_DEPARTMENTS } from './constants';
import { useTeamMembers } from './hooks/useTeamMembers';
import SummaryCards from './components/SummaryCards';
import TeamSearchBar from './components/TeamSearchBar';
import MemberCard from './components/MemberCard';
import MemberDetailModal from './components/MemberDetailModal';
import AddDeptModal from './components/AddDeptModal';
import * as S from './TeamManagement.styles';

const errorBarStyle = {
  marginBottom: '0.5rem',
  padding: '0.75rem',
  background: 'rgba(244, 63, 94, 0.1)',
  borderRadius: '8px',
  color: '#f43f5e',
};

const loadingBarStyle = {
  marginBottom: '0.5rem',
  padding: '0.75rem',
  color: '#94a3b8',
};

const emptyMessageStyle = {
  padding: '2rem',
  textAlign: 'center',
  color: '#64748b',
};

const AdminTeamManagement = () => {
  const { user } = useStore();
  const { teamMembers, teamList, loading, error } = useTeamMembers();

  const [selectedDept, setSelectedDept] = useState('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);
  const [showAddDeptModal, setShowAddDeptModal] = useState(false);
  const [newDeptName, setNewDeptName] = useState('');
  const [departments, setDepartments] = useState(['전체', ...DEFAULT_DEPARTMENTS]);

  useEffect(() => {
    if (user?.companyCode) {
      const companies = JSON.parse(localStorage.getItem('companies') || '[]');
      const company = companies.find((c) => c.companyCode === user.companyCode);
      if (company?.departments) {
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
    if (!user?.companyCode) {
      alert('회사 코드가 없습니다.');
      return;
    }
    const companies = JSON.parse(localStorage.getItem('companies') || '[]');
    const companyIndex = companies.findIndex((c) => c.companyCode === user.companyCode);
    if (companyIndex < 0) {
      alert('회사 정보를 찾을 수 없습니다.');
      return;
    }
    const updatedDepartments = [...companies[companyIndex].departments, newDeptName.trim()];
    companies[companyIndex].departments = updatedDepartments;
    localStorage.setItem('companies', JSON.stringify(companies));
    setDepartments(['전체', ...updatedDepartments]);
    setNewDeptName('');
    setShowAddDeptModal(false);
  };

  const filteredTeam = teamList.filter((member) => {
    const matchesDept = selectedDept === '전체' || member.dept === selectedDept;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch = member.name.toLowerCase().includes(q);
    return matchesDept && matchesSearch;
  });

  const stats = {
    total: teamList.length,
    danger: teamList.filter((m) => m.stress >= 80).length,
    caution: teamList.filter((m) => m.stress >= 70 && m.stress < 80).length,
  };

  return (
    <S.Container>
      <SummaryCards stats={stats} />

      <TeamSearchBar
        selectedDept={selectedDept}
        setSelectedDept={setSelectedDept}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        departments={departments}
        onAddDeptClick={() => setShowAddDeptModal(true)}
      />

      {error && <S.SearchBar style={errorBarStyle}>{error}</S.SearchBar>}
      {loading && (
        <S.SearchBar style={loadingBarStyle}>팀원 목록 불러오는 중...</S.SearchBar>
      )}

      <S.MemberList>
        {!loading && filteredTeam.length === 0 && (
          <p style={emptyMessageStyle}>
            {teamMembers.length === 0 ? '등록된 팀원이 없습니다.' : '검색 결과가 없습니다.'}
          </p>
        )}
        {filteredTeam.map((member) => (
          <MemberCard key={member.id} member={member} onClick={setSelectedMember} />
        ))}
      </S.MemberList>

      {selectedMember && (
        <MemberDetailModal member={selectedMember} onClose={() => setSelectedMember(null)} />
      )}

      {showAddDeptModal && (
        <AddDeptModal
          newDeptName={newDeptName}
          setNewDeptName={setNewDeptName}
          onClose={() => setShowAddDeptModal(false)}
          onSubmit={handleAddDepartment}
        />
      )}
    </S.Container>
  );
};

export default AdminTeamManagement;
