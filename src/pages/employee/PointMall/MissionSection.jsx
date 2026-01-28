import React from 'react';  
import { CheckCircle2, Zap, Heart, Star, Flame, Activity } from 'lucide-react';
import * as S from './PointMall.styles';
import axios from 'axios';
import useStore from '../../../store/useStore';

const ICON_MAP = {
    'CheckCircle2': <CheckCircle2 color="#22c55e" />,
    'Zap': <Zap color="#6366f1" className="animate-pulse" />,
    'Heart': <Heart color="#f43f5e" />,
    'Star': <Star color="#f59e0b" />,
    'Flame': <Flame color="#f97316" />,
    'Activity': <Activity color="#3b82f6" />,
};

const MissionSection = ({ missions, refreshData }) => {
    const { user } = useStore();

    const handleMissionClick = async (missionId) => {
        console.log("미션 완료 시도 데이터:", { 
            missionId: missionId,
            userId: user?.id
        });
        
        try {
            // userId: 2 대신 전역 상태의 user.id를 사용하도록 수정 권장
            await axios.post('/api/employee/shop/mission/complete', {
                missionId: missionId,
                userId: 2
            });
            
            
            alert('미션 보상이 지급되었습니다!');
            refreshData(); 
        } catch (error) {
            console.error("미션 처리 중 오류:", error);
            // 백엔드에서 보낸 에러 메시지가 있다면 출력
            const errorMsg = error.response?.data?.message || '보상을 받을 수 없습니다.';
            alert(errorMsg);
        }
    };

    return (
        <S.MissionContainer>
            <S.MissionGrid>
                {missions && missions.map((mission) => {
                    // 데이터 추출
                    const goal = mission.goalCount || 0; 
                    const current = mission.progressCount || 0;
                    
                    // ⭐ 브라우저 콘솔에서 값 확인 (F12 -> Console 탭)
                    console.log(`[미션 ID: ${mission.id}] 제목: ${mission.title} | 현재: ${current} | 목표: ${goal}`);

                    const progressRate = mission.status === 'Y' 
                        ? 100 
                        : (goal > 0 ? Math.min(Math.floor((current / goal) * 100), 100) : 0);
                    
                    const isRewarded = mission.status === 'Y';
                    const canCollectReward = progressRate >= 100 && !isRewarded;

                    return (
                        <S.MissionCard key={mission.id}>
                            <S.CardTop>
                                <S.HeaderRow>
                                    <S.IconBox>{ICON_MAP[mission.iconName] || <Activity color="#3b82f6" />}</S.IconBox>
                                    <S.StatusPill status={isRewarded ? '완료' : '진행중'}>
                                        {isRewarded ? '완료' : '진행중'}
                                    </S.StatusPill>
                                </S.HeaderRow>
                                <S.MissionInfo>
                                    <h3>{mission.title}</h3>
                                    <p>{mission.description}</p>
                                    
                                    {/* ⭐ 화면에서 직접 수치 확인 (개발 중에만 사용하세요) */}
                                    <div style={{ fontSize: '10px', color: '#94a3b8', marginTop: '4px' }}>
                                        수치 확인: {current} / {goal}
                                    </div>
                                </S.MissionInfo>
                            </S.CardTop>
                            
                            <S.CardBottom>
                                <S.ProgressRow>
                                    <p>{mission.reward?.toLocaleString()} P</p>
                                    <p>{progressRate}%</p>
                                </S.ProgressRow>
                                
                                <S.ProgressBarBg>
                                    <S.ProgressBarFill 
                                        $width={progressRate} 
                                        $complete={isRewarded} 
                                    />
                                </S.ProgressBarBg>
                                
                                <S.ActionBtn
                                    $complete={isRewarded}
                                    $canClick={canCollectReward}
                                    disabled={!canCollectReward}
                                    onClick={() => canCollectReward && handleMissionClick(mission.id)}
                                >
                                    {isRewarded ? '획득 완료' : (progressRate >= 100 ? '보상 받기' : '진행중')}
                                </S.ActionBtn>
                            </S.CardBottom>
                        </S.MissionCard>
                    );
                })}
            </S.MissionGrid>
        </S.MissionContainer>
    );
};

export default MissionSection;