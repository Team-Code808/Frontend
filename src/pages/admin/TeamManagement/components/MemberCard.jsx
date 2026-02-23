import React from 'react';
import { ChevronRight, MessageCircle } from 'lucide-react';
import * as S from '../TeamManagement.styles';

export default function MemberCard({ member, onClick, onChatClick }) {
  return (
    <S.MemberCard onClick={() => onClick(member)}>
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
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <div
            onClick={(e) => {
              if (!onChatClick) return;
              e.stopPropagation();
              onChatClick(member);
            }}
            style={{
              cursor: onChatClick ? 'pointer' : 'default',
              padding: '4px',
              borderRadius: '50%',
              background: onChatClick ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              visibility: onChatClick ? 'visible' : 'hidden'
            }}
          >
            <MessageCircle size={16} color="rgba(255, 255, 255, 0.7)" />
          </div>
          <ChevronRight size={16} color="#334155" />
        </div>
      </S.CardContent>
    </S.MemberCard>
  );
}
