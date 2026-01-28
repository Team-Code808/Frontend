import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Save,
  User as UserIcon,
  Briefcase,
  Phone,
  Mail,
  Lock
} from 'lucide-react';
import { MOCK_USER } from '../../../constants/constants';
import * as S from './MyPage.styles';
import useStore from '../../../store/useStore';
import { mypageApi } from '../../../api/mypageApi';

const ProfileEditView = () => {
  const { user } = useStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirm, setNewPasswordConfirm] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const getMemberId = () => {
    if (!user || !user.id) return 1;
    const id = typeof user.id === 'string' ? parseInt(user.id, 10) : Number(user.id);
    return isNaN(id) ? 1 : id;
  };
  const memberId = getMemberId();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await mypageApi.getProfile(memberId);
        if (res.success && res.data) {
          setEmail(res.data.email || '');
          setPhone(res.data.phone || '');
        } else {
          setEmail(user?.email || MOCK_USER.email || '');
          setPhone(user?.phone || MOCK_USER.phone || '');
        }
      } catch (err) {
        console.error('프로필 로드 실패:', err);
        setError(err.response?.data?.message || '프로필을 불러오지 못했습니다.');
        setEmail(user?.email || MOCK_USER.email || '');
        setPhone(user?.phone || MOCK_USER.phone || '');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [memberId]);

  const displayUser = {
    ...MOCK_USER,
    ...(user ? {
      name: user.name,
      department: user.department,
      joinDate: user.joinDate || MOCK_USER.joinDate
    } : {})
  };

  const handleSave = async () => {
    const trimmedPhone = phone.trim();
    if (!trimmedPhone) {
      setError('연락처를 입력하세요.');
      return;
    }
    const wantChangePassword = currentPassword || newPassword || newPasswordConfirm;
    if (wantChangePassword) {
      if (!currentPassword.trim()) {
        setError('현재 비밀번호를 입력하세요.');
        return;
      }
      if (!newPassword.trim()) {
        setError('새 비밀번호를 입력하세요.');
        return;
      }
      if (newPassword !== newPasswordConfirm) {
        setError('새 비밀번호와 확인이 일치하지 않습니다.');
        return;
      }
    }
    setError(null);
    setSaving(true);
    try {
      const res = await mypageApi.updateProfile(memberId, {
        email: email.trim() || null,
        phone: trimmedPhone
      });
      if (!res.success) {
        setError(res.message || '프로필 수정에 실패했습니다.');
        setSaving(false);
        return;
      }
      if (wantChangePassword) {
        const pwRes = await mypageApi.changePassword(memberId, {
          currentPassword: currentPassword.trim(),
          newPassword: newPassword.trim()
        });
        if (!pwRes.success) {
          setError(pwRes.message || '비밀번호 변경에 실패했습니다.');
          setSaving(false);
          return;
        }
      }
      navigate('/app/mypage');
    } catch (err) {
      setError(err.response?.data?.message || err.message || '수정에 실패했습니다.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <S.SubPageContainer>
        <S.SubPageHeader>
          <S.HeaderLeft>
            <S.BackButton onClick={() => navigate('/app/mypage')}>
              <ArrowLeft size={24} />
            </S.BackButton>
            <S.SubTitleGroup><h2>프로필 수정</h2></S.SubTitleGroup>
          </S.HeaderLeft>
        </S.SubPageHeader>
        <div style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
          프로필을 불러오는 중...
        </div>
      </S.SubPageContainer>
    );
  }

  return (
    <S.SubPageContainer>
      <S.SubPageHeader>
        <S.HeaderLeft>
          <S.BackButton onClick={() => navigate('/app/mypage')}>
            <ArrowLeft size={24} />
          </S.BackButton>
          <S.SubTitleGroup>
            <h2>프로필 수정</h2>
          </S.SubTitleGroup>
        </S.HeaderLeft>
      </S.SubPageHeader>

      <S.ProfileGrid>
        <S.AvatarCard>
          <S.AvatarWrapper>
            <S.AvatarImage>{displayUser.avatar}</S.AvatarImage>
          </S.AvatarWrapper>
        </S.AvatarCard>

        <div style={{ gridColumn: 'span 2' }}>
          <S.FormCard>
            {error && (
              <div style={{ marginBottom: '1rem', padding: '0.75rem', backgroundColor: '#fee2e2', color: '#dc2626', borderRadius: '0.5rem', fontSize: '0.875rem' }}>
                ⚠️ {error}
              </div>
            )}
            <S.FormGrid>
              <S.InputGroup>
                <S.Label>이름</S.Label>
                <S.ReadOnlyField>
                  <UserIcon size={18} color="#94a3b8" />
                  <span>{displayUser.name}</span>
                  <span style={{ marginLeft: 'auto', fontSize: '10px', backgroundColor: '#e2e8f0', color: '#64748b', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>수정불가</span>
                </S.ReadOnlyField>
              </S.InputGroup>
              <S.InputGroup>
                <S.Label>부서</S.Label>
                <S.ReadOnlyField>
                  <Briefcase size={18} color="#94a3b8" />
                  <span>{displayUser.department}</span>
                  <span style={{ marginLeft: 'auto', fontSize: '10px', backgroundColor: '#e2e8f0', color: '#64748b', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>수정불가</span>
                </S.ReadOnlyField>
              </S.InputGroup>
              <S.InputGroup>
                <S.Label>연락처</S.Label>
                <S.InputField>
                  <Phone size={18} color="#3b82f6" />
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="연락처 입력"
                  />
                </S.InputField>
              </S.InputGroup>
              <S.InputGroup>
                <S.Label>이메일</S.Label>
                <S.InputField>
                  <Mail size={18} color="#3b82f6" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="이메일 입력"
                  />
                </S.InputField>
              </S.InputGroup>
            </S.FormGrid>

            <div style={{ paddingTop: '1.5rem', borderTop: '1px solid #f8fafc', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <Lock size={18} color="#94a3b8" />
                <h3 style={{ fontSize: '0.875rem', fontWeight: 900, color: '#1e293b' }}>비밀번호 변경</h3>
              </div>
              <S.InputGroup>
                <S.Label>현재 비밀번호</S.Label>
                <S.PasswordInput
                  type="password"
                  placeholder="••••••••"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </S.InputGroup>
              <S.FormGrid>
                <S.InputGroup>
                  <S.Label>새 비밀번호</S.Label>
                  <S.PasswordInput
                    type="password"
                    placeholder="새 비밀번호"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </S.InputGroup>
                <S.InputGroup>
                  <S.Label>비밀번호 확인</S.Label>
                  <S.PasswordInput
                    type="password"
                    placeholder="새 비밀번호 확인"
                    value={newPasswordConfirm}
                    onChange={(e) => setNewPasswordConfirm(e.target.value)}
                  />
                </S.InputGroup>
              </S.FormGrid>
            </div>

            <S.ActionRow>
              <S.CancelButton onClick={() => navigate('/app/mypage')} disabled={saving}>
                취소
              </S.CancelButton>
              <S.SaveButton onClick={handleSave} disabled={saving}>
                <Save size={18} />
                {saving ? '저장 중...' : '저장하기'}
              </S.SaveButton>
            </S.ActionRow>
          </S.FormCard>
        </div>
      </S.ProfileGrid>
    </S.SubPageContainer>
  );
};

export default ProfileEditView;
