import React, { useEffect } from 'react';
import { ShoppingBag, Trophy, Gift } from 'lucide-react';
import useStore from '../../../store/useStore'; // 스토어 경로에 맞춰 수정하세요
import * as S from './PointMall.styles';
import MissionSection from './MissionSection';
import ShopSection from './ShopSection';

const PointMall = () => {
    const [pointMallTab, setPointMallTab] = React.useState('MISSIONS');
    
      
    // 스토어에서 필요한 상태와 액션 추출
    const { mallData, loading, fetchPointMallData, user } = useStore();

    const userId = user?.memberId; // TODO: 유저 아이디 더미 데이터

    useEffect(() => {
        // 실제 환경에서는 로그인된 사용자 정보를 가져옵니다.
        if (userId) {
            fetchPointMallData(userId);
        }
    }, [fetchPointMallData, userId]);

    if (loading) return <S.Container>데이터를 불러오는 중입니다...</S.Container>;

    return (
        <S.Container>
            <S.BannerSection tab={pointMallTab}>
                <S.BannerContent>
                    <h1>{pointMallTab === 'SHOP' ? '포인트 몰' : '미션 도전'}</h1>
                    <p>
                        {pointMallTab === 'SHOP'
                            ? '상담 성과로 모은 포인트로 다양한 혜택을 누리세요!'
                            : '일일/주간 미션을 달성하고 추가 포인트를 획득하세요!'}
                    </p>
                    <S.PointBadge>
                        <Gift size={20} />
                        <span>나의 보유 포인트: <strong>{(mallData?.currentPoint || 0).toLocaleString()} P</strong></span>
                    </S.PointBadge>
                </S.BannerContent>
                <S.BackgroundIcon>
                    {pointMallTab === 'SHOP' ? <ShoppingBag size={120} /> : <Trophy size={120} />}
                </S.BackgroundIcon>
            </S.BannerSection>

            <S.TabContainer>
                <S.TabGroup>
                    <S.TabButton
                        $active={pointMallTab === 'MISSIONS'}
                        $mode="MISSIONS"  /* 👈 추가: 스타일에서 인식할 수 있도록 */
                        onClick={() => setPointMallTab('MISSIONS')}
                    >
                        <Trophy size={18} /> 미션 도전
                    </S.TabButton>
                    <S.TabButton
                        $active={pointMallTab === 'SHOP'}
                        $mode="SHOP"      /* 👈 추가: 스타일에서 인식할 수 있도록 */
                        onClick={() => setPointMallTab('SHOP')}
                    >
                        <ShoppingBag size={18} /> 포인트 상점
                    </S.TabButton>
                </S.TabGroup>
            </S.TabContainer>

            {pointMallTab === 'SHOP' ? (
                <ShopSection 
                    items={mallData.shopItems} 
                    refreshData={() => fetchPointMallData(userId)} 
                />
            ) : (
                <MissionSection 
                    missions={mallData.missions} 
                    refreshData={() => fetchPointMallData(userId)} 
                />
            )}
        </S.Container>
    );
};

export default PointMall;