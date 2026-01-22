import React, { useState } from 'react';
import { ShoppingBag, Trophy, Gift } from 'lucide-react';
import * as S from './PointMall.styles';
import MissionSection from './MissionSection';
import ShopSection from './ShopSection';

const PointMall = () => {
    const [pointMallTab, setPointMallTab] = useState('MISSIONS');

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
                        <span>나의 보유 포인트: <strong>2,450 P</strong></span>
                    </S.PointBadge>
                </S.BannerContent>
                <S.BackgroundIcon>
                    {pointMallTab === 'SHOP' ? <ShoppingBag /> : <Trophy />}
                </S.BackgroundIcon>
            </S.BannerSection>

            <S.TabContainer>
                <S.TabGroup>
                    <S.TabButton
                        active={pointMallTab === 'MISSIONS'}
                        mode="MISSIONS"
                        onClick={() => setPointMallTab('MISSIONS')}
                    >
                        <Trophy size={18} /> 미션 도전
                    </S.TabButton>
                    <S.TabButton
                        active={pointMallTab === 'SHOP'}
                        mode="SHOP"
                        onClick={() => setPointMallTab('SHOP')}
                    >
                        <ShoppingBag size={18} /> 포인트 상점
                    </S.TabButton>
                </S.TabGroup>
            </S.TabContainer>

            {/* 분리된 컴포넌트 렌더링 */}
            {pointMallTab === 'SHOP' ? <ShopSection /> : <MissionSection />}
        </S.Container>
    );
};

export default PointMall;