import styled, { keyframes, css } from 'styled-components';

// Animations
const zoomIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideInBottom = keyframes`
  from { opacity: 0; transform: translateY(1rem); }
  to { opacity: 1; transform: translateY(0); }
`;

const bounce = keyframes`
  0%, 100% { transform: translateY(-25%); animation-timing-function: cubic-bezier(0.8,0,1,1); }
  50% { transform: translateY(0); animation-timing-function: cubic-bezier(0,0,0.2,1); }
`;

export const Container = styled.div`
  max-width: 80rem; /* max-w-7xl */
  margin: 0 auto;
  padding-bottom: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  animation: ${slideInBottom} 0.7s ease-out;
`;

/* Summary Cards */
export const SummaryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const SummaryCard = styled.div`
  background-color: white;
  padding: 1.25rem;
  border-radius: 1.5rem;
  border: 1px solid #f1f5f9;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;

  span {
    font-size: 0.875rem; /* sm */
    font-weight: 600;
    color: #64748b;
  }
`;

export const IconBox = styled.div`
  padding: 0.5rem;
  border-radius: 0.75rem;
  
  /* Dynamic color logic passed as props or handled via specific styled component extension. 
     Using a generic approach here with props: color */
  
  ${props => props.$color === 'blue' && css`background-color: #eff6ff; color: #2563eb;`}
  ${props => props.$color === 'orange' && css`background-color: #fff7ed; color: #ea580c;`}
  ${props => props.$color === 'indigo' && css`background-color: #eef2ff; color: #4f46e5;`}
  ${props => props.$color === 'green' && css`background-color: #f0fdf4; color: #16a34a;`}
`;

export const CardValue = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.25rem;

  span:first-child {
    font-size: 1.5rem; /* 2xl */
    font-weight: 700;
    color: #1e293b;
  }
  
  span:last-child {
    font-size: 0.875rem; /* sm */
    color: #94a3b8;
  }
`;

/* Main Section */
export const MainSection = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  align-items: stretch;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(12, 1fr);
  }
`;

/* Calendar Column */
export const CalendarColumn = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: 1.75rem;
  border: 1px solid #f1f5f9;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;

  @media (min-width: 1024px) {
    grid-column: span 7 / span 7;
  }
`;

export const CalendarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  h2 {
    font-size: 1.125rem;
    font-weight: 700;
    color: #1e293b;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

export const CalendarNav = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background-color: #f8fafc;
  padding: 0.375rem 0.75rem;
  border-radius: 0.75rem;
  border: 1px solid #f1f5f9;

  button {
    padding: 0.25rem;
    transition: color 0.2s;
    &:hover { color: #4f46e5; }
  }

  span {
    font-size: 0.75rem;
    font-weight: 700;
    color: #334155;
  }
`;

export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.5rem;
  max-width: 24rem;
  margin: 0 auto;
  flex: 1;
`;

export const WeekDay = styled.div`
  text-align: center;
  padding: 0.25rem 0;
  font-size: 0.625rem;
  font-weight: 900;
  color: #cbd5e1;
  text-transform: uppercase;
`;

export const DayCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DayButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.75rem;
  transition: all 0.2s;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 700;
  border: 2px solid;

  .consultation-dot {
    position: absolute;
    bottom: 2px;
    right: 2px;
    color: #fb7185;
    opacity: 0.9;
  }

  /* Selected State - normal */
  ${props => props.$isSelected && props.$status === 'normal' && css`
    background-color: #f0fdf4;
    color: #15803d;
    border-color: #4ade80;
    box-shadow: 0 0 0 2px #f0fdf4;
  `}

  /* Selected State - late */
  ${props => props.$isSelected && props.$status === 'late' && css`
    background-color: #fef2f2;
    color: #b91c1c;
    border-color: #f87171;
    box-shadow: 0 0 0 2px #fef2f2;
  `}

  /* Selected State - leave */
  ${props => props.$isSelected && props.$status === 'leave' && css`
    background-color: #eef2ff;
    color: #4338ca;
    border-color: #818cf8;
    box-shadow: 0 0 0 2px #eef2ff;
  `}

  /* Selected State - workcation */
  ${props => props.$isSelected && props.$status === 'workcation' && css`
    background-color: #fefce8;
    color: #a16207;
    border-color: #fde047;
    box-shadow: 0 0 0 2px #fefce8;
  `}

  /* Selected State - future */
  ${props => props.$isSelected && props.$status === 'future' && css`
    background-color: #f8fafc;
    color: #94a3b8;
    border-color: #cbd5e1;
    box-shadow: 0 0 0 2px #f8fafc;
  `}

  /* Selected State - none */
  ${props => props.$isSelected && props.$status === 'none' && css`
    background-color: #eff6ff;
    color: #1d4ed8;
    border-color: #60a5fa;
    box-shadow: 0 0 0 2px #eff6ff;
  `}

  /* Selected State - leave-rejected (반려된 휴가) */
  ${props => props.$isSelected && props.$status === 'leave-rejected' && css`
    background-color: #f8fafc;
    color: #94a3b8;
    border-color: #cbd5e1;
    box-shadow: 0 0 0 2px #f8fafc;
  `}

  /* Default State - normal */
  ${props => !props.$isSelected && props.$status === 'normal' && css`
    background-color: rgba(240, 253, 244, 0.5);
    color: #16a34a;
    border-color: transparent;
    &:hover {
      border-color: #bbf7d0;
    }
  `}

  /* Default State - late */
  ${props => !props.$isSelected && props.$status === 'late' && css`
    background-color: rgba(254, 242, 242, 0.5);
    color: #dc2626;
    border-color: transparent;
    &:hover {
      border-color: #fecaca;
    }
  `}

  /* Default State - leave */
  ${props => !props.$isSelected && props.$status === 'leave' && css`
    background-color: rgba(238, 242, 255, 0.5);
    color: #4f46e5;
    border-color: transparent;
    &:hover {
      border-color: #c7d2fe;
    }
  `}

  /* Default State - workcation */
  ${props => !props.$isSelected && props.$status === 'workcation' && css`
    background-color: rgba(254, 252, 232, 0.5);
    color: #854d0e;
    border-color: transparent;
    &:hover {
      border-color: #fef08a;
    }
  `}

  /* Default State - future */
  ${props => !props.$isSelected && props.$status === 'future' && css`
    background-color: transparent;
    color: #cbd5e1;
    border-color: #f1f5f9;
    border-style: dashed;
    &:hover {
      border-color: #e2e8f0;
    }
  `}

  /* Default State - none */
  ${props => !props.$isSelected && props.$status === 'none' && css`
    background-color: rgba(248, 250, 252, 0.5);
    color: #94a3b8;
    border-color: transparent;
    &:hover {
      border-color: #e2e8f0;
    }
  `}

  /* Default State - leave-rejected (반려된 휴가) */
  ${props => !props.$isSelected && props.$status === 'leave-rejected' && css`
    background-color: transparent;
    color: #cbd5e1;
    border-color: #f1f5f9;
    border-style: dashed;
    &:hover {
      border-color: #e2e8f0;
    }
  `}
`;

export const Legend = styled.div`
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #f8fafc;
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

export const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.625rem;
  font-weight: 700;
  color: #94a3b8;

  div {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 9999px;
    ${props => props.$color === 'green' && 'background-color: #4ade80;'}
    ${props => props.$color === 'indigo' && 'background-color: #818cf8;'}
    ${props => props.$color === 'red' && 'background-color: #f87171;'}
    ${props => props.$color === 'yellow' && 'background-color: #eab308;'}
    ${props => props.$color === 'pink' && 'background-color: #fb7185;'}
    ${props => props.$color === 'slate' && 'background-color: #e2e8f0; border: 1px dashed #cbd5e1;'}
  }
`;

/* Details Column */
export const DetailsColumn = styled.div`
  height: 100%;

  @media (min-width: 1024px) {
    grid-column: span 5 / span 5;
  }
`;

export const DetailsCard = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: 1.75rem;
  border: 1px solid #f1f5f9;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`;

export const StatusIndicatorBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 0.375rem;
  transition: background-color 0.5s;
  
  ${props => props.$status === '미정' && 'background-color: #e2e8f0;'}
  ${props => props.$status === '정상' && 'background-color: #22c55e;'}
  ${props => props.$status === '지각' && 'background-color: #ef4444;'}
  ${props => props.$isLeave && 'background-color: #6366f1;'}
  ${props => props.$status === '워케이션' && 'background-color: #ca8a04;'}
`;

export const DetailsContent = styled.div`
  position: relative;
  z-index: 10;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const DetailsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;

  h3 {
    font-size: 1.5rem;
    font-weight: 900;
    color: #1e293b;
    letter-spacing: -0.025em;
  }
  
  p {
    color: #94a3b8;
    font-size: 0.625rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 0.25rem;
  }
`;

export const StatusBadge = styled.div`
  padding: 0.375rem 0.75rem;
  border-radius: 0.75rem;
  font-size: 0.625rem; /* 10px */
  font-weight: 900;
  text-transform: uppercase;
  
  ${props => props.$status === '미정' && 'background-color: #f8fafc; color: #94a3b8;'}
  ${props => props.$status === '정상' && 'background-color: #f0fdf4; color: #16a34a;'}
  ${props => props.$status === '지각' && 'background-color: #fef2f2; color: #dc2626;'}
  ${props => props.$isLeave && 'background-color: #eef2ff; color: #4f46e5;'}
  ${props => props.$status === '워케이션' && 'background-color: #fefce8; color: #a16207;'}
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 3rem 0;
  text-align: center;
  color: #cbd5e1;

  div {
    width: 5rem;
    height: 5rem;
    background-color: #f8fafc;
    border-radius: 9999px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.5rem;
  }

  h4 {
    font-size: 1.125rem;
    font-weight: 700;
    color: #94a3b8;
    margin-bottom: 0.5rem;
  }

  p {
    font-size: 0.75rem;
    font-weight: 500;
    color: #94a3b8;
    line-height: 1.625;
  }
`;

export const LeaveState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 1rem 0;
  text-align: center;
`;

export const PlaneIconWrapper = styled.div`
  width: 6rem;
  height: 6rem;
  background-color: #eef2ff;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  box-shadow: inset 0 2px 4px 0 rgba(0,0,0,0.06);

  svg {
    animation: ${bounce} 2s infinite;
  }
`;

export const LeaveTitle = styled.h4`
  font-size: 1.25rem;
  font-weight: 900;
  color: #4f46e5;
  margin-bottom: 0.5rem;
`;

export const LeaveDesc = styled.p`
  font-size: 0.875rem;
  color: #94a3b8;
  padding: 0 2rem;
  line-height: 1.625;
  margin-bottom: 2rem;
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  width: 100%;
`;

export const InfoBox = styled.div`
  background-color: #f8fafc;
  padding: 1rem;
  border-radius: 1rem;
  border: 1px solid #f1f5f9;
  
  p:first-child {
    font-size: 0.625rem;
    font-weight: 700;
    color: #94a3b8;
    text-transform: uppercase;
    margin-bottom: 0.25rem;
  }
  
  p:last-child {
    font-size: 0.875rem;
    font-weight: 700;
    color: #334155;
    ${props => props.$highlight && css`color: ${props.$highlight};`}
  }
`;

export const WorkTimeDisplay = styled.div`
  background-color: #eef2ff;
  padding: 1.25rem;
  border-radius: 1rem;
  border: 1px solid #e0e7ff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;

  span:first-child {
    font-size: 0.875rem;
    font-weight: 700;
    color: #475569;
  }
  
  span:last-child {
    font-size: 1.25rem;
    font-weight: 900;
    color: #4f46e5;
  }
`;

export const NoteBox = styled.div`
  padding: 1.25rem;
  background-color: #f8fafc;
  border-radius: 1rem;
  border: 1px solid #f1f5f9;
  margin-top: 1rem;

  p:first-child {
    color: #94a3b8;
    font-size: 0.625rem;
    font-weight: 700;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
  }
  
  p:last-child {
    font-size: 0.875rem;
    color: #475569;
    font-weight: 500;
    line-height: 1.625;
  }
`;


/* History Table Section */
export const HistorySection = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const HistoryColumn = styled.div`
  @media (min-width: 1024px) {
    grid-column: span 2 / span 2;
  }
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0 0.5rem;
`;

export const TableContainer = styled.div`
  background-color: white;
  border-radius: 1.5rem;
  border: 1px solid #f1f5f9;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

export const Table = styled.table`
  width: 100%;
  text-align: left;
  border-collapse: collapse;

  th {
    padding: 1rem 1.5rem;
    font-size: 0.875rem;
    font-weight: 700;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    background-color: rgba(248, 250, 252, 0.5);
    border-bottom: 1px solid #f1f5f9;
  }

  td {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #f8fafc;
    color: #334155;
  }

  tr:last-child td {
    border-bottom: none;
  }

  tr:hover td {
    background-color: rgba(248, 250, 252, 0.3);
  }
`;

export const TableStatus = styled.span`
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  
  ${props => props.$status === '정상'
    ? 'background-color: #f0fdf4; color: #16a34a;'
    : 'background-color: #fef2f2; color: #dc2626;'}
`;

export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-top: 1px solid #f1f5f9;

  button {
    padding: 0.375rem 0.75rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
    background: white;
    font-size: 0.875rem;
    cursor: pointer;
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;

/* Leave Request Section */
export const LeaveColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const RequestButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  background-color: #eef2ff;
  color: #4f46e5;
  border-radius: 0.75rem;
  font-size: 0.75rem;
  font-weight: 700;
  transition: all 0.2s;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05);

  &:hover {
    background-color: #4f46e5;
    color: white;
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

export const LeaveCard = styled.div`
  background-color: white;
  padding: 1.25rem;
  border-radius: 1.5rem;
  border: 1px solid #f1f5f9;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

export const LeaveCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;

  span:first-child {
    font-size: 0.875rem;
    font-weight: 700;
    color: #1e293b;
  }
`;

export const LeaveStatusBadge = styled.span`
  font-size: 0.625rem;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-weight: 700;
  
  ${props => props.$status === '승인완료'
    ? 'background-color: #f0fdf4; color: #16a34a;'
    : 'background-color: #eff6ff; color: #2563eb;'}
`;

export const LeavePeriod = styled.p`
  font-size: 0.75rem;
  color: #94a3b8;
  margin-bottom: 0.75rem;
`;

export const LeaveCardFooter = styled.div`
  padding-top: 0.75rem;
  border-top: 1px solid #f8fafc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  color: #64748b;

  span span {
    font-weight: 700;
    color: #334155;
  }
  
  button {
    font-size: 0.625rem;
    font-weight: 700;
    color: #f87171;
    &:hover { color: #dc2626; }
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
  background-color: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(4px);
  animation: ${fadeIn} 0.3s ease-out;
`;

export const ModalContainer = styled.div`
  position: relative;
  background-color: white;
  width: 100%;
  max-width: 28rem;
  border-radius: 2.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  animation: ${zoomIn} 0.3s ease-out;
`;

export const ModalHeader = styled.div`
  background-color: #4f46e5;
  padding: 2rem;
  color: white;
`;

export const ModalHeaderTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

export const IconCircle = styled.div`
  padding: 0.75rem;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
`;

export const CloseButton = styled.button`
  padding: 0.5rem;
  border-radius: 9999px;
  transition: background-color 0.2s;
  &:hover { background-color: rgba(255, 255, 255, 0.2); }
`;

export const ModalTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 900;
  letter-spacing: -0.025em;
`;

export const ModalSubtitle = styled.p`
  color: #e0e7ff;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

export const ModalBody = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const LabelGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const InputLabel = styled.label`
  font-size: 0.75rem;
  font-weight: 900;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-left: 0.25rem;
`;

export const SelectWrapper = styled.div`
  position: relative;
`;

export const Select = styled.select`
  width: 100%;
  background-color: #f8fafc;
  border: 2px solid transparent;
  border-radius: 1rem;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: 700;
  color: #334155;
  outline: none;
  transition: all 0.2s;
  appearance: none;
  cursor: pointer;
  padding-right: 2.5rem;

  &:focus {
    border-color: #6366f1;
  }
`;

export const DateInput = styled.input`
  width: 100%;
  background-color: #f8fafc;
  border: 2px solid transparent;
  border-radius: 1rem;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-weight: 700;
  color: #334155;
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-color: #6366f1;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  background-color: #f8fafc;
  border: 2px solid transparent;
  border-radius: 1rem;
  padding: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #334155;
  outline: none;
  transition: all 0.2s;
  height: 6rem;
  resize: none;

  &:focus {
    border-color: #6366f1;
  }
`;

export const SubmitModalButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #4f46e5;
  color: white;
  border-radius: 1rem;
  font-weight: 900;
  font-size: 1.125rem;
  box-shadow: 0 20px 25px -5px rgba(199, 210, 254, 1);
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover { background-color: #4338ca; }
  &:active { transform: scale(0.95); }
`;
