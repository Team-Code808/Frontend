import React from 'react';
import { Users, AlertTriangle, Activity } from 'lucide-react';
import * as S from '../TeamManagement.styles';

export default function SummaryCards({ stats }) {
  return (
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
  );
}
