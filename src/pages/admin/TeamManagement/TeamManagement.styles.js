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

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-bottom: 3rem;
  animation: ${slideInBottom} 0.7s ease-out;
`;

/* Summary Stats Header */
export const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  width: 100%;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const StatCard = styled.div`
  background-color: #0f172a; /* slate-900 */
  padding: 1.25rem;
  border-radius: 1.5rem;
  border: 1px solid #1e293b; /* slate-800 */
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const IconBox = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  ${props => props.color === 'blue' && 'background-color: rgba(59, 130, 246, 0.1); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.2);'}
  ${props => props.color === 'rose' && 'background-color: rgba(244, 63, 94, 0.1); color: #fb7185; border: 1px solid rgba(244, 63, 94, 0.2);'}
  ${props => props.color === 'orange' && 'background-color: rgba(249, 115, 22, 0.1); color: #fb923c; border: 1px solid rgba(249, 115, 22, 0.2);'}
`;

export const StatInfo = styled.div`
  p:first-child {
    font-size: 0.625rem;
    font-weight: 900;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  
  p:last-child {
    font-size: 1.25rem;
    font-weight: 900;
    
    ${props => props.color === 'white' && 'color: white;'}
    ${props => props.color === 'rose' && 'color: #fb7185;'}
    ${props => props.color === 'orange' && 'color: #fb923c;'}
  }
`;

/* Filter & Search Bar */
export const SearchBar = styled.div`
  background-color: #0f172a;
  padding: 1rem;
  border-radius: 1.5rem;
  border: 1px solid #1e293b;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export const FilterSelectWrapper = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
  width: 100%;

  @media (min-width: 768px) {
    width: auto;
  }
`;

export const FilterSelect = styled.select`
  padding: 0.75rem 1rem;
  background-color: #1e293b;
  border: 1px solid #334155;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 700;
  color: white;
  outline: none;
  transition: all 0.2s;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2394a3b8' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  padding-right: 2.5rem;
  min-width: 150px;

  &:focus {
    border-color: #6366f1;
  }

  option {
    background-color: #1e293b;
    color: white;
  }
`;

export const SearchInputWrapper = styled.div`
  position: relative;
  flex: 1;
  width: 100%;
  
  svg {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    width: 1rem;
    height: 1rem;
    color: #475569;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  background-color: #020617; /* slate-950 */
  border: 1px solid #1e293b;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: white;
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-color: #6366f1;
  }
`;

/* Team Member List */
export const MemberList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const MemberCard = styled.div`
  background-color: #0f172a;
  padding: 1rem;
  border-radius: 1rem;
  border: 1px solid #1e293b;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    border-color: #334155;
    background-color: rgba(255, 255, 255, 0.02);
    
    /* Child interaction */
    > div > div {
       transform: scale(1.02);
    }
  }
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 2rem;
  }
`;

export const MemberProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 180px;
`;

export const AvatarBox = styled.div`
  width: 3rem;
  height: 3rem;
  background-color: #1e293b;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
`;

export const MemberNames = styled.div`
  h3 {
    font-size: 0.875rem;
    font-weight: 900;
    color: #e2e8f0;
    transition: color 0.2s;
    ${MemberCard}:hover & {
        color: white;
    }
  }
  
  p {
    font-size: 0.625rem;
    font-weight: 700;
    color: #64748b;
    white-space: nowrap;
  }
`;

export const MemberStats = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  width: 100%;
  text-align: left;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const StatColumn = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  
  span:first-child {
    font-size: 0.5625rem;
    font-weight: 900;
    color: #475569;
    text-transform: uppercase;
    margin-bottom: 0.125rem;
    white-space: nowrap;
  }
  
  span:last-child {
    font-size: 0.75rem;
    font-weight: 900;
    
    ${props => props.white && 'color: #94a3b8;'}
    ${props => props.stress && css`
      color: ${props.value > 70 ? '#fb7185' : '#818cf8'};
    `}
  }
`;

export const StatusBadge = styled.span`
  font-size: 0.625rem;
  font-weight: 900;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  white-space: nowrap;
  
  ${props => {
    switch (props.status) {
      case '출근':
        return 'background-color: rgba(34, 197, 94, 0.1); color: #4ade80; border: 1px solid rgba(34, 197, 94, 0.2);'; // Green
      case '퇴근':
        return 'background-color: rgba(148, 163, 184, 0.1); color: #94a3b8; border: 1px solid rgba(148, 163, 184, 0.2);'; // Slate/Gray
      case '휴가':
        return 'background-color: rgba(167, 139, 250, 0.1); color: #a78bfa; border: 1px solid rgba(167, 139, 250, 0.2);'; // Violet
      case '자리비움':
      case '쿨다운':
        return 'background-color: rgba(251, 146, 60, 0.1); color: #fb923c; border: 1px solid rgba(251, 146, 60, 0.2);'; // Orange
      case '위험': // Keep for backward compatibility if needed, or removing
        return 'background-color: rgba(244, 63, 94, 0.1); color: #fb7185; border: 1px solid rgba(244, 63, 94, 0.2);';
      default:
        return 'background-color: rgba(148, 163, 184, 0.1); color: #94a3b8; border: 1px solid rgba(148, 163, 184, 0.2);';
    }
  }}
`;

/* Modal Styles */
export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 120;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  overflow-y: auto;
  
  &::-webkit-scrollbar { display: none; }
`;

export const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
  animation: ${fadeIn} 0.3s ease-out;
`;

export const ModalContainer = styled.div`
  position: relative;
  background-color: #0f172a;
  width: 100%;
  max-width: 64rem;
  border-radius: 3rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border: 1px solid #1e293b;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: ${zoomIn} 0.3s ease-out;
`;

export const ModalHeader = styled.div`
  width: 100%;
  padding: 1.5rem;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: stretch;
    padding: 2rem 3rem;
  }

  ${props => {
    switch (props.status) {
      case '출근': return 'background-color: #4338ca;'; // Indigo
      case '퇴근': return 'background-color: #475569;'; // Slate
      case '휴가': return 'background-color: #7c3aed;'; // Violet
      case '자리비움':
      case '쿨다운': return 'background-color: #ea580c;'; // Orange
      case '위험': return 'background-color: #be123c;';
      case '주의': return 'background-color: #ea580c;';
      default: return 'background-color: #4338ca;';
    }
  }}
`;

export const ModalAvatar = styled.div`
  width: 6rem;
  height: 6rem;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 2.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.25rem; /* 4xl */
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  flex-shrink: 0;

  @media (min-width: 768px) {
    width: 9rem;
    height: 9rem;
    font-size: 3rem;
  }
`;

export const ModalInfo = styled.div`
  flex: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (min-width: 768px) {
    text-align: left;
  }
`;

export const NameTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: baseline;
    gap: 1rem;
  }

  h2 {
    font-size: 1.875rem;
    font-weight: 900;
    letter-spacing: -0.05em;
    @media (min-width: 768px) { font-size: 2.25rem; }
  }
  
  span {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.875rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
`;

export const ContactRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
  
  @media (min-width: 768px) {
    justify-content: flex-start;
  }
`;

export const ContactChip = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.75rem;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  
  svg { color: rgba(255, 255, 255, 0.6); width: 0.75rem; height: 0.75rem; }
  span { font-size: 0.6875rem; font-weight: 700; color: white; }
`;

export const ModalActions = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  flex-shrink: 0;
  
  @media (min-width: 768px) {
    flex-direction: column;
    margin-top: auto;
    margin-bottom: 0.375rem;
  }
`;

export const CallButton = styled.button`
  padding: 0.75rem 2rem;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 1rem;
  font-size: 0.6875rem;
  font-weight: 900;
  color: white;
  text-transform: uppercase;
  transition: all 0.2s;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  
  &:hover { background-color: rgba(0, 0, 0, 0.3); }
  &:active { transform: scale(0.95); }
`;

export const CloseModalButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 2rem;
  padding: 0.5rem;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 9999px;
  color: rgba(255, 255, 255, 0.5);
  transition: color 0.2s;
  
  &:hover { color: white; background-color: rgba(0, 0, 0, 0.4); }
`;

/* Detail Content */
export const DetailContent = styled.div`
  flex: 1;
  padding: 1.5rem;
  background-color: #0f172a;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: 768px) {
    padding: 2rem 3rem;
  }
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(12, 1fr);
  }
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
  @media (min-width: 1024px) {
    grid-column: span 7 / span 7;
  }
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: 1024px) {
    grid-column: span 5 / span 5;
  }
`;

/* Stress Bar Widget */
export const StressWidget = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  padding: 1.25rem;
  border-radius: 1.75rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
`;

export const WidgetHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  
  p {
    font-size: 0.5625rem;
    font-weight: 900;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

export const BadgeSmall = styled.span`
  font-size: 0.5625rem;
  font-weight: 900;
  color: #818cf8;
  background-color: rgba(129, 140, 248, 0.1);
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
`;

export const StressValue = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.375rem;
  margin-bottom: 0.75rem;
  
  span:first-child {
    font-size: 2.25rem;
    font-weight: 900;
    color: white;
  }
  
  span:last-child {
    font-size: 1.125rem;
    color: #475569;
    font-weight: 700;
  }
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 0.375rem;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 9999px;
  overflow: hidden;
  
  div {
    height: 100%;
    background: linear-gradient(to right, #6366f1, #818cf8);
    transition: width 1s ease-out;
  }
`;

/* Key Metrics Grid */
export const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.625rem;
`;

export const MetricCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 1.75rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.2s;
  
  &:hover {
    border-color: rgba(99, 102, 241, 0.2);
  }
`;

export const MetricTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const MetricIcon = styled.div`
  padding: 0.625rem;
  border-radius: 1rem;
  flex-shrink: 0;
  
  ${props => props.color === 'amber' && 'background-color: rgba(245, 158, 11, 0.1); color: #f59e0b;'}
  ${props => props.color === 'emerald' && 'background-color: rgba(16, 185, 129, 0.1); color: #10b981;'}
  ${props => props.color === 'orange' && 'background-color: rgba(249, 115, 22, 0.1); color: #f97316;'}
`;

export const MetricName = styled.span`
  font-size: 0.6875rem;
  font-weight: 900;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  white-space: nowrap;
`;

export const MetricValue = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.375rem;
  
  p {
    font-size: 1.875rem;
    font-weight: 900;
    line-height: 1;
    
    ${props => props.color === 'amber' && 'color: #f59e0b;'}
    ${props => props.color === 'emerald' && 'color: white;'}
    ${props => props.color === 'orange' && 'color: white;'}
  }
  
  span {
    font-size: 1rem;
    color: #475569;
    font-weight: 700;
  }
`;

/* Right Column Widgets */
export const WellnessSection = styled.div``;

export const SectionTitle = styled.h4`
  font-size: 0.625rem;
  font-weight: 900;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding-left: 0.5rem;
`;

export const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
`;

export const HistoryItem = styled.div`
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 1.25rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s;
  
  &:hover {
    border-color: rgba(99, 102, 241, 0.3);
  }
`;

export const HistoryContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
`;

export const HistoryIcon = styled.div`
  width: 2.25rem;
  height: 2.25rem;
  background-color: #1e293b;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #94a3b8;
`;

export const HistoryText = styled.div`
  min-width: 0;
  
  p:first-child {
    font-size: 0.75rem;
    font-weight: 900;
    color: #f1f5f9;
    margin-bottom: 0.125rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  p:last-child {
    font-size: 0.5625rem;
    font-weight: 700;
    color: #475569;
  }
`;

/* Reuse Wellness item style for leave & alerts */
export const WellnessItem = styled.div`
  padding: 1.25rem;
  background-color: rgba(255, 255, 255, 0.03);
  border-radius: 1.75rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  transition: all 0.2s;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
`;

export const WellnessLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const WellnessIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  ${props => props.color === 'indigo' && 'background-color: rgba(99, 102, 241, 0.1); color: #6366f1;'}
  ${props => props.color === 'rose' && 'background-color: rgba(244, 63, 94, 0.1); color: #f43f5e;'}
`;

export const WellnessLabel = styled.span`
  font-size: 0.625rem;
  font-weight: 900;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

export const WellnessValue = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
  
  p {
    font-size: 1.5rem;
    font-weight: 900;
    line-height: 1;
    color: ${props => props.color || 'white'};
  }
  
  span {
    font-size: 0.75rem;
    font-weight: 700;
    color: #475569;
  }
`;

/* Calendar Widget */
export const CalendarWidget = styled.div`
  background-color: rgba(255, 255, 255, 0.02);
  padding: 1.25rem;
  border-radius: 1.75rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
`;

export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.25rem;
  text-align: center;
  flex: 1;
`;

export const WeekDay = styled.div`
  font-size: 0.75rem;
  font-weight: 700;
  color: #64748b;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DayCell = styled.div`
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #94a3b8;
  position: relative;
  background-color: rgba(255, 255, 255, 0.02);
  border: 1px solid transparent;
  transition: all 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }

  ${props => {
    switch (props.status) {
      case 'present': return 'background-color: rgba(34, 197, 94, 0.1); color: #4ade80; border-color: rgba(34, 197, 94, 0.2);'; // Green
      case 'late': return 'background-color: rgba(245, 158, 11, 0.1); color: #f59e0b; border-color: rgba(245, 158, 11, 0.2);'; // Amber
      case 'absent': return 'background-color: rgba(244, 63, 94, 0.1); color: #fb7185; border-color: rgba(244, 63, 94, 0.2);'; // Rose
      case 'vacation': return 'background-color: rgba(167, 139, 250, 0.1); color: #a78bfa; border-color: rgba(167, 139, 250, 0.2);'; // Violet
      default: return '';
    }
  }}
`;

/* 부서 추가 관련 스타일 */
export const AddDeptButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: rgba(99, 102, 241, 0.1);
  color: #818cf8;
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 0.75rem;
  font-size: 0.6875rem;
  font-weight: 900;
  white-space: nowrap;
  transition: all 0.2s;
  cursor: pointer;
  
  &:hover {
    background-color: rgba(99, 102, 241, 0.2);
    border-color: rgba(99, 102, 241, 0.3);
  }
`;

export const AddDeptModalContainer = styled.div`
  position: relative;
  background-color: #0f172a;
  width: 100%;
  max-width: 28rem;
  border-radius: 2rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border: 1px solid #1e293b;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: ${zoomIn} 0.3s ease-out;
  z-index: 130;
  margin: auto;
`;

export const AddDeptModalHeader = styled.div`
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #1e293b;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  h3 {
    font-size: 1.25rem;
    font-weight: 900;
    color: white;
  }
`;

export const AddDeptModalContent = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background-color: #0f172a;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-size: 0.75rem;
    font-weight: 700;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`;

export const AddDeptInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: #1e293b;
  border: 1px solid #334155;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: white;
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-color: #6366f1;
  }

  &::placeholder {
    color: #64748b;
  }
`;

export const AddDeptButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

export const AddDeptCancelButton = styled.button`
  flex: 1;
  padding: 0.75rem 1.5rem;
  background-color: #1e293b;
  color: #94a3b8;
  border: 1px solid #334155;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 700;
  transition: all 0.2s;
  cursor: pointer;
  
  &:hover {
    background-color: #334155;
    color: white;
  }
`;

export const AddDeptSubmitButton = styled.button`
  flex: 1;
  padding: 0.75rem 1.5rem;
  background-color: #6366f1;
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 700;
  transition: all 0.2s;
  cursor: pointer;
  
  &:hover {
    background-color: #4f46e5;
  }
  
  &:active {
    transform: scale(0.98);
  }
`;
