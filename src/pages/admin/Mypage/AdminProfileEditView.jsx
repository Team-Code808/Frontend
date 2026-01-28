import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Mail,
  Phone,
  Lock,
  User as UserIcon,
  ArrowLeft,
  Save
} from 'lucide-react';
import * as S from './MyPage.styles';
import useStore from '../../../store/useStore';

const AdminProfileEditView = () => {
  const { user } = useStore();
  const navigate = useNavigate();

  const adminInfo = {
    name: user?.name || '관리자',
    position: user?.position || '센터 운영 총괄',
    department: user?.department || '운영 전략 본부',
    email: user?.id || user?.email || 'admin@calmdesk.com',
    phone: user?.phone || '010-0000-0000',
    joinDate: user?.joinDate || '2020.01.01',
    avatar: '🛡️'
  };

  const handleSave = () => {
    // TODO: API 연동 시 구현
    alert('관리자 정보가 수정되었습니다.');
    navigate('..');
  };

  return (
    <S.EditContainer>
      <S.EditHeader>
        <button
          type="button"
          onClick={() => navigate('..')}
          style={{ color: '#94a3b8' }}
          aria-label="뒤로"
        >
          <ArrowLeft />
        </button>
        <h2 style={{ color: 'white' }}>관리자 프로필 수정</h2>
      </S.EditHeader>

      <S.EditGrid>
        <S.AvatarEditCard>
          <div style={{ position: 'relative' }}>
            <S.AvatarCircle>{adminInfo.avatar}</S.AvatarCircle>
          </div>
        </S.AvatarEditCard>

        <S.FormCard>
          <S.FormGrid>
            <S.InputGroup>
              <label>이름</label>
              <S.InputWrapper readonly>
                <UserIcon />
                <span>{adminInfo.name}</span>
                <S.Badge>수정불가</S.Badge>
              </S.InputWrapper>
            </S.InputGroup>

            <S.InputGroup>
              <label>연락처</label>
              <S.InputWrapper active>
                <Phone />
                <input type="text" defaultValue={adminInfo.phone} />
              </S.InputWrapper>
            </S.InputGroup>
            <S.InputGroup>
              <label>이메일</label>
              <S.InputWrapper active>
                <Mail />
                <input type="email" defaultValue={adminInfo.email} />
              </S.InputWrapper>
            </S.InputGroup>
          </S.FormGrid>

          <S.PasswordSection>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.5rem'
              }}
            >
              <Lock size={18} color="#64748b" />
              <h3 style={{ color: '#cbd5e1' }}>비밀번호 변경</h3>
            </div>

            <S.InputGroup>
              <label>현재 비밀번호</label>
              <S.InputWrapper>
                <input
                  type="password"
                  placeholder="••••••••"
                  style={{ paddingLeft: '0.5rem' }}
                />
              </S.InputWrapper>
            </S.InputGroup>

            <S.FormGrid>
              <S.InputGroup>
                <label>새 비밀번호</label>
                <S.InputWrapper>
                  <input
                    type="password"
                    placeholder="새 비밀번호"
                    style={{ paddingLeft: '0.5rem' }}
                  />
                </S.InputWrapper>
              </S.InputGroup>
              <S.InputGroup>
                <label>비밀번호 확인</label>
                <S.InputWrapper>
                  <input
                    type="password"
                    placeholder="새 비밀번호 확인"
                    style={{ paddingLeft: '0.5rem' }}
                  />
                </S.InputWrapper>
              </S.InputGroup>
            </S.FormGrid>
          </S.PasswordSection>

          <S.ActionButtons>
            <S.Button type="button" onClick={() => navigate('..')}>
              취소
            </S.Button>
            <S.Button type="button" primary onClick={handleSave}>
              <Save size={18} />
              저장하기
            </S.Button>
          </S.ActionButtons>
        </S.FormCard>
      </S.EditGrid>
    </S.EditContainer>
  );
};

export default AdminProfileEditView;
