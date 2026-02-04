import { useState, useEffect } from 'react';
import { teamApi } from '../../../../api/teamApi';
import { mapApiToMemberCard } from '../constants';

export function useTeamMembers() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const fetchMembers = async () => {
      try {
        setLoading(true);
        setError(null);
        const list = await teamApi.getMembers();
        if (!cancelled) {
          setTeamMembers(Array.isArray(list) ? list : []);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err.response?.data?.message || err.message || '팀원 목록을 불러오지 못했습니다.'
          );
          setTeamMembers([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchMembers();
    return () => { cancelled = true; };
  }, []);

  const teamList = teamMembers.map(mapApiToMemberCard);

  return { teamMembers, teamList, loading, error };
}
