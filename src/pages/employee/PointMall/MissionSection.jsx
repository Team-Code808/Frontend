import React from 'react';  
import { CheckCircle2, Zap, Heart, Star, Flame, Activity } from 'lucide-react';
import * as S from './PointMall.styles';
import axios from 'axios';
import useStore from '../../../store/useStore';

// 백엔드에서 주는 iconName이나 status를 기반으로 UI 요소를 결정하는 매핑 객체
const ICON_MAP = {
    'CheckCircle2': <CheckCircle2 color="#22c55e" />,
    'Zap': <Zap color="#6366f1" className="animate-pulse" />,
    'Heart': <Heart color="#f43f5e" />,
    'Star': <Star color="#f59e0b" />,
    'Flame': <Flame color="#f97316" />,
    'Activity': <Activity color="#3b82f6" />,
};

// 부모(PointMall)로부터 missions 데이터와 데이터 갱신 함수(refresh)를 전달받음
const MissionSection = ({ missions, refreshData }) => {

    const { user } = useStore();

    const handleMissionClick = async (missionId) => {
          console.log("미션 완료 시도 데이터:", { 
            missionId: missionId,
            userId: user?.id
    });
        try {
            // 미션 완료 API 호출 (엔드포인트는 설계에 따라 수정 가능)
            // 예: /api/employee/mission/complete
            await axios.post('/api/employee/mission/complete', {
                missionId: missionId,
                userId: 2 // 또는 전역 상태의 ID
            });
            
            alert('미션 보상이 지급되었습니다!');
            refreshData(); // 상위 컴포넌트의 데이터를 다시 불러와 포인트 잔액 동기화
        } catch (error) {
            console.error("미션 처리 중 오류:", error);
            alert('미션을 완료할 수 없습니다.');
        }
    };

    return (
        <S.MissionContainer>
            <S.MissionGrid>
                {missions && missions.map((mission) => (
                    <S.MissionCard key={mission.id}>
                        <S.CardTop>
                            <S.HeaderRow>
                                {/* 아이콘 이름이 없으면 기본 Activity 아이콘 출력 */}
                                <S.IconBox>{ICON_MAP[mission.iconName] || <Activity color="#3b82f6" />}</S.IconBox>
                                <S.StatusPill status={mission.status === 'Y' ? '완료' : '진행중'}>
                                    {mission.status === 'Y' ? '완료' : '진행중'}
                                </S.StatusPill>
                            </S.HeaderRow>
                            <S.MissionInfo>
                                <h3>{mission.title}</h3>
                                <p>{mission.description}</p>
                            </S.MissionInfo>
                        </S.CardTop>
                        <S.CardBottom>
                            <S.ProgressRow>
                                <p>{mission.reward} P</p>
                                {/* 백엔드에서 progress 정보를 주지 않는다면 0 혹은 status에 따라 100 설정 */}
                                <p>{mission.status === 'Y' ? 100 : 0}%</p>
                            </S.ProgressRow>
                            <S.ProgressBarBg>
                                <S.ProgressBarFill 
                                    width={mission.status === 'Y' ? 100 : 0} 
                                    complete={mission.status === 'Y'} 
                                />
                            </S.ProgressBarBg>
                            <S.ActionBtn
                                complete={mission.status === 'Y'}
                                onClick={() => mission.status !== 'Y' && handleMissionClick(mission.id)}
                            >
                                {mission.status === 'Y' ? '획득 완료' : '미션 완료하기'}
                            </S.ActionBtn>
                        </S.CardBottom>
                    </S.MissionCard>
                ))}
            </S.MissionGrid>
        </S.MissionContainer>
    );
};

export default MissionSection;