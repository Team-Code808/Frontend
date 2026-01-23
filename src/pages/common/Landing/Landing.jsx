import React from 'react';
import { ArrowRight, ShieldCheck, HeartPulse, Zap } from 'lucide-react';
import Logo from '../../../components/Logo';
import FooterLinks from '../../../components/Footer';
import * as S from './Landing.styles';

const LandingPage = ({ onStart, onViewFeatures }) => {
  return (
    <S.Container>
      {/* Navigation */}
      <S.NavBar>
        <S.LogoWrapper>
          <Logo size={40} showText={true} textColor="text-blue-600" />
        </S.LogoWrapper>
        <S.StartButton onClick={onStart}>
          시작하기
        </S.StartButton>
      </S.NavBar>

      {/* Hero Section */}
      <S.Main>
        <S.BackgroundGlow>
          <S.Orb color="blue" />
          <S.Orb color="indigo" />
        </S.BackgroundGlow>

        <S.HeroContent>
          <S.Badge>
            Next-Gen HR for Call Centers
          </S.Badge>

          <S.Title>
            상담원의 마음을 <br />
            <S.GradientText>가장 먼저 생각합니다</S.GradientText>
          </S.Title>

          <S.Description>
            실시간 스트레스 케어부터 스마트한 근태 관리까지, <br />
            Calm Desk는 더 건강하고 효율적인 상담 환경을 제공합니다.
          </S.Description>

          <S.ButtonGroup>
            <S.HeroButton onClick={onStart} $variant="primary">
              지금 시작하기
              <ArrowRight className="w-6 h-6 transition-transform" />
            </S.HeroButton>
            <S.HeroButton onClick={onViewFeatures} $variant="secondary">
              기능 상세 보기
            </S.HeroButton>
          </S.ButtonGroup>
        </S.HeroContent>

        {/* Features Grid */}
        <S.FeaturesGrid>
          {[
            {
              icon: HeartPulse,
              title: "실시간 스트레스 케어",
              desc: "AI 기반 감정 분석으로 상담원의 상태를 실시간 모니터링하고 즉각적인 휴식을 제안합니다.",
              variant: "rose"
            },
            {
              icon: Zap,
              title: "스마트 근태 관리",
              desc: "복잡한 출퇴근과 휴가 신청을 한 번의 클릭으로 해결하세요. 팀원과의 일정 공유도 자동화됩니다.",
              variant: "amber"
            },
            {
              icon: ShieldCheck,
              title: "관리자 통합 대시보드",
              desc: "센터 전체의 성과와 인력 현황을 한눈에 파악하고, 데이터 기반의 효율적인 운영을 지원합니다.",
              variant: "indigo"
            }
          ].map((feature, i) => (
            <S.FeatureCard key={i}>
              <S.FeatureIconBox $variant={feature.variant}>
                <feature.icon />
              </S.FeatureIconBox>
              <S.FeatureTitle>{feature.title}</S.FeatureTitle>
              <S.FeatureDesc>{feature.desc}</S.FeatureDesc>
            </S.FeatureCard>
          ))}
        </S.FeaturesGrid>
      </S.Main>

      <S.Footer>
        <S.LogoWrapper>
          <Logo size={32} showText={true} textColor="text-slate-800" />
        </S.LogoWrapper>
        <FooterLinks />
        <S.Copyright>© 2026 Calm Desk. All rights reserved.</S.Copyright>
      </S.Footer>
    </S.Container>
  );
};

export default LandingPage;
