import styled, { keyframes, css } from 'styled-components';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideInBottom = keyframes`
  from { opacity: 0; transform: translateY(1rem); }
  to { opacity: 1; transform: translateY(0); }
`;

const zoomIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
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

export const TabGroup = styled.div`
  display: flex;
  background-color: #1e293b; /* slate-800 */
  border: 1px solid rgba(51, 65, 85, 0.5); /* slate-700/50 */
  padding: 0.375rem;
  border-radius: 1rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
`;

export const TabButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.5rem;
  border-radius: 0.75rem;
  font-size: 0.75rem; /* xs */
  font-weight: 900;
  transition: all 0.2s;
  
  ${props => props.active
        ? 'background-color: #4f46e5; color: white; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);'
        : 'color: #64748b; &:hover { color: #cbd5e1; }'
    }
`;

/* Main Layout Grid */
export const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(12, 1fr);
  }
`;

export const LeftColumn = styled.div`
  @media (min-width: 1024px) {
    grid-column: span 8 / span 8;
  }
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const RightColumn = styled.div`
  @media (min-width: 1024px) {
    grid-column: span 4 / span 4;
  }
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

/* Calendar Section */
export const CalendarCard = styled.div`
  background-color: #1e293b;
  border: 1px solid rgba(51, 65, 85, 0.5);
  padding: 2rem;
  border-radius: 2.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
`;

export const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  position: relative;
  z-index: 10;
`;

export const MonthTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const MonthIconBox = styled.div`
  padding: 0.75rem;
  background-color: rgba(99, 102, 241, 0.1); /* indigo-500/10 */
  border-radius: 1rem;
  border: 1px solid rgba(99, 102, 241, 0.2);
  color: #818cf8; /* indigo-400 */
`;

export const MonthText = styled.div`
  h3 {
    font-size: 1.25rem; /* xl */
    font-weight: 900;
    color: white;
    letter-spacing: -0.025em;
  }
  
  p {
    font-size: 0.625rem; /* 10px */
    color: #64748b;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
`;

export const CalendarControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const NavButton = styled.button`
  padding: 0.5rem;
  background-color: #0f172a; /* slate-900 */
  border-radius: 0.75rem;
  color: #64748b;
  border: 1px solid rgba(51, 65, 85, 0.5);
  transition: all 0.2s;
  
  &:hover { color: white; }
`;

export const TodayButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #0f172a;
  border-radius: 0.75rem;
  font-size: 0.75rem; /* xs */
  font-weight: 900;
  color: #cbd5e1;
  border: 1px solid rgba(51, 65, 85, 0.5);
`;

export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background-color: #334155; /* slate-700 */
  border-radius: 1.5rem;
  overflow: hidden;
  border: 1px solid #334155;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  position: relative;
  z-index: 10;
`;

export const DayHeader = styled.div`
  background-color: #0f172a;
  padding: 1rem;
  text-align: center;
  font-size: 0.625rem;
  font-weight: 900;
  color: #475569;
  letter-spacing: 0.1em;
`;

export const DayCell = styled.div`
  min-height: 120px;
  background-color: #1e293b;
  padding: 0.75rem;
  transition: all 0.2s;
  cursor: pointer;
  position: relative;
  
  &:hover {
    background-color: rgba(51, 65, 85, 0.5);
  }
  
  ${props => props.empty && 'background-color: rgba(15, 23, 42, 0.5); opacity: 0.1;'}
  
  ${props => props.selected && css`
    box-shadow: inset 0 0 0 2px #6366f1;
    background-color: rgba(51, 65, 85, 0.3);
  `}
`;

export const DayNumber = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
  
  span {
    font-size: 0.75rem; /* xs */
    font-weight: 900;
    color: #94a3b8;
    
    ${props => props.isWeekend && 'color: #475569;'}
    ${props => props.selected && 'color: #818cf8;'}
  }
`;

export const IndicatorDots = styled.div`
  display: flex;
  gap: 0.25rem;
`;

export const Dot = styled.div`
  width: 0.375rem;
  height: 0.375rem;
  border-radius: 9999px;
  animation: ${pulse} 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  
  ${props => props.color === 'amber' && 'background-color: #f59e0b;'}
  ${props => props.color === 'rose' && 'background-color: #f43f5e;'}
`;

export const RequestItem = styled.div`
  padding: 0.125rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.5625rem; /* 9px */
  font-weight: 900;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-bottom: 0.25rem;
  border: 1px solid transparent;
  
  ${props => props.status === '승인'
        ? 'background-color: rgba(99, 102, 241, 0.1); color: #818cf8; border-color: rgba(99, 102, 241, 0.1);'
        : 'background-color: #0f172a; color: #64748b; border-color: #334155;'}
    
  ${props => props.type === 'consultation' && 'background-color: rgba(244, 63, 94, 0.1); color: #fb7185; border-color: rgba(244, 63, 94, 0.1);'}
`;

/* Join Request Empty View */
export const EmptyJoinView = styled.div`
  background-color: #1e293b;
  border: 1px solid rgba(51, 65, 85, 0.5);
  padding: 2rem;
  border-radius: 2.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  min-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #64748b;
  font-weight: 700;
  
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    
    svg {
      color: rgba(99, 102, 241, 0.3);
    }
  }
`;

/* Side List Section */
export const ListCard = styled.div`
  background-color: #1e293b;
  border: 1px solid rgba(51, 65, 85, 0.5);
  border-radius: 2.5rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

export const ListHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid rgba(51, 65, 85, 0.5);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ListTitle = styled.div`
  h3 {
    font-size: 1.125rem; /* lg */
    font-weight: 900;
    color: white;
  }
  
  p {
    font-size: 0.625rem; /* 10px */
    color: #64748b;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-top: 0.125rem;
  }
`;

export const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.375rem;
  background-color: #0f172a;
  padding: 0.375rem;
  border-radius: 1rem;
  border: 1px solid rgba(51, 65, 85, 0.5);
`;

export const FilterChip = styled.button`
  padding: 0.75rem;
  border-radius: 0.75rem;
  font-size: 0.625rem; /* 10px */
  font-weight: 900;
  text-align: center;
  transition: all 0.2s;
  
  ${props => props.active
        ? 'background-color: #334155; color: #818cf8; box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05);'
        : 'color: #64748b; &:hover { color: #cbd5e1; background-color: rgba(255,255,255,0.05); }'
    }
`;

export const ScrollList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  
  &::-webkit-scrollbar { display: none; }
`;

export const ListItem = styled.div`
  background-color: rgba(15, 23, 42, 0.5); /* slate-900/50 */
  border: 1px solid rgba(51, 65, 85, 0.3);
  padding: 1rem;
  border-radius: 1.5rem;
  transition: all 0.2s;
  cursor: pointer;
  
  &:hover {
    border-color: rgba(99, 102, 241, 0.3);
    
    /* Child interaction */
    > div:first-child > div:first-child {
      transform: scale(1.05);
    }
    
    button {
      color: #818cf8;
    }
  }
`;

export const ItemTop = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.75rem;
`;

export const ItemAvatar = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  background-color: #1e293b;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.125rem;
  border: 1px solid rgba(51, 65, 85, 0.5);
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
  transition: transform 0.2s;
`;

export const ItemInfo = styled.div`
  flex: 1;
  min-width: 0;
  
  h4 {
    font-size: 0.75rem; /* xs */
    font-weight: 900;
    color: white;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  p {
    font-size: 0.5625rem; /* 9px */
    font-weight: 700;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: -0.025em;
  }
`;

export const StatusPill = styled.span`
  font-size: 0.5625rem; /* 9px */
  font-weight: 900;
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
  
  ${props => props.status === '대기' && 'background-color: rgba(245, 158, 11, 0.1); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.1);'}
  ${props => props.status === '승인' && 'background-color: rgba(16, 185, 129, 0.1); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.1);'}
  ${props => props.status === '반려' && 'background-color: rgba(244, 63, 94, 0.1); color: #f43f5e; border: 1px solid rgba(244, 63, 94, 0.1);'}
  ${props => (props.status === '진행중' || props.status === 'IN_PROGRESS') && 'background-color: rgba(99, 102, 241, 0.1); color: #6366f1; border: 1px solid rgba(99, 102, 241, 0.1);'}
  ${props => (props.status === '취소' || props.status === 'CANCELLED') && 'background-color: rgba(244, 63, 94, 0.1); color: #f43f5e; border: 1px solid rgba(244, 63, 94, 0.1);'}
`;

export const ItemBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(30, 41, 59, 0.5);
  
  span {
    font-size: 0.625rem; /* 10px */
    font-weight: 700;
    color: #818cf8;
  }
  
  button {
    font-size: 0.5625rem; /* 9px */
    font-weight: 900;
    color: #64748b;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    transition: color 0.2s;
  }
`;

export const EmptyList = styled.div`
  text-align: center;
  padding: 2.5rem 0;
  color: #475569;
  font-size: 0.75rem;
  font-weight: 500;
`;

export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 0;
  padding: 1rem 1.5rem;
  border-top: 1px solid rgba(51, 65, 85, 0.5);

  button {
    padding: 0.375rem 0.75rem;
    border: 1px solid rgba(51, 65, 85, 0.5);
    border-radius: 0.375rem;
    background: #0f172a;
    color: #94a3b8;
    font-size: 0.875rem;
    cursor: pointer;
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    &:hover:not(:disabled) {
      color: #cbd5e1;
    }
  }

  span {
    font-size: 0.875rem;
    color: #94a3b8;
    font-weight: 700;
  }
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
  background-color: rgba(2, 6, 23, 0.8); /* slate-950/80 */
  backdrop-filter: blur(12px);
  animation: ${fadeIn} 0.3s ease-out;
`;

export const ModalContainer = styled.div`
  position: relative;
  background-color: #1e293b; /* slate-800 */
  width: 100%;
  max-width: 36rem;
  border-radius: 2.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  border: 1px solid rgba(51, 65, 85, 0.5);
  animation: ${zoomIn} 0.3s ease-out;
`;

export const ModalHeader = styled.div`
  padding: 2rem;
  background-color: #4f46e5;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ModalTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const ModalIconBox = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(12px);
`;

export const ModalTexts = styled.div`
  h3 {
    font-size: 1.5rem; /* 2xl */
    font-weight: 900;
    letter-spacing: -0.025em;
  }
  
  p {
    color: #e0e7ff; /* indigo-100 */
    font-size: 0.625rem; /* 10px */
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    opacity: 0.8;
  }
`;

export const CloseButton = styled.button`
  padding: 0.625rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  transition: all 0.2s;
  
  &:hover { background-color: rgba(255, 255, 255, 0.2); }
`;

export const ModalBody = styled.div`
  padding: 2rem;
  max-height: 60vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
  &::-webkit-scrollbar { display: none; }
`;

export const DetailCard = styled.div`
  background-color: #0f172a; /* slate-900 */
  padding: 1.5rem;
  border-radius: 2rem;
  border: 1px solid rgba(51, 65, 85, 0.5);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const DetailHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PersonInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const PersonAvatar = styled.div`
  width: 3rem;
  height: 3rem;
  background-color: #1e293b;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  border: 1px solid rgba(51, 65, 85, 0.5);
`;

export const PersonTexts = styled.div`
  h4 {
    font-size: 1rem;
    font-weight: 900;
    color: white;
  }
  
  p {
    font-size: 0.625rem; /* 10px */
    font-weight: 700;
    color: #64748b;
    text-transform: uppercase;
  }
`;

export const ContentBox = styled.div`
  padding: 1rem;
  background-color: #1e293b; /* slate-800 */
  border-radius: 1rem;
  border: 1px solid rgba(51, 65, 85, 0.3);
  
  p:first-child {
    font-size: 0.625rem; /* 10px */
    font-weight: 900;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 0.375rem;
  }
  
  p:last-child {
    font-size: 0.875rem; /* sm */
    font-weight: 700;
    color: #cbd5e1; /* slate-300 */
    line-height: 1.625;
  }
`;

export const JoinInfo = styled.div`
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid rgba(51, 65, 85, 0.5);
  font-size: 0.75rem; /* xs */
  color: #94a3b8; /* slate-400 */
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 0.75rem;
`;

export const ActionBtn = styled.button.attrs((props) => ({ type: 'button' }))`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.875rem;
  border-radius: 1rem;
  font-size: 0.75rem; /* xs */
  font-weight: 900;
  color: white;
  transition: all 0.2s;
  cursor: pointer;
  
  ${(props) => (props.$variant === 'approve'
    ? 'background-color: #059669; &:hover { background-color: #047857; }' /* emerald-600 */
    : 'background-color: #e11d48; &:hover { background-color: #be123c; }' /* rose-600 */
  )}
`;

export const ModalFooter = styled.div`
  padding: 2rem;
  background-color: rgba(15, 23, 42, 0.5);
  border-top: 1px solid rgba(51, 65, 85, 0.5);
  display: flex;
  justify-content: flex-end;
  
  button {
    padding: 0.75rem 1.5rem;
    font-size: 0.75rem; /* xs */
    font-weight: 900;
    color: #64748b;
    transition: all 0.2s;
    
    &:hover { color: white; }
  }
`;
