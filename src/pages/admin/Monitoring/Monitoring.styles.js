import styled, { keyframes, css } from 'styled-components';

// Animations
const slideInBottom = keyframes`
  from { opacity: 0; transform: translateY(1rem); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  animation: ${slideInBottom} 0.7s ease-out;
`;

/* Header Section */
export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
`;

export const TitleBox = styled.div`
  h2 {
    font-size: 1.875rem; /* 3xl */
    font-weight: 900;
    color: white;
    letter-spacing: -0.025em;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  
  p {
    color: #94a3b8; /* slate-400 */
    font-size: 0.875rem; /* sm */
    font-weight: 500;
    margin-top: 0.25rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
`;

export const HeaderControls = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const PeriodButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #1e293b; /* slate-800 */
  border: 1px solid rgba(51, 65, 85, 0.5); /* slate-700/50 */
  color: #94a3b8; /* slate-400 */
  border-radius: 0.75rem;
  font-size: 0.75rem; /* xs */
  font-weight: 900;
  transition: all 0.2s;
  
  &:hover {
    color: white;
    background-color: #334155; /* slate-700 */
  }
`;

export const PeriodDropdownContainer = styled.div`
  position: relative;
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 0.5rem;
  background-color: #1e293b;
  border: 1px solid rgba(51, 65, 85, 0.5);
  border-radius: 0.75rem;
  padding: 0.5rem;
  min-width: 140px;
  z-index: 50;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

export const DropdownItem = styled.button`
  width: 100%;
  text-align: left;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: ${props => props.active ? '#fff' : '#94a3b8'};
  background-color: ${props => props.active ? '#334155' : 'transparent'};
  transition: all 0.2s;

  &:hover {
    color: white;
    background-color: #334155;
  }
`;

export const PrintButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #4f46e5; /* indigo-600 */
  color: white;
  border-radius: 0.75rem;
  font-size: 0.75rem; /* xs */
  font-weight: 900;
  box-shadow: 0 10px 15px -3px rgba(49, 46, 129, 0.2);
  transition: all 0.2s;
  
  &:hover { background-color: #4338ca; }
`;

/* Summary Stats Grid */
export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

export const StatCard = styled.div`
  background-color: #1e293b;
  border: 1px solid rgba(51, 65, 85, 0.5);
  padding: 1.5rem;
  border-radius: 2rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
  transition: all 0.2s;
  
  &:hover {
    /* Target background icon */
    svg:last-child {
      transform: scale(1.1);
    }
  }
`;

export const StatContent = styled.div`
  position: relative;
  z-index: 10;
`;

export const StatHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;

  span {
    font-size: 0.625rem; /* 10px */
    font-weight: 900;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
`;

export const IconBox = styled.div`
  padding: 0.625rem;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.05);

  ${props => props.color === 'blue' && 'color: #60a5fa;'}
  ${props => props.color === 'rose' && 'color: #fb7185;'}
  ${props => props.color === 'orange' && 'color: #fb923c;'}
  ${props => props.color === 'emerald' && 'color: #34d399;'}
  ${props => props.color === 'violet' && 'color: #a78bfa;'}
`;

export const StatValueRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  
  p {
    font-size: 1.875rem; /* 3xl */
    font-weight: 900;
    color: white;
  }
`;

export const TrendBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.125rem;
  font-size: 0.625rem; /* 10px */
  font-weight: 900;
  
  ${props => props.trend === 'up'
    ? 'color: #fb7185;' /* rose-400 */
    : 'color: #34d399;' /* emerald-400 */
  }
`;

export const BackgroundIcon = styled.div`
  position: absolute;
  bottom: -1rem;
  right: -1rem;
  width: 5rem;
  height: 5rem;
  opacity: 0.03;
  transition: transform 0.2s;
  pointer-events: none;
  
  svg {
    width: 100%;
    height: 100%;
  }
`;

/* Main Analysis Section */
export const AnalysisGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(12, 1fr);
  }
`;

export const TrendChartCard = styled.div`
  @media (min-width: 1024px) {
    grid-column: span 8 / span 8;
  }
  background-color: #1e293b;
  border: 1px solid rgba(51, 65, 85, 0.5);
  padding: 2rem;
  border-radius: 2.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

export const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
`;

export const ChartTitles = styled.div`
  h3 {
    font-size: 1.25rem; /* xl */
    font-weight: 900;
    color: white;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  p {
    color: #94a3b8;
    font-size: 0.75rem; /* xs */
    font-weight: 500;
    margin-top: 0.25rem;
    
    ${props => props.uppercase && 'text-transform: uppercase; letter-spacing: -0.05em;'}
    ${props => props.italic && 'font-style: italic; letter-spacing: -0.025em;'}
  }
`;

export const Legend = styled.div`
  display: flex;
  gap: 1rem;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  
  div {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 9999px;
    background-color: ${props => props.color};
  }
  
  span {
    font-size: 0.625rem; /* 10px */
    font-weight: 900;
    color: #64748b;
    text-transform: uppercase;
  }
`;

export const ChartWrapper = styled.div`
  height: 300px;
  width: 100%;
`;

export const DistributionCard = styled.div`
  @media (min-width: 1024px) {
    grid-column: span 4 / span 4;
  }
  background-color: #1e293b;
  border: 1px solid rgba(51, 65, 85, 0.5);
  padding: 2rem;
  border-radius: 2.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
`;

export const PieContainer = styled.div`
  height: 240px;
  width: 100%;
  position: relative;
`;

export const CenterLabel = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  pointer-events: none;
  
  p:first-child {
    font-size: 1.5rem; /* 2xl */
    font-weight: 900;
    color: white;
  }
  
  p:last-child {
    font-size: 0.625rem;
    font-weight: 900;
    color: #64748b;
    text-transform: uppercase;
  }
`;

export const DistributionList = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const DistItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.05);
  padding: 0.75rem;
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  
  /* Left side: dot & label */
  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  span:first-of-type {
    font-size: 0.6875rem; /* 11px */
    font-weight: 900;
    color: #94a3b8;
  }
  
  /* Right side: value */
  span:last-child {
    font-size: 0.75rem; /* xs */
    font-weight: 900;
    color: white;
  }
`;

export const ColorDot = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 9999px;
  background-color: ${props => props.color};
`;

/* Bottom Grid */
export const BottomGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  padding-bottom: 2rem;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const ComparisonCard = styled.div`
  background-color: #1e293b;
  padding: 2rem;
  border-radius: 2.5rem;
  border: 1px solid rgba(51, 65, 85, 0.5);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;



export const FactorsCard = styled.div`
  background-color: #1e293b;
  border: 1px solid rgba(51, 65, 85, 0.5);
  padding: 2rem;
  border-radius: 2.5rem;
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

export const FactorsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1rem;
`;

export const FactorItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const FactorHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  
  span:first-child {
    font-size: 0.875rem; /* sm */
    font-weight: 900;
    color: white;
  }
  
  span:last-child {
    font-size: 0.75rem; /* xs */
    font-weight: 900;
    color: #64748b;
  }
`;

export const FactorBarBg = styled.div`
  width: 100%;
  height: 0.75rem;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 9999px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

export const FactorBarFill = styled.div`
  height: 100%;
  border-radius: 9999px;
  background: linear-gradient(to right, #6366f1, #818cf8);
  width: ${props => props.width};
  transition: width 1s ease-out;
`;


