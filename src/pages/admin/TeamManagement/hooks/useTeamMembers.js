import { useState, useEffect, useCallback } from 'react';
import { teamApi } from '../../../../api/teamApi';
import { mapApiToMemberCard } from '../constants';

export function useTeamMembers() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    totalPages: 0,
    totalElements: 0,
  });

  const fetchMembers = useCallback(async (page = 0, size = 10) => {
    try {
      setLoading(true);
      setError(null);
      const data = await teamApi.getMembers(page, size);
      // Spring Page 응답: { content, totalPages, totalElements, number, ... }
      if (data && Array.isArray(data.content)) {
        setTeamMembers(data.content);
        setPagination({
          currentPage: data.number ?? page,
          totalPages: data.totalPages ?? 1,
          totalElements: data.totalElements ?? data.content.length,
        });
      } else {
        // 하위 호환: 배열 그대로 오는 경우
        const list = Array.isArray(data) ? data : [];
        setTeamMembers(list);
        setPagination({ currentPage: 0, totalPages: 1, totalElements: list.length });
      }
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || '팀원 목록을 불러오지 못했습니다.'
      );
      setTeamMembers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const handlePageChange = useCallback(
    (newPage) => {
      if (newPage >= 0 && newPage < pagination.totalPages) {
        fetchMembers(newPage);
      }
    },
    [fetchMembers, pagination.totalPages]
  );

  const teamList = teamMembers.map(mapApiToMemberCard);

  return { teamMembers, teamList, loading, error, pagination, handlePageChange };
}
