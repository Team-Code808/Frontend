import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Clock,
  ShoppingBag
} from 'lucide-react';
import * as S from './MyPage.styles';
import useStore from '../../../store/useStore';
import { mypageApi } from '../../../api/mypageApi';

const DEFAULT_COLORS = ['#2563eb', '#059669', '#d97706', '#7c3aed', '#dc2626', '#0891b2'];

const CouponWalletView = () => {
  const navigate = useNavigate();
  const { user } = useStore();
  const [filter, setFilter] = useState('AVAILABLE');
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getMemberId = () => {
    if (!user || !user.id) return 1;
    const id = typeof user.id === 'string' ? parseInt(user.id, 10) : Number(user.id);
    return isNaN(id) ? 1 : id;
  };
  const memberId = getMemberId();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await mypageApi.getCoupons(memberId);
        if (res.success && res.data) setCoupons(res.data || []);
        else setCoupons([]);
      } catch (err) {
        console.error('기프티콘 목록 로딩 실패:', err);
        setError(err.response?.data?.message || '기프티콘을 불러오는데 실패했습니다.');
        setCoupons([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [memberId]);

  const filteredCoupons = coupons.filter(c => c.status === filter);

  const renderImage = (img) => {
    const isUrl = typeof img === 'string' && /^https?:\/\//i.test(img);
    if (isUrl) {
      return <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '1rem' }} />;
    }
    return <span style={{ fontSize: '1.875rem' }}>{img || '🎁'}</span>;
  };

  return (
    <S.SubPageContainer>
      <S.SubPageHeader>
        <S.HeaderLeft>
          <S.BackButton onClick={() => navigate('/app/mypage')}>
            <ArrowLeft size={24} />
          </S.BackButton>
          <S.SubTitleGroup>
            <h2>기프티콘 보관함</h2>
            <p>획득한 보상을 확인하고 사용하세요.</p>
          </S.SubTitleGroup>
        </S.HeaderLeft>
        <S.FilterGroup>
          <S.FilterButton active={filter === 'AVAILABLE'} onClick={() => setFilter('AVAILABLE')}>
            사용 가능
          </S.FilterButton>
          <S.FilterButton active={filter === 'USED'} onClick={() => setFilter('USED')}>
            사용 완료
          </S.FilterButton>
        </S.FilterGroup>
      </S.SubPageHeader>

      {error && (
        <div style={{ marginBottom: '1rem', padding: '0.75rem', backgroundColor: '#fee2e2', color: '#dc2626', borderRadius: '0.5rem', fontSize: '0.875rem' }}>
          ⚠️ {error}
        </div>
      )}

      <S.CouponGrid>
        {loading ? (
          <div style={{ gridColumn: '1 / -1', padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>로딩 중...</div>
        ) : (
          filteredCoupons.map((coupon, idx) => (
            <S.CouponCard key={coupon.orderId || coupon.gifticonId} isUsed={coupon.status === 'USED'}>
              <S.CouponTopBar color={DEFAULT_COLORS[idx % DEFAULT_COLORS.length]} />
              <S.CouponHeader>
                <S.CouponIcon style={{ overflow: 'hidden' }}>
                  {renderImage(coupon.image)}
                </S.CouponIcon>
                <S.CouponStatus status={coupon.status}>
                  {coupon.status === 'AVAILABLE' ? 'D-30' : '사용됨'}
                </S.CouponStatus>
              </S.CouponHeader>

              <S.CouponInfo>
                <p>{coupon.shop || '기프티콘'}</p>
                <h3>{coupon.gifticonName}</h3>
              </S.CouponInfo>

              <S.CouponFooter>
                <S.CouponDate>
                  <Clock size={12} /> {coupon.expiryDate ? `${coupon.expiryDate} 까지` : '-'}
                </S.CouponDate>
                <S.CouponButton disabled={coupon.status !== 'AVAILABLE'}>
                  {coupon.status === 'AVAILABLE' ? '바코드 보기' : '사용 완료'}
                </S.CouponButton>
              </S.CouponFooter>

              <S.CouponDecorCircle side="left" />
              <S.CouponDecorCircle side="right" />
            </S.CouponCard>
          ))
        )}

        <S.CouponCard
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', borderStyle: 'dashed', cursor: 'pointer', minHeight: '300px' }}
          onClick={() => navigate('/app/pointmall')}
        >
          <div style={{ width: '3.5rem', height: '3.5rem', borderRadius: '50%', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
            <ShoppingBag size={24} color="#cbd5e1" />
          </div>
          <h3 style={{ fontSize: '0.875rem', fontWeight: 900, color: '#94a3b8' }}>포인트몰 바로가기</h3>
          <p style={{ fontSize: '10px', color: '#cbd5e1', marginTop: '0.25rem' }}>포인트를 사용하여<br />새로운 쿠폰을 획득하세요!</p>
        </S.CouponCard>
      </S.CouponGrid>
    </S.SubPageContainer>
  );
};

export default CouponWalletView;
