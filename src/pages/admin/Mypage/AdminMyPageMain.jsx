import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Mail,
  Phone,
  ShieldCheck,
  ChevronRight,
  Settings,
  Lock,
  CheckCircle2,
  Calendar,
  Key,
  Copy,
  Check
} from 'lucide-react';
import * as S from './MyPage.styles';
import useStore from '../../../store/useStore';
import { adminMypageApi } from '../../../api/mypageApi';

const AdminMyPageMain = () => {
  const { user } = useStore();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // 로그인한 유저의 memberId 사용
  const adminMemberId = user?.memberId || user?.id;

  useEffect(() => {
    if (!adminMemberId) return;
    
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await adminMypageApi.getProfile(adminMemberId);
        if (response.success && response.data) {
          setProfile(response.data);
        }
      } catch (error) {
        console.error('프로필 로딩 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [adminMemberId]);

  const adminInfo = {
    name: profile?.name || user?.name || '관리자',
    position: user?.position || '센터 운영 총괄',
    department: user?.department || '운영 전략 본부',
    email: profile?.email || user?.id || user?.email || 'admin@calmdesk.com',
    phone: profile?.phone || user?.phone || '010-0000-0000',
    joinDate: profile?.joinDate || user?.joinDate || '2020.01.01',
    avatar: '🛡️',
    accessLevel: 'Super Admin',
    companyCode: user?.companyCode || 'CODE-ERROR'
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(adminInfo.companyCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <S.Container>
      <S.MainHeader>
        <div style={{ color: 'white' }}>
          <h1>관리자 프로필</h1>
          <p style={{ color: '#64748b' }}>Administrative Profile & Security</p>
        </div>
      </S.MainHeader>

      <S.ContentGrid>
        <S.LeftCol>
          <S.ProfileCard>
            <S.ProfileAvatar>
              <div>{adminInfo.avatar}</div>
            </S.ProfileAvatar>

            <S.ProfileInfo>
              <h2 style={{ color: 'white' }}>{adminInfo.name}</h2>
              <p>{adminInfo.position}</p>
            </S.ProfileInfo>

            <S.ContactList>
              {[
                { icon: Mail, label: 'Email', value: adminInfo.email },
                { icon: Phone, label: 'Phone', value: adminInfo.phone },
                { icon: Calendar, label: 'Join Date', value: adminInfo.joinDate }
              ].map((item, i) => (
                <S.ContactItem key={i}>
                  <S.ItemIcon>
                    <item.icon size={18} />
                  </S.ItemIcon>
                  <S.ItemText>
                    <p>{item.label}</p>
                    <p>{item.value}</p>
                  </S.ItemText>
                </S.ContactItem>
              ))}
            </S.ContactList>

            <S.EditProfileBtn onClick={() => navigate('profile')}>
              관리자 정보 수정
            </S.EditProfileBtn>
          </S.ProfileCard>

          <S.PermissionCard>
            <S.PermissionContent>
              <h3 style={{ color: 'white' }}>
                <ShieldCheck size={20} />
                권한 등급: {adminInfo.accessLevel}
              </h3>
              <p style={{ color: '#e0e7ff' }}>
                전체 시스템 제어 및 데이터 접근 권한이 활성화되어 있습니다.
              </p>
              <S.CertifiedBadge>
                <CheckCircle2 size={16} color="#c7d2fe" />
                <span>최고 관리자 인증됨</span>
              </S.CertifiedBadge>
            </S.PermissionContent>
            <S.LockIconBg>
              <Lock />
            </S.LockIconBg>
          </S.PermissionCard>
        </S.LeftCol>

        <S.RightCol>
          <S.CodeCard>
            <S.CodeContent>
              <S.CodeText>
                <h3 style={{ color: 'white' }}>
                  <Key size={22} color="#34d399" />
                  회사 고유 코드 (초대 코드)
                </h3>
                <p style={{ color: '#94a3b8' }}>
                  직원들이 입사 신청 시 사용할 고유 코드입니다.
                </p>
              </S.CodeText>
              <S.CodeBox>
                <span style={{ color: 'white' }}>{adminInfo.companyCode}</span>
                <button onClick={handleCopyCode} style={{ color: 'white' }}>
                  {copied ? <Check size={20} color="#34d399" /> : <Copy size={20} />}
                </button>
              </S.CodeBox>
            </S.CodeContent>
            <S.KeyIconBg>
              <Key />
            </S.KeyIconBg>
          </S.CodeCard>

          <S.SettingsCard>
            <h3 style={{ color: 'white' }}>
              <Settings size={22} color="#64748b" />
              환경 설정
            </h3>
            <S.SettingsList>
              <S.SettingsItem onClick={() => navigate('profile')} style={{ cursor: 'pointer' }}>
                <S.ItemLeft>
                  <S.IconWrapper>
                    <Lock size={20} />
                  </S.IconWrapper>
                  <S.TextWrapper>
                    <p>비밀번호 변경</p>
                    <p>주기적인 변경으로 계정 보호</p>
                  </S.TextWrapper>
                </S.ItemLeft>
                <ChevronRight size={16} color="#334155" />
              </S.SettingsItem>
            </S.SettingsList>
          </S.SettingsCard>
        </S.RightCol>
      </S.ContentGrid>
    </S.Container>
  );
};

export default AdminMyPageMain;
