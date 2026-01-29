import React, { useState, useEffect } from 'react';
import { ShoppingBag, Trophy, Gift } from 'lucide-react';
import axios from 'axios';
import * as S from './PointMall.styles';
import MissionSection from './MissionSection';
import ShopSection from './ShopSection';

const PointMall = () => {
    const [pointMallTab, setPointMallTab] = useState('MISSIONS');
    const [loading, setLoading] = useState(true);
    // 백엔드 응답 데이터를 저장할 상태
    const [mallData, setMallData] = useState({
        currentPoint: 0,
        missions: [],
        shopItems: []
    });

    // 데이터를 서버로부터 불러오는 함수
    const fetchPointMallData = async () => {
        try {
            setLoading(true);
            // 실제 환경에서는 로그인된 사용자의 ID를 사용합니다.
            const userId = "11"; 
            const response = await axios.get(`/api/employee/shop/${userId}`);
            
            if (response.data) {
                setMallData(response.data);
            }
        } catch (error) {
            console.error("포인트몰 데이터를 불러오는데 실패했습니다:", error);
        } finally {
            setLoading(false);
        }
    };

    // 컴포넌트 마운트 시 데이터 로드
    useEffect(() => {
        fetchPointMallData();
    }, []);

    if (loading) return <S.Container>데이터를 불러오는 중입니다...</S.Container>;

    return (
        <S.Container>
            {/* 배너 섹션: 현재 탭에 따라 제목과 아이콘 변경 */}
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
                        {/* 서버에서 받아온 실제 포인트 출력 */}
                      <span>나의 보유 포인트: <strong>{(mallData?.currentPoint || 0).toLocaleString()} P</strong></span>
                    </S.PointBadge>
                </S.BannerContent>
                <S.BackgroundIcon>
                    {pointMallTab === 'SHOP' ? <ShoppingBag size={120} /> : <Trophy size={120} />}
                </S.BackgroundIcon>
            </S.BannerSection>

            {/* 탭 버튼 섹션 */}
            <S.TabContainer>
                <S.TabGroup>
                    <S.TabButton
                        $active={pointMallTab === 'MISSIONS'}
                        mode="MISSIONS"
                        onClick={() => setPointMallTab('MISSIONS')}
                    >
                        <Trophy size={18} /> 미션 도전
                    </S.TabButton>
                    <S.TabButton
                        $active={pointMallTab === 'SHOP'}
                        mode="SHOP"
                        onClick={() => setPointMallTab('SHOP')}
                    >
                        <ShoppingBag size={18} /> 포인트 상점
                    </S.TabButton>
                </S.TabGroup>
            </S.TabContainer>

            {/* 분리된 컴포넌트에 데이터 전달 */}
            {pointMallTab === 'SHOP' ? (
                <ShopSection 
                    items={mallData.shopItems} 
                    refreshData={fetchPointMallData} 
                />
            ) : (
                <MissionSection 
                    missions={mallData.missions} 
                    refreshData={fetchPointMallData} 
                />
            )}
        </S.Container>
    );
};

export default PointMall;