import styled, { keyframes, css } from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  background-color: white;
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
  cursor: pointer;
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

export const Header = styled.header`
  position: relative;
  padding: 6rem 1.5rem;
  overflow: hidden;
`;

export const HeaderContent = styled.div`
  max-width: 56rem; /* 4xl */
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 10;
  
  h1 {
    font-size: 3rem; /* 5xl */
    font-weight: 900;
    color: #0f172a;
    letter-spacing: -0.025em;
    margin-bottom: 1.5rem;
    line-height: 1.2;

    @media (min-width: 768px) {
      font-size: 3.75rem; /* 6xl */
    }
  }
  
  p {
    font-size: 1.25rem; /* xl */
    color: #64748b;
    font-weight: 500;
    line-height: 1.625;
    max-width: 42rem;
    margin: 0 auto;
  }
`;

export const GradientText = styled.span`
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  background-image: linear-gradient(to right, #2563eb, #4f46e5);
`;

export const BackgroundGradients = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 100%;
  z-index: -10;
  opacity: 0.3;
`;

export const BlueBlob = styled.div`
  position: absolute;
  top: 0;
  left: 25%;
  width: 500px;
  height: 500px;
  background-color: #bfdbfe; /* blue-200 */
  border-radius: 9999px;
  filter: blur(120px);
`;

export const IndigoBlob = styled.div`
  position: absolute;
  bottom: 0;
  right: 25%;
  width: 500px;
  height: 500px;
  background-color: #c7d2fe; /* indigo-200 */
  border-radius: 9999px;
  filter: blur(120px);
`;

export const MainContent = styled.main`
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 1.5rem;
  padding-bottom: 8rem;
  display: flex;
  flex-direction: column;
  gap: 8rem;
`;

export const FeatureSection = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  align-items: center;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const FeatureImageWrapper = styled.div`
  position: relative;
  ${props => props.order === 2 && 'order: 2; @media (min-width: 1024px) { order: 1; }'}
  ${props => props.order === 1 && 'order: 1; @media (min-width: 1024px) { order: 2; }'}
`;

export const FeatureCard = styled.div`
  background-color: #f8fafc;
  border-radius: 3rem;
  padding: 2rem;
  border: 1px solid #e2e8f0;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  transition: transform 0.7s;
  
  ${props => props.skew ? css`
    transform: skewY(3deg);
    &:hover { transform: skewY(0); }
  ` : css`
    transform: skewY(-3deg);
    &:hover { transform: skewY(0); }
  `}

  ${props => props.dark && css`
    background-color: #0f172a;
    border-color: #1e293b;
  `}
`;

export const CardItem = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background-color: white;
  border-radius: 1.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f5f9;
  
  ${props => props.opacity && css`opacity: ${props.opacity};`}
`;

export const ItemIcon = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  ${props => props.color === 'rose' && css`background-color: #ffe4e6; color: #f43f5e;`}
  ${props => props.color === 'indigo' && css`background-color: #e0e7ff; color: #6366f1;`}
`;

export const ItemText = styled.div`
  h4 {
    font-weight: 700;
    color: #1e293b;
  }
  p {
    font-size: 0.875rem;
    color: #64748b;
  }
`;

export const FeatureContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  ${props => props.order === 1 && 'order: 1; @media (min-width: 1024px) { order: 2; }'}
`;

export const FeatureIcon = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  
  ${props => props.color === 'rose' && css`background-color: #fff1f2; color: #f43f5e;`}
  ${props => props.color === 'amber' && css`background-color: #fffbeb; color: #f59e0b;`}
  ${props => props.color === 'white' && css`background-color: white; color: #4f46e5; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);`}
`;

export const FeatureTitle = styled.h2`
  font-size: 2.25rem; /* 4xl */
  font-weight: 900;
  color: #0f172a;
  letter-spacing: -0.025em;
  line-height: 1.2;
`;

export const FeatureDesc = styled.p`
  font-size: 1.125rem; /* lg */
  color: #64748b;
  line-height: 1.625;
`;

export const FeatureList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;
`;

export const FeatureListItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #334155;
  font-weight: 700;
`;

export const CheckIcon = styled.div`
  padding: 0.25rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;

  ${props => props.color === 'rose' && css`background-color: #ffe4e6; color: #e11d48;`}
  ${props => props.color === 'amber' && css`background-color: #fef3c7; color: #d97706;`}
  ${props => props.color === 'indigo' && css`background-color: #e0e7ff; color: #4338ca;`}
`;

export const PointBalanceCard = styled.div`
  text-align: center;
  padding: 2rem 0;
  color: white;
  
  p {
    color: #fbbf24;
    font-weight: 900;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 0.5rem;
  }
  
  h3 {
    font-size: 3rem;
    font-weight: 900;
    margin-bottom: 1.5rem;
  }
  
  button {
    padding: 0.75rem 2rem;
    background-color: #4f46e5;
    border-radius: 1rem;
    font-weight: 700;
    transition: background-color 0.2s;
    
    &:hover { background-color: #4338ca; }
  }
`;



export const Footer = styled.footer`
  background-color: #0f172a;
  padding: 6rem 1.5rem;
  text-align: center;
  color: white;
  
  h2 {
    font-size: 1.875rem;
    font-weight: 900;
    margin-bottom: 2rem;
    letter-spacing: -0.025em;
    @media (min-width: 768px) { font-size: 3rem; }
  }
  
  p {
    color: #94a3b8;
    font-size: 1.125rem;
    margin-bottom: 3rem;
    max-width: 36rem;
    margin-left: auto;
    margin-right: auto;
  }
`;

export const FooterButton = styled.button`
  padding: 1.25rem 2.5rem;
  background-color: white;
  color: #0f172a;
  border-radius: 2rem;
  font-weight: 900;
  font-size: 1.25rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  transition: all 0.2s;
  
  &:hover { background-color: #eff6ff; }
  &:active { transform: scale(0.95); }
`;
