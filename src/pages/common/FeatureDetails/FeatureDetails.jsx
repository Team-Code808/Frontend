import React from 'react';
import {
    HeartPulse,
    Zap,
    BarChart3,
    Smile,
    Check,
    ArrowRight,
    Activity,
    CalendarCheck,
    MessageSquare
} from 'lucide-react';
import Logo from '../../../components/Logo';
import * as S from './FeatureDetails.styles';

const FeatureDetails = ({ onBack, onStart }) => {
    return (
        <S.Container>
            {/* Navigation */}
            <S.NavBar>
                <S.LogoWrapper onClick={onBack}>
                    <Logo size={40} showText={true} textColor="text-blue-600" />
                </S.LogoWrapper>
                <S.StartButton onClick={onStart}>
                    시작하기
                </S.StartButton>
            </S.NavBar>

            {/* Hero Header */}
            <S.Header>
                <S.HeaderContent>
                    <h1>
                        상담원을 위한 <br />
                        <S.GradientText>올인원 케어 솔루션</S.GradientText>
                    </h1>
                    <p>
                        단순한 업무 관리를 넘어, 감정 노동에 지친 상담원들의 마음까지 챙기는
                        Calm Desk만의 특별한 기능들을 소개합니다.
                    </p>
                </S.HeaderContent>

                {/* Background Gradients */}
                <S.BackgroundGradients>
                    <S.BlueBlob />
                    <S.IndigoBlob />
                </S.BackgroundGradients>
            </S.Header>

            {/* Feature Sections */}
            <S.MainContent>
                {/* Feature 1: Emotion Analysis */}
                <S.FeatureSection>
                    <S.FeatureImageWrapper order={2}>
                        <S.FeatureCard skew>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <S.CardItem>
                                    <S.ItemIcon color="rose">
                                        <HeartPulse size={24} />
                                    </S.ItemIcon>
                                    <S.ItemText>
                                        <h4>실시간 스트레스 체크</h4>
                                        <p>현재 스트레스 지수: 24% (안정)</p>
                                    </S.ItemText>
                                </S.CardItem>
                                <S.CardItem opacity={0.8}>
                                    <S.ItemIcon color="indigo">
                                        <Smile size={24} />
                                    </S.ItemIcon>
                                    <S.ItemText>
                                        <h4>감정 기록 다이어리</h4>
                                        <p>오늘의 기분: 최고예요!</p>
                                    </S.ItemText>
                                </S.CardItem>
                            </div>
                        </S.FeatureCard>
                    </S.FeatureImageWrapper>
                    <S.FeatureContent order={1}>
                        <S.FeatureIcon color="rose">
                            <HeartPulse size={32} />
                        </S.FeatureIcon>
                        <S.FeatureTitle>
                            실시간 감정 케어 & <br />
                            스트레스 모니터링
                        </S.FeatureTitle>
                        <S.FeatureDesc>
                            상담 업무 중 발생하는 스트레스를 실시간으로 측정하고 분석합니다.
                            위험 수치에 도달하면 즉시 휴식을 제안하고, 전문 상담사와의 연결을 도와줍니다.
                        </S.FeatureDesc>
                        <S.FeatureList>
                            {['데이터 기반 감정 분석', '위험군 자동 알림 시스템', '전문 심리 상담 연계'].map((item) => (
                                <S.FeatureListItem key={item}>
                                    <S.CheckIcon color="rose"><Check size={14} /></S.CheckIcon>
                                    {item}
                                </S.FeatureListItem>
                            ))}
                        </S.FeatureList>
                    </S.FeatureContent>
                </S.FeatureSection>

                {/* Feature 2: Gamification */}
                <S.FeatureSection>
                    <S.FeatureContent>
                        <S.FeatureIcon color="amber">
                            <Zap size={32} />
                        </S.FeatureIcon>
                        <S.FeatureTitle>
                            즐거운 업무 환경, <br />
                            게이미피케이션 & 보상
                        </S.FeatureTitle>
                        <S.FeatureDesc>
                            출근, 미션 달성 등 일상적인 업무 활동이 포인트로 적립됩니다.
                            모은 포인트로 기프티콘을 구매하거나 휴가권으로 교환하세요.
                        </S.FeatureDesc>
                        <S.FeatureList>
                            {['미션 시스템', '포인트 쇼핑몰', '다양한 리워드 제공'].map((item) => (
                                <S.FeatureListItem key={item}>
                                    <S.CheckIcon color="amber"><Check size={14} /></S.CheckIcon>
                                    {item}
                                </S.FeatureListItem>
                            ))}
                        </S.FeatureList>
                    </S.FeatureContent>
                    <S.FeatureImageWrapper>
                        <S.FeatureCard dark>
                            <S.PointBalanceCard>
                                <p>My Point Balance</p>
                                <h3>2,450 P</h3>
                                <button>쇼핑하러 가기</button>
                            </S.PointBalanceCard>
                        </S.FeatureCard>
                    </S.FeatureImageWrapper>
                </S.FeatureSection>

                {/* Feature 3: Admin Dashboard */}
                <S.FeatureSection>
                    <S.FeatureImageWrapper order={2}>
                        <S.FeatureCard skew>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem' }}>
                                <S.CardItem>
                                    <S.ItemIcon color="indigo">
                                        <Activity size={24} />
                                    </S.ItemIcon>
                                    <S.ItemText>
                                        <h4>평균 스트레스</h4>
                                        <p>34% <span style={{ color: '#818cf8', fontWeight: 700 }}>▼ 4% (안정)</span></p>
                                    </S.ItemText>
                                </S.CardItem>
                                <S.CardItem opacity={0.9}>
                                    <S.ItemIcon color="blue">
                                        <CalendarCheck size={24} />
                                    </S.ItemIcon>
                                    <S.ItemText>
                                        <h4>전체 출근률</h4>
                                        <p>94.2% <span style={{ color: '#3b82f6', fontWeight: 700 }}>▲ 2.1%</span></p>
                                    </S.ItemText>
                                </S.CardItem>
                                <S.CardItem opacity={0.8}>
                                    <S.ItemIcon color="amber">
                                        <MessageSquare size={24} />
                                    </S.ItemIcon>
                                    <S.ItemText>
                                        <h4>상담 요청</h4>
                                        <p>12건 (오늘 기준)</p>
                                    </S.ItemText>
                                </S.CardItem>
                                <S.CardItem opacity={0.7}>
                                    <S.ItemIcon color="rose">
                                        <HeartPulse size={24} />
                                    </S.ItemIcon>
                                    <S.ItemText>
                                        <h4>스트레스 고위험군</h4>
                                        <p>5명 (집중 케어 필요)</p>
                                    </S.ItemText>
                                </S.CardItem>
                            </div>
                        </S.FeatureCard>
                    </S.FeatureImageWrapper>
                    <S.FeatureContent order={1}>
                        <S.FeatureIcon color="white">
                            <BarChart3 size={40} />
                        </S.FeatureIcon>
                        <S.FeatureTitle>
                            데이터 기반의 <br />
                            스마트한 조직 관리
                        </S.FeatureTitle>
                        <S.FeatureDesc>
                            팀원들의 컨디션 현황을 한눈에 파악하고, 데이터에 기반하여 업무를 배분하세요.
                            조직 전체의 건강한 문화를 만드는 인사이트를 제공합니다.
                        </S.FeatureDesc>
                        <S.FeatureList>
                            {['팀원별 상세 리포트', '위험 징후 조기 발견', '전사 트렌드 분석'].map((item) => (
                                <S.FeatureListItem key={item}>
                                    <S.CheckIcon color="indigo"><Check size={14} /></S.CheckIcon>
                                    {item}
                                </S.FeatureListItem>
                            ))}
                        </S.FeatureList>
                    </S.FeatureContent>
                </S.FeatureSection>
            </S.MainContent>

            {/* Footer CTA */}
            <S.Footer>
                <h2>지금 바로 시작해보세요</h2>
                <p>
                    더 건강하고 행복한 상담 문화를 만드는 첫 걸음, <br />
                    Calm Desk가 함께합니다.
                </p>
                <S.FooterButton onClick={onStart}>
                    무료로 시작하기
                </S.FooterButton>
            </S.Footer>
        </S.Container>
    );
};

export default FeatureDetails;
