import styled, { keyframes, css } from 'styled-components';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(1rem); }
  to { opacity: 1; transform: translateY(0); }
`;

const zoomIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  animation: ${fadeIn} 0.7s ease-out;
`;

export const GreetingSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.5rem;
  background-color: white; /* bg-slate-800 */
  padding: 1.5rem;
  border-radius: 1.5rem;
  border: 1px solid #f1f5f9; /* border-slate-700 or slate-100 */
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); /* shadow-sm */

  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: center;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const UserAvatar = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  background-color: #e0e7ff; /* bg-indigo-100 */
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4f46e5; /* text-indigo-600 */
`;

export const GreetingText = styled.div`
  h1 {
    font-size: 1.5rem; /* 2xl */
    font-weight: 700;
    color: #1e293b; /* text-slate-50 or text-slate-800 */
  }

  p {
    color: #64748b; /* text-slate-400 or text-slate-500 */
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 0.125rem;
  }
`;

export const StatusBadge = styled.span`
  font-weight: 600;
  color: ${props => {
    switch (props.$status) {
      case 'working': return '#16a34a'; // green-600
      case 'away': return '#f59e0b'; // amber-500
      case 'cooldown': return '#f97316'; // orange-500
      default: return '#94a3b8'; // slate-400
    }
  }};
`;

export const ActionGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 9rem);
  align-items: center;
  gap: 0.75rem;
  width: 100%;

  @media (min-width: 1024px) {
    width: auto;
  }
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 1rem;
  font-weight: 700;
  transition: all 0.2s;
  white-space: nowrap;
  width: 100%;

  /* Default / Inactive Clock State */
  ${props => props.$variant === 'primary' && css`
    background-color: #4f46e5; /* bg-indigo-600 */
    color: white;
    box-shadow: 0 10px 15px -3px rgba(199, 210, 254, 1); /* shadow-indigo-200 */
    &:hover { background-color: #4338ca; }
  `}

  /* Active Clock State */
  ${props => props.$variant === 'neutral' && css`
    background-color: #f1f5f9; /* bg-slate-100 */
    color: #475569; /* text-slate-600 */
    &:hover { background-color: #e2e8f0; }
  `}

  /* Active Away State */
  ${props => props.$variant === 'away' && css`
    background-color: #f59e0b; /* bg-amber-500 */
    color: white;
    box-shadow: 0 10px 15px -3px rgba(251, 191, 36, 0.5); /* shadow-amber-300 */
    &:hover { background-color: #d97706; }
  `}

  /* Active CoolDown State */
  ${props => props.$variant === 'orange' && css`
    background-color: #f97316; /* bg-orange-500 */
    color: white;
    box-shadow: 0 10px 15px -3px rgba(254, 215, 170, 1); /* shadow-orange-200 */
    &:hover { background-color: #ea580c; }
  `}

  /* Disabled/Inactive CoolDown */
  ${props => props.disabled && css`
    cursor: not-allowed;
    background-color: #f8fafc; /* bg-slate-50 */
    color: #cbd5e1; /* text-slate-300 */
    box-shadow: none;
  `}



  /* Danger / Clock Out State */
  ${props => props.$variant === 'danger' && css`
    background-color: #ef4444; /* bg-red-500 */
    color: white;
    box-shadow: 0 10px 15px -3px rgba(254, 202, 202, 1); /* shadow-red-200 */
    &:hover { background-color: #dc2626; }
  `}
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const StatCard = styled.div`
  background-color: ${props => props.$variant === 'primary'
    ? '#4f46e5'
    : 'white'};
  padding: 1.5rem;
  border-radius: 1.5rem;
  border: 1px solid ${props => props.$variant === 'primary'
    ? 'transparent'
    : '#f1f5f9'};
  box-shadow: ${props => props.$variant === 'primary'
    ? '0 10px 15px -3px rgba(224, 231, 255, 0.5)'
    : '0 1px 2px 0 rgba(0, 0, 0, 0.05)'};
  color: ${props => props.$variant === 'primary' ? 'white' : '#1e293b'};
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  
  ${props => props.$align === 'center' && css`
    align-items: center;
  `}
`;

export const StatHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${props => props.$mb || '0.5rem'};

  span {
    color: ${props => props.$light ? '#e0e7ff' : '#64748b'}; /* text-indigo-100 or text-slate-500 */
    font-weight: 500;
    font-size: 0.875rem;
  }

  svg {
    width: 1rem;
    height: 1rem;
    color: ${props => props.$light ? 'rgba(255,255,255,0.5)' : '#cbd5e1'};
  }
`;

export const StatContent = styled.div`
  margin-top: 1rem;
`;

export const StatValue = styled.span`
  font-size: 1.875rem; /* 3xl */
  font-weight: 800;
  color: ${props => props.$light ? 'white' : '#1e293b'};
`;

export const StatUnit = styled.span`
  font-size: 1.125rem;
  font-weight: 500;
  color: ${props => props.$light ? 'rgba(255,255,255,0.8)' : '#94a3b8'};
  margin-left: 0.25rem;
`;

export const StatSubtext = styled.p`
  font-size: 0.75rem; /* xs */
  color: ${props => props.$light ? 'rgba(255,255,255,0.8)' : '#94a3b8'};
  margin-top: 0.5rem; /* mt-2 usually */

  ${props => props.$tag && css`
    margin-top: 1rem;
    color: #4f46e5;
    background-color: #eef2ff;
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-weight: 600;
    display: inline-block;
  `}
`;

export const ProgressBar = styled.div`
  width: 100%;
  background-color: #f1f5f9;
  height: 0.5rem;
  border-radius: 9999px;
  margin-top: 1rem;
  overflow: hidden;
`;

export const ProgressFill = styled.div`
  background-color: #6366f1; /* bg-indigo-500 */
  height: 100%;
  width: ${props => props.$width || '0%'};
  border-radius: 9999px;
`;

export const PointButton = styled.button`
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: white;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 0.375rem 0.75rem;
  border-radius: 0.5rem;
  transition: all 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

export const ChartSection = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: 1.5rem;
  border: 1px solid #f1f5f9;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

export const ChartHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
  gap: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }

  div:first-child h3 {
    font-size: 1.125rem;
    font-weight: 700;
    color: #1e293b;
  }
  
  div:first-child p {
    color: #94a3b8; /* Keep or update if needed */
    font-size: 0.875rem;
  }
`;

export const ChartToggle = styled.div`
  display: flex;
  background-color: #f8fafc;
  padding: 0.25rem;
  border-radius: 0.75rem;

  button {
    padding: 0.375rem 1rem;
    font-size: 0.75rem;
    font-weight: 700;
    border-radius: 0.5rem;
    transition: all 0.2s;
  }
`;

export const ToggleButton = styled.button`
  ${props => props.$active ? css`
    background-color: white;
    color: #4f46e5;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05);
  ` : css`
    color: #94a3b8;
    &:hover { color: #475569; }
  `}
`;

export const ChartWrapper = styled.div`
  width: 100%;
  height: 300px;
  min-width: 0;
  overflow: hidden;
`;

/* Modal Styles */
export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

export const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(15, 23, 42, 0.4); /* bg-slate-900/40 */
  backdrop-filter: blur(4px);
  animation: ${fadeIn} 0.3s ease-out;
`;

export const ModalContent = styled.div`
  position: relative;
  background-color: white;
  width: 100%;
  max-width: 32rem; /* max-w-lg */
  border-radius: 2.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  animation: ${zoomIn} 0.3s ease-out;
`;

export const ModalHeader = styled.div`
  padding: 2rem;
  color: white;
  background-color: ${props => props.$type === 'IN' ? '#4f46e5' : '#1e293b'}; /* indigo-600 or slate-800 */
`;

export const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 900;
  letter-spacing: -0.025em;
  margin-top: 1.5rem;
`;

export const ModalSub = styled.p`
  color: rgba(224, 231, 255, 0.8);
  font-size: 0.875rem;
  margin-top: 0.5rem;
`;

export const CloseRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const IconBadge = styled.div`
  padding: 0.75rem;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  color: white;
`;

export const CloseButton = styled.button`
  padding: 0.5rem;
  border-radius: 9999px;
  color: white;
  transition: all 0.2s;
  &:hover { background-color: rgba(255, 255, 255, 0.2); }
`;

export const ModalBody = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-height: 70vh;
  overflow-y: auto;
  
  /* Hide scrollbar */
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const FormLabel = styled.label`
  font-size: 0.75rem;
  font-weight: 900;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export const MoodGrid = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const MoodButton = styled.button`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem;
  border-radius: 1rem;
  border: 2px solid transparent;
  transition: all 0.2s;

  ${props => props.$active ? css`
    background-color: #eef2ff;
    border-color: #c7d2fe;
    transform: scale(1.05);
  ` : css`
    background-color: white;
    &:hover { background-color: #f8fafc; }
  `}

  span:first-child { font-size: 1.875rem; }
  span:last-child {
    font-size: 0.6875rem;
    font-weight: 700;
    color: ${props => props.$active ? '#4f46e5' : '#94a3b8'};
  }
`;

export const FactorGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

export const FactorButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  font-size: 0.75rem;
  font-weight: 700;
  border: 2px solid transparent;
  transition: all 0.2s;

  ${props => props.$active ? css`
    background-color: #4f46e5;
    border-color: #4f46e5;
    color: white;
    box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.2);
  ` : css`
    background-color: #f8fafc;
    color: #64748b;
    &:hover { border-color: #e2e8f0; }
  `}
`;

export const MemoTextarea = styled.textarea`
  width: 100%;
  background-color: #f8fafc;
  border: 2px solid transparent;
  border-radius: 1.5rem;
  padding: 1.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #334155;
  outline: none;
  height: 7rem;
  resize: none;
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
  transition: all 0.2s;

  &:focus {
    border-color: #6366f1;
  }
`;

export const SubmitModalButton = styled.button`
  width: 100%;
  padding: 1rem;
  border-radius: 1.5rem;
  font-weight: 900;
  font-size: 1.125rem;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;

  &:active {
    transform: scale(0.95);
  }

  ${props => props.$type === 'IN' ? css`
    background-color: #4f46e5;
    &:hover { background-color: #4338ca; }
  ` : css`
    background-color: #1e293b;
    &:hover { background-color: #0f172a; }
  `}
`;
