import styled, { keyframes, css } from 'styled-components';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(2rem); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Container = styled.div`
  min-height: 100vh;
  background-color: white;
  overflow: hidden;
`;

export const NavBar = styled.nav`
  max-width: 80rem; /* max-w-7xl */
  margin: 0 auto;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 10;
`;

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const StartButton = styled.button`
  padding: 0.75rem 2rem;
  background-color: #0f172a; /* bg-slate-900 */
  color: white;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 700;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
  
  &:hover {
    background-color: #1e293b; /* hover:bg-slate-800 */
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const Main = styled.main`
  max-width: 80rem;
  margin: 0 auto;
  padding: 5rem 1.5rem 8rem;
  text-align: center;
  position: relative;
`;

export const BackgroundGlow = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 100%;
  z-index: -10;
  opacity: 0.2;
`;

export const Orb = styled.div`
  position: absolute;
  width: 18rem;
  height: 18rem;
  border-radius: 9999px;
  filter: blur(120px);

  ${props => props.color === 'blue' && css`
    top: 5rem;
    left: 25%;
    background-color: #60a5fa; /* bg-blue-400 */
  `}
  
  ${props => props.color === 'indigo' && css`
    top: 10rem;
    right: 25%;
    background-color: #818cf8; /* bg-indigo-400 */
  `}
`;

export const HeroContent = styled.div`
  animation: ${fadeIn} 1s ease-out;
`;

export const Badge = styled.span`
  display: inline-block;
  padding: 0.375rem 1rem;
  background-color: #eff6ff; /* bg-blue-50 */
  color: #2563eb; /* text-blue-600 */
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1.5rem;
`;

export const Title = styled.h1`
  font-size: 3rem;
  font-weight: 900;
  color: #0f172a;
  letter-spacing: -0.025em;
  line-height: 1.1;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    font-size: 4.5rem;
  }
`;

export const GradientText = styled.span`
  background: linear-gradient(to right, #2563eb, #4f46e5); /* from-blue-600 to-indigo-600 */
  -webkit-background-clip: text;
  color: transparent;
`;

export const Description = styled.p`
  color: #64748b; /* text-slate-500 */
  font-size: 1.125rem;
  font-weight: 500;
  line-height: 1.625;
  margin-bottom: 3rem;
  max-width: 42rem;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 768px) {
    font-size: 1.25rem;
  }

  br {
    display: none;
    @media (min-width: 768px) {
      display: inline;
    }
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;

  @media (min-width: 640px) {
    flex-direction: row;
  }
`;

export const HeroButton = styled.button`
  width: 100%;
  padding: 1.5rem 3rem;
  border-radius: 2rem;
  font-weight: 900;
  font-size: 1.25rem;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;

  @media (min-width: 640px) {
    width: auto;
  }

  /* Primary Variant */
  ${props => props.$variant === 'primary' && css`
    background-color: #2563eb;
    color: white;
    box-shadow: 0 25px 50px -12px rgba(191, 219, 254, 1);
    
    &:hover {
      background-color: #1d4ed8;
      transform: translateY(-4px);
      
      svg {
        transform: translateX(4px);
      }
    }
  `}

  /* Secondary Variant */
  ${props => props.$variant === 'secondary' && css`
    background-color: white;
    color: #475569; /* text-slate-600 */
    border: 1px solid #e2e8f0; /* border-slate-200 */
    
    &:hover {
      background-color: #f8fafc; /* hover:bg-slate-50 */
    }
  `}
`;

export const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-top: 8rem;
  text-align: left;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const FeatureCard = styled.div`
  background-color: rgba(248, 250, 252, 0.5); /* bg-slate-50/50 */
  padding: 2.5rem;
  border-radius: 2.5rem;
  border: 1px solid #f1f5f9;
  transition: all 0.2s;

  &:hover {
    border-color: #bfdbfe; /* border-blue-200 */
  }
`;

export const FeatureIconBox = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);

  ${props => props.$variant === 'rose' && css`
    background-color: #fff1f2; /* bg-rose-50 */
    color: #f43f5e; /* text-rose-500 */
  `}
  
  ${props => props.$variant === 'amber' && css`
    background-color: #fffbeb; /* bg-amber-50 */
    color: #f59e0b; /* text-amber-500 */
  `}

  ${props => props.$variant === 'indigo' && css`
    background-color: #eef2ff; /* bg-indigo-50 */
    color: #6366f1; /* text-indigo-500 */
  `}

  svg {
    width: 1.75rem;
    height: 1.75rem;
  }
`;

export const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 900;
  color: #1e293b;
  margin-bottom: 1rem;
`;

export const FeatureDesc = styled.p`
  color: #64748b;
  font-weight: 500;
  line-height: 1.625;
`;

export const Footer = styled.footer`
  max-width: 80rem;
  margin: 0 auto;
  padding: 5rem 1.5rem;
  border-top: 1px solid #f1f5f9;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export const FooterLinks = styled.div`
  display: flex;
  gap: 2rem;
  
  a {
    font-size: 0.875rem;
    font-weight: 700;
    color: #94a3b8; /* text-slate-400 */
    transition: color 0.2s;
    
    &:hover {
      color: #2563eb;
    }
  }
`;

export const Copyright = styled.p`
  font-size: 0.875rem;
  color: #cbd5e1; /* text-slate-300 */
`;
