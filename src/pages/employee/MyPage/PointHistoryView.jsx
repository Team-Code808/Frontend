import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Download,
  Filter,
  CreditCard,
  PlusCircle,
  MinusCircle
} from 'lucide-react';
import * as S from './MyPage.styles';
import useStore from '../../../store/useStore';
import { mypageApi } from '../../../api/mypageApi';

const PointHistoryView = () => {
  const { user } = useStore();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('ALL');
  const [history, setHistory] = useState([]);
  const [profile, setProfile] = useState(null);
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
        const [pointsRes, profileRes] = await Promise.all([
          mypageApi.getPointHistory(memberId),
          mypageApi.getProfile(memberId),
        ]);
        if (pointsRes.success && pointsRes.data) {
          setHistory(Array.isArray(pointsRes.data) ? pointsRes.data : []);
        } else {
          setHistory([]);
        }
        if (profileRes.success && profileRes.data) {
          setProfile(profileRes.data);
        }
      } catch (err) {
        console.error('포인트 내역 로딩 실패:', err);
        setError(err.response?.data?.message || '포인트 내역을 불러오는데 실패했습니다.');
        setHistory([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [memberId]);

  const filteredHistory = history.filter(
    (item) => filter === 'ALL' || (item.type && item.type.toUpperCase() === filter)
  );

  // 총 잔액: 계좌(ACCOUNT) 기준. 없으면 최신 내역 잔액
  const currentBalance =
    profile != null && profile.currentPoint != null
      ? Number(profile.currentPoint)
      : (history.length > 0 && history[0]?.balanceAfter != null ? Number(history[0].balanceAfter) : 0);

  const now = new Date();
  const thisYear = now.getFullYear();
  const thisMonth = now.getMonth();
  const isThisMonth = (dateStr) => {
    if (!dateStr) return false;
    const [datePart] = dateStr.split(' ');
    const [y, m] = datePart.split('.').map(Number);
    return y === thisYear && m === thisMonth + 1;
  };
  // amount: 적립은 +, 사용은 - 로 내려옴
  const thisMonthEarn = history
    .filter((h) => h.type && h.type.toUpperCase() === 'EARN' && isThisMonth(h.date))
    .reduce((sum, h) => sum + (h.amount != null ? Math.max(0, Number(h.amount)) : 0), 0);
  const thisMonthSpend = history
    .filter((h) => h.type && h.type.toUpperCase() === 'SPEND' && isThisMonth(h.date))
    .reduce((sum, h) => sum + (h.amount != null ? Math.abs(Number(h.amount)) : 0), 0);

  // API에서 적립은 +, 사용은 - 부호로 내려옴 → 그대로 표시 (+면 +, -면 -)
  const formatAmount = (item) => {
    const amt = item.amount != null ? Number(item.amount) : 0;
    const sign = amt >= 0 ? '+' : '';
    return `${sign}${amt.toLocaleString()}`;
  };

  if (loading) {
    return (
      <S.SubPageContainer>
        <S.SubPageHeader>
          <S.HeaderLeft>
            <S.BackButton onClick={() => navigate('/app/mypage')}>
              <ArrowLeft size={24} />
            </S.BackButton>
            <S.SubTitleGroup>
              <h2>포인트 내역</h2>
              <p>포인트 적립 및 사용 내역을 확인하세요.</p>
            </S.SubTitleGroup>
          </S.HeaderLeft>
        </S.SubPageHeader>
        <div style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
          포인트 내역을 불러오는 중...
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
            <h2>포인트 내역</h2>
            <p>포인트 적립 및 사용 내역을 확인하세요.</p>
          </S.SubTitleGroup>
        </S.HeaderLeft>
        <button
          type="button"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            border: '1px solid #e2e8f0',
            borderRadius: '0.75rem',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: '#475569',
            backgroundColor: 'white',
          }}
        >
          <Download size={14} />
          내역 다운로드
        </button>
      </S.SubPageHeader>

      {error && (
        <div
          style={{
            padding: '1rem',
            backgroundColor: '#fee2e2',
            color: '#dc2626',
            borderRadius: '0.75rem',
            fontSize: '0.875rem',
          }}
        >
          {error}
        </div>
      )}

      <S.PointSummaryCard>
        <S.BalanceSection>
          <p>Total Balance</p>
          <h3>{Number(currentBalance).toLocaleString()} <span>P</span></h3>
        </S.BalanceSection>
        <S.StatsSection>
          <S.StatItem isPositive>
            <p>이번 달 적립</p>
            <p>+{thisMonthEarn.toLocaleString()} P</p>
          </S.StatItem>
          <S.Divider />
          <S.StatItem>
            <p>이번 달 사용</p>
            <p>-{thisMonthSpend.toLocaleString()} P</p>
          </S.StatItem>
        </S.StatsSection>
        <CreditCard
          style={{
            position: 'absolute',
            bottom: '-1.5rem',
            right: '-1.5rem',
            width: '12rem',
            height: '12rem',
            opacity: 0.05,
            transform: 'rotate(12deg)',
          }}
        />
      </S.PointSummaryCard>

      <S.HistoryContainer>
        <S.HistoryHeader>
          <S.FilterTabs>
            <S.TabButton active={filter === 'ALL'} onClick={() => setFilter('ALL')}>
              전체
            </S.TabButton>
            <S.TabButton active={filter === 'EARN'} onClick={() => setFilter('EARN')} color="#059669">
              적립
            </S.TabButton>
            <S.TabButton active={filter === 'SPEND'} onClick={() => setFilter('SPEND')} color="#1e293b">
              사용
            </S.TabButton>
          </S.FilterTabs>
          <button type="button" style={{ padding: '0.5rem', color: '#94a3b8' }}>
            <Filter size={16} />
          </button>
        </S.HistoryHeader>

        <S.HistoryList>
          {filteredHistory.map((item) => {
            const type = item.type ? item.type.toUpperCase() : 'EARN';
            return (
              <S.HistoryItem key={item.historyId || item.id || Math.random()}>
                <S.ItemLeft>
                  <S.IconBox type={type}>
                    {type === 'EARN' ? <PlusCircle size={20} /> : <MinusCircle size={20} />}
                  </S.IconBox>
                  <S.ItemDetails>
                    <p>{item.title || (type === 'EARN' ? '포인트 적립' : '포인트 사용')}</p>
                    <p>{item.date || '-'}</p>
                  </S.ItemDetails>
                </S.ItemLeft>
                <S.ItemRight type={type}>
                  <p>{formatAmount(item)} P</p>
                  <p>잔액 {(item.balanceAfter != null ? item.balanceAfter : 0).toLocaleString()} P</p>
                </S.ItemRight>
              </S.HistoryItem>
            );
          })}
          {filteredHistory.length === 0 && (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#94a3b8', fontSize: '0.875rem' }}>
              내역이 없습니다.
            </div>
          )}
        </S.HistoryList>
        {filteredHistory.length > 0 && (
          <S.LoadMoreButton type="button">더 보기</S.LoadMoreButton>
        )}
      </S.HistoryContainer>
    </S.SubPageContainer>
  );
};

export default PointHistoryView;
