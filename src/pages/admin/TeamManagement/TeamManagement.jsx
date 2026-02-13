import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTeamMembers } from './hooks/useTeamMembers';
import { teamApi } from '../../../api/teamApi';
import apiClient from '../../../api/axios';
import useStore from '../../../store/useStore';
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
  const { teamMembers, teamList, loading, error } = useTeamMembers();
  const navigate = useNavigate();
  const { user } = useStore();
  const { setCurrentRoomId } = useStore(state => state.chat);

  const [selectedDept, setSelectedDept] = useState('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMember, setSelectedMember] = useState(null);
  const [showAddDeptModal, setShowAddDeptModal] = useState(false);
  const [newDeptName, setNewDeptName] = useState('');
  const [departments, setDepartments] = useState(['전체']);

  const fetchDepartments = async () => {
    try {
      const list = await teamApi.getDepartments();
      setDepartments(Array.isArray(list) ? ['전체', ...list] : ['전체']);
    } catch {
      setDepartments(['전체']);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleAddDepartment = async () => {
    if (!newDeptName.trim()) {
      alert('부서명을 입력해주세요.');
      return;
    }
    try {
      await teamApi.createDepartment(newDeptName.trim());
      await fetchDepartments();
      setNewDeptName('');
      setShowAddDeptModal(false);
    } catch (err) {
      const message = err.response?.data?.message || err.message || '부서 추가에 실패했습니다.';
      alert(message);
    }
  };

  const handleChatStart = async (member) => {
    if (!member.id) {
      console.error("Member ID not found", member);
      return;
    }
    try {
      const response = await apiClient.post('/chat/room', { targetMemberId: member.id });
      const roomId = response.data;
      // setCurrentRoomId(roomId); // ChatPage에서 처리하도록 변경
      navigate('/app/chat', { state: { roomId } });
    } catch (error) {
      console.error("Failed to start chat", error);
      alert("채팅방 생성에 실패했습니다.");
    }
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
          <MemberCard
            key={member.id}
            member={member}
            onClick={setSelectedMember}
            onChatClick={user?.memberId !== member.id ? handleChatStart : undefined}
          />
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
