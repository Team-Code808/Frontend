import React from 'react';  
import { CheckCircle2, Zap, Heart, Star, Flame, Activity } from 'lucide-react';
import * as S from './PointMall.styles';
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
    // 스토어에서 completeMission과 user 정보를 가져옵니다.
    const { completeMission, user } = useStore();

    const handleMissionClick = async (missionId) => {
        if (!user?.id) {
            alert("로그인 정보가 없습니다.");
            return;
        }

        try {
            // 스토어 액션 호출
            await completeMission(missionId, user.id);
            
            alert('미션 보상이 지급되었습니다!');
            
            // 전체 데이터를 다시 불러와서 상단의 보유 포인트 등을 동기화
            if (refreshData) refreshData(); 
            
        } catch (error) {
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