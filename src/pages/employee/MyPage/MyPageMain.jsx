import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Mail,
  Phone,
  ChevronRight,
  Ticket,
  Heart,
  Settings,
  Lock,
  Calendar,
  CreditCard
} from 'lucide-react';
import * as S from './MyPage.styles';
import useStore from '../../../store/useStore';
import { mypageApi } from '../../../api/mypageApi';

const MyPageMain = () => {
  const { user } = useStore();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [coupons, setCoupons] = useState([]);
  const [stress, setStress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // memberId 가져오기 (user.id 또는 임시로 1 사용)
  const getMemberId = () => {
    if (!user || !user.id) {
      return 1; // 기본값
    }
    const id = typeof user.id === 'string' ? parseInt(user.id, 10) : Number(user.id);
    return isNaN(id) ? 1 : id; // NaN 체크
  };
  
  const memberId = getMemberId();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // 프로필, 기프티콘, 스트레스 데이터를 병렬로 가져오기
        const [profileRes, couponsRes, stressRes] = await Promise.all([
          mypageApi.getProfile(memberId),
          mypageApi.getCoupons(memberId),
          mypageApi.getStress(memberId)
        ]);

        if (profileRes.success && profileRes.data) {
          setProfile(profileRes.data);
        }

        if (couponsRes.success && couponsRes.data) {
          setCoupons(couponsRes.data || []);
        }

        if (stressRes.success && stressRes.data) {
          setStress(stressRes.data);
        }
      } catch (err) {
        console.error('데이터 로딩 실패:', err);
        setError(err.response?.data?.message || '데이터를 불러오는데 실패했습니다.');
        // 에러가 발생해도 기본값 사용
        setProfile(null);
        setCoupons([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [memberId]);

  // 표시할 사용자 데이터 (API/스토어 우선, 없으면 '-' 표시)
  const empty = (v) => (v != null && v !== '' ? v : '-');
  const displayUser = {
    avatar: '👤',
    name: empty(profile?.name ?? user?.name),
    email: empty(profile?.email),
    phone: empty(profile?.phone ?? user?.phone),
    department: empty(profile?.department ?? user?.department),
    position: empty(profile?.position),
    joinDate: empty(profile?.joinDate ?? user?.joinDate),
    point: profile?.currentPoint != null ? profile.currentPoint.toLocaleString() : '0'
  };

  if (loading) {
    return (
      <S.Container>
        <S.HeaderSection>
          <S.TitleGroup>
            <h1>마이페이지</h1>
            <p>개인 정보 및 혜택을 한곳에서 관리하세요.</p>
          </S.TitleGroup>
        </S.HeaderSection>
        <div style={{ padding: '4rem', textAlign: 'center', color: '#94a3b8' }}>
          데이터를 불러오는 중...
        </div>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.HeaderSection>
        <S.TitleGroup>
          <h1>마이페이지</h1>
          <p>개인 정보 및 혜택을 한곳에서 관리하세요.</p>
          {error && (
            <div style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: '#fee2e2', color: '#dc2626', borderRadius: '0.5rem', fontSize: '0.875rem' }}>
              ⚠️ {error}
            </div>
          )}
        </S.TitleGroup>
      </S.HeaderSection>

      <S.MainGrid>
        {/* Left Column */}
        <S.ColLeft>
          <S.BentoCard>
            <S.ProfileBento>
              <S.AvatarWrapper>
                <S.AvatarImage>
                  {displayUser.avatar}
                </S.AvatarImage>
              </S.AvatarWrapper>

              <S.ProfileInfo>
                <h2>{displayUser.name}</h2>
                <p>{displayUser.position} • {displayUser.department}</p>
              </S.ProfileInfo>

              <S.ContactList>
                <S.ContactItem>
                  <S.ContactIcon><Mail size={18} /></S.ContactIcon>
                  <S.ContactText>
                    <p>Email</p>
                    <p>{displayUser.email}</p>
                  </S.ContactText>
                </S.ContactItem>
                <S.ContactItem>
                  <S.ContactIcon><Phone size={18} /></S.ContactIcon>
                  <S.ContactText>
                    <p>Phone</p>
                    <p>{displayUser.phone}</p>
                  </S.ContactText>
                </S.ContactItem>
                <S.ContactItem>
                  <S.ContactIcon><Calendar size={18} /></S.ContactIcon>
                  <S.ContactText>
                    <p>Join Date</p>
                    <p>{displayUser.joinDate}</p>
                  </S.ContactText>
                </S.ContactItem>
              </S.ContactList>

              <S.EditButton onClick={() => navigate('profile')}>
                프로필 수정하기
              </S.EditButton>
            </S.ProfileBento>
          </S.BentoCard>
        </S.ColLeft>

        {/* Right Column */}
        <S.ColRight>
          <S.BentoCard $gradient>
            <S.StressGrid>
              <S.StressCircle>
                <S.CircleContent>
                  <span>{stress?.avgStress ?? 0}%</span>
                  <span>Stress</span>
                </S.CircleContent>
              </S.StressCircle>
              <S.StressDetails>
                <h3>
                  <Heart size={20} color={
                    stress?.level === 'CRITICAL' ? '#dc2626' :
                    stress?.level === 'HIGH' ? '#f97316' :
                    stress?.level === 'NORMAL' ? '#eab308' : '#f43f5e'
                  } />
                  주간 컨디션 요약
                </h3>
                <p>
                  현재 전반적으로 <span style={{
                    color: stress?.level === 'CRITICAL' ? '#dc2626' :
                           stress?.level === 'HIGH' ? '#f97316' :
                           stress?.level === 'NORMAL' ? '#eab308' : '#2563eb',
                    fontWeight: 700
                  }}>{stress?.message || '안정적인 컨디션'}</span>을 유지하고 있습니다.
                  {' '}{stress?.description || '규칙적인 휴식과 긍정적인 마인드로 활기찬 한 주를 보내세요!'}
                </p>
                <S.TagGroup>
                  {stress?.level === 'CRITICAL' ? (
                    <>
                      <S.Tag>#즉시_휴식_필요</S.Tag>
                      <S.Tag>#상담_권장</S.Tag>
                      <S.Tag>#건강_관리</S.Tag>
                    </>
                  ) : stress?.level === 'HIGH' ? (
                    <>
                      <S.Tag>#주의_필요</S.Tag>
                      <S.Tag>#휴식_권장</S.Tag>
                      <S.Tag>#스트레스_관리</S.Tag>
                    </>
                  ) : stress?.level === 'NORMAL' ? (
                    <>
                      <S.Tag>#양호한_상태</S.Tag>
                      <S.Tag>#가벼운_휴식</S.Tag>
                      <S.Tag>#꾸준한_관리</S.Tag>
                    </>
                  ) : (
                    <>
                      <S.Tag>#스트레스_제로</S.Tag>
                      <S.Tag>#마음건강_튼튼</S.Tag>
                      <S.Tag>#긍정_에너지</S.Tag>
                    </>
                  )}
                </S.TagGroup>
              </S.StressDetails>
            </S.StressGrid>
          </S.BentoCard>

          <S.BentoCard>
            <S.SectionTitle>
              <h3>
                <Ticket size={22} color="#2563eb" />
                기프티콘 보관함
              </h3>
              <button onClick={() => navigate('coupons')}>
                전체보기 <ChevronRight size={14} />
              </button>
            </S.SectionTitle>
            <S.SmallCouponGrid>
              {loading ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>로딩 중...</div>
              ) : coupons.length === 0 ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8' }}>보유한 기프티콘이 없습니다.</div>
              ) : (
                coupons.slice(0, 3).map((coupon) => {
                  const img = coupon.image;
                  const isUrl = typeof img === 'string' && /^https?:\/\//i.test(img);
                  const iconBoxStyle = { display: 'flex', alignItems: 'center', justifyContent: 'center', width: '3rem', height: '3rem', borderRadius: '1rem', backgroundColor: 'rgba(0,0,0,0.05)', fontSize: '1.5rem', marginBottom: '1rem', overflow: 'hidden' };
                  return (
                    <S.SmallCouponCard key={coupon.orderId || coupon.gifticonId}>
                      <div style={iconBoxStyle}>
                        {isUrl ? (
                          <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <span style={{ fontSize: '1.5rem' }}>{img || '🎁'}</span>
                        )}
                      </div>
                      <h4 style={{ fontSize: '0.875rem', fontWeight: 900, color: '#1e293b' }}>{coupon.gifticonName}</h4>
                      <p style={{ fontSize: '10px', fontWeight: 700, color: '#94a3b8', marginTop: '0.25rem' }}>{coupon.shop || '기프티콘'}</p>
                    </S.SmallCouponCard>
                  );
                })
              )}
            </S.SmallCouponGrid>
          </S.BentoCard>

          <S.SettingsGrid>
            <S.BentoCard>
              <S.SectionTitle>
                <h3>
                  <Settings size={20} color="#94a3b8" />
                  환경 설정
                </h3>
              </S.SectionTitle>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <S.SettingItem onClick={() => navigate('profile')} style={{ cursor: 'pointer' }}>
                  <S.SettingLeft>
                    <div><Lock size={18} /></div>
                    <div>
                      <p>비밀번호 변경</p>
                      <p>주기적인 변경으로 계정 보호</p>
                    </div>
                  </S.SettingLeft>
                  <ChevronRight size={14} color="#cbd5e1" />
                </S.SettingItem>
              </div>
            </S.BentoCard>

            <S.BentoCard style={{ padding: 0 }}>
              <div style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 900, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CreditCard size={20} color="#94a3b8" />
                  포인트 및 결제
                </h3>
                <S.PointCard>
                  <p>Current Points</p>
                  <p>{displayUser.point} <span>P</span></p>
                  <button onClick={() => navigate('points')}>
                    포인트 내역
                  </button>
                </S.PointCard>
              </div>
            </S.BentoCard>
          </S.SettingsGrid>
        </S.ColRight>
      </S.MainGrid>
    </S.Container>
  );
};

export default MyPageMain;
