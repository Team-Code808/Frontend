import React, { useState } from 'react';
import { CheckCircle2, Zap, Heart, Star, Flame, Activity } from 'lucide-react';
import * as S from './PointMall.styles';

const MissionSection = () => {
    const [missions, setMissions] = useState([
        { id: 1, title: '오늘의 출근 완료', desc: '정해진 시간에 출근 도장을 찍으세요.', reward: '10 P', progress: 100, status: '완료', icon: <CheckCircle2 color="#22c55e" />, color: 'green' },
        { id: 2, title: '스트레스 지수 케어', desc: '주간 평균 스트레스 40% 미만 유지', reward: '50 P', progress: 65, status: '진행중', icon: <Zap color="#6366f1" className="animate-pulse" />, color: 'indigo' },
        { id: 3, title: '팀원 칭찬 릴레이', desc: '동료에게 응원 메시지 3건 전송', reward: '30 P', progress: 33, status: '진행중', icon: <Heart color="#f43f5e" />, color: 'rose' },
        { id: 4, title: '프로 상담러의 길', desc: '고객 만족도 5점 만점 10건 달성', reward: '100 P', progress: 80, status: '진행중', icon: <Star color="#f59e0b" />, color: 'amber' },
        { id: 5, title: '연속 출근 챌린지', desc: '지각 없이 5일 연속 출근하기', reward: '80 P', progress: 40, status: '진행중', icon: <Flame color="#f97316" />, color: 'orange' },
        { id: 6, title: '마인드셋 교육 수료', desc: '이번 달 마음건강 웨비나 시청', reward: '40 P', progress: 0, status: '도전가능', icon: <Activity color="#3b82f6" />, color: 'blue' },
    ]);

    const handleMissionClick = (id) => {
        setMissions(prev => prev.map(mission =>
            mission.id === id ? { ...mission, status: '완료', progress: 100 } : mission
        ));
    };

    return (
        <S.MissionContainer>
            <S.MissionGrid>
                {missions.map((mission) => (
                    <S.MissionCard key={mission.id}>
                        <S.CardTop>
                            <S.HeaderRow>
                                <S.IconBox>{mission.icon}</S.IconBox>
                                <S.StatusPill status={mission.status}>{mission.status}</S.StatusPill>
                            </S.HeaderRow>
                            <S.MissionInfo>
                                <h3>{mission.title}</h3>
                                <p>{mission.desc}</p>
                            </S.MissionInfo>
                        </S.CardTop>
                        <S.CardBottom>
                            <S.ProgressRow>
                                <p>{mission.reward}</p>
                                <p>{mission.progress}%</p>
                            </S.ProgressRow>
                            <S.ProgressBarBg>
                                <S.ProgressBarFill width={mission.progress} complete={mission.status === '완료'} />
                            </S.ProgressBarBg>
                            <S.ActionBtn
                                complete={mission.status === '완료'}
                                onClick={() => mission.status !== '완료' && handleMissionClick(mission.id)}
                            >
                                {mission.status === '완료' ? '획득 완료' : '미션 진행하기'}
                            </S.ActionBtn>
                        </S.CardBottom>
                    </S.MissionCard>
                ))}
            </S.MissionGrid>
        </S.MissionContainer>
    );
};

export default MissionSection;