import styled, { keyframes, css } from 'styled-components';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideInRight = keyframes`
  from { transform: translateX(2rem); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const slideInBottom = keyframes`
  from { transform: translateY(1rem); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

export const Container = styled.div`
  max-width: 80rem; /* max-w-7xl */
  margin: 0 auto;
  padding-bottom: 5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  animation: ${slideInBottom} 0.7s ease-out;
  animation-fill-mode: both;
`;

/* Common Header Styles */
export const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 0.5rem;
`;

export const TitleGroup = styled.div`
  h1 {
    font-size: 2.25rem; /* 4xl */
    font-weight: 900;
    color: #1e293b; /* slate-800 */
    letter-spacing: -0.025em;
  }
  p {
    color: #94a3b8; /* slate-400 */
    font-weight: 600;
    margin-top: 0.5rem;
  }
`;

export const SubPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  animation: ${slideInRight} 0.5s ease-out;
`;

export const SubPageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  gap: 1rem;
  flex-wrap: wrap;
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const BackButton = styled.button`
  padding: 0.5rem;
  border-radius: 9999px;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f1f5f9;
  }
  
  svg {
    color: #334155;
  }
`;

export const SubTitleGroup = styled.div`
  h2 {
    font-size: 1.5rem; /* 2xl */
    font-weight: 900;
    color: #1e293b;
  }
  p {
    font-size: 0.75rem; /* xs */
    font-weight: 500;
    color: #64748b;
    margin-top: 0.25rem;
  }
`;

/* Profile View Styles */
export const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const AvatarCard = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 2rem;
  border: 1px solid #f1f5f9;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const AvatarWrapper = styled.div`
  position: relative;
  cursor: pointer;
  
  /* Hover effect handling via group class equivalent */
  &:hover > div:first-child {
    transform: scale(1.05);
  }
  &:hover > div:last-child {
    opacity: 1;
  }
`;

export const AvatarImage = styled.div`
  width: 10rem;
  height: 10rem;
  background-color: #f8fafc;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3.75rem; /* 6xl */
  border: 4px solid white;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.2s;
`;

export const AvatarOverlay = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 9999px;
  opacity: 0;
  transition: opacity 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FormCard = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 2rem;
  border: 1px solid #f1f5f9;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  font-size: 0.75rem; /* xs */
  font-weight: 900;
  color: #94a3b8;
  text-transform: uppercase;
  margin-left: 0.25rem;
`;

export const ReadOnlyField = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background-color: #f8fafc;
  border-radius: 1rem;
  border: 1px solid transparent;
  
  span:nth-child(2) {
    font-weight: 700;
    color: #334155;
  }
`;

export const InputField = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background-color: white;
  border-radius: 1rem;
  border: 1px solid #e2e8f0;
  transition: all 0.2s;
  
  &:focus-within {
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px #dbeafe;
  }

  input {
    width: 100%;
    outline: none;
    font-weight: 700;
    color: #334155;
  }
`;

export const PasswordInput = styled.input`
  width: 100%;
  padding: 1rem;
  background-color: #f8fafc;
  border-radius: 1rem;
  border: 1px solid #e2e8f0;
  outline: none;
  transition: all 0.2s;
  font-weight: 500;
  color: #334155;

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px #dbeafe;
  }
`;

export const ActionRow = styled.div`
  padding-top: 1rem;
  border-top: 1px solid #f8fafc;
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
`;

export const CancelButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 700;
  color: #64748b;
  transition: background-color 0.2s;
  &:hover { background-color: #f8fafc; }
`;

export const SaveButton = styled.button`
  padding: 0.75rem 2rem;
  background-color: #2563eb;
  color: white;
  border-radius: 0.75rem;
  font-weight: 700;
  box-shadow: 0 10px 15px -3px rgba(219, 234, 254, 1);
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover { background-color: #1d4ed8; }
`;

/* Coupon View Styles */
export const FilterGroup = styled.div`
  display: flex;
  background-color: #f1f5f9;
  padding: 0.25rem;
  border-radius: 0.75rem;
  align-self: flex-start;
`;

export const FilterButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-size: 0.75rem; /* xs */
  font-weight: 900;
  transition: all 0.2s;

  ${props => props.active ? css`
    background-color: white;
    color: #1e293b;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05);
  ` : css`
    color: #94a3b8;
    &:hover { color: #475569; }
  `}
`;

export const CouponGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const CouponCard = styled.div`
  background-color: white;
  border-radius: 2rem;
  padding: 1.5rem;
  border: 1px solid #f1f5f9;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    transform: translateY(-4px);
  }

  ${props => props.isUsed && css`
    opacity: 0.7;
    filter: grayscale(0.5);
  `}
`;

export const CouponTopBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 0.5rem;
  background-color: ${props => props.color || '#cbd5e1'};
`;

export const CouponHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.5rem;
`;

export const CouponIcon = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.875rem; /* 3xl */
  transition: transform 0.2s;
  background-color: ${props => props.bgColor || 'rgba(0,0,0,0.05)'};
  color: ${props => props.color || 'inherit'};

  ${CouponCard}:hover & {
    transform: scale(1.1);
  }
`;

export const CouponStatus = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.625rem; /* 10px */
  font-weight: 700;
  
  ${props => props.status === 'AVAILABLE' ? css`
    background-color: #f8fafc;
    color: #64748b;
  ` : css`
    background-color: #f1f5f9;
    color: #94a3b8;
  `}
`;

export const CouponInfo = styled.div`
  margin-bottom: 1.5rem;
  
  p {
    font-size: 0.625rem;
    font-weight: 900;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
  
  h3 {
    font-size: 1.125rem;
    font-weight: 900;
    color: ${props => props.isUsed ? '#64748b' : '#1e293b'};
    text-decoration: ${props => props.isUsed ? 'line-through' : 'none'};
  }
`;

export const CouponFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px dashed #e2e8f0;
`;

export const CouponDate = styled.div`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  color: #94a3b8;
  font-size: 0.625rem;
  font-weight: 700;
`;

export const CouponButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  font-size: 0.75rem;
  font-weight: 700;
  transition: all 0.2s;

  ${props => props.disabled ? css`
    background-color: #f1f5f9;
    color: #94a3b8;
    cursor: not-allowed;
  ` : css`
    background-color: #0f172a;
    color: white;
    &:hover { background-color: #2563eb; }
  `}
`;

export const CouponDecorCircle = styled.div`
  position: absolute;
  top: 65%;
  width: 1.5rem;
  height: 1.5rem;
  background-color: #f8fafc; /* match container bg if possible, or main background */
  border-radius: 9999px;
  /* positioning handled via props to avoid code duplication */
  ${props => props.side === 'left' ? 'left: -0.75rem;' : 'right: -0.75rem;'}
`;

/* Point History View */
export const PointSummaryCard = styled.div`
  background-color: #0f172a; /* slate-900 */
  border-radius: 2rem;
  padding: 2rem;
  color: white;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
`;

export const BalanceSection = styled.div`
  position: relative;
  z-index: 10;
  
  p {
    font-size: 0.75rem;
    font-weight: 700;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 0.5rem;
  }
  
  h3 {
    font-size: 2.25rem; /* 4xl */
    font-weight: 900;
    color: #fbbf24; /* amber-400 */
    
    span {
      font-size: 1.125rem;
      color: white;
    }
  }
`;

export const StatsSection = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  gap: 1rem;
`;

export const StatItem = styled.div`
  text-align: right;
  
  p:first-child {
    font-size: 0.625rem;
    color: #94a3b8;
    margin-bottom: 0.25rem;
  }
  
  p:last-child {
    font-size: 1.25rem;
    font-weight: 700;
    color: ${props => props.isPositive ? '#34d399' : 'white'}; /* emerald-400 or white */
  }
`;

export const Divider = styled.div`
  width: 1px;
  height: 2.5rem;
  background-color: #334155;
`;

export const HistoryContainer = styled.div`
  background-color: white;
  border-radius: 2rem;
  border: 1px solid #f1f5f9;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

export const HistoryHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid #f1f5f9;
  background-color: rgba(248, 250, 252, 0.5);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FilterTabs = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const TabButton = styled.button`
  padding: 0.375rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.75rem;
  font-weight: 900;
  transition: all 0.2s;

  ${props => props.active ? css`
    background-color: white;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05);
    color: ${props.color || '#1e293b'};
  ` : css`
    color: #94a3b8;
    &:hover { color: #475569; }
  `}
`;

export const HistoryList = styled.div`
  & > div:not(:last-child) {
    border-bottom: 1px solid #f8fafc;
  }
`;

export const HistoryItem = styled.div`
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f8fafc;
  }
`;

export const ItemLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const IconBox = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  ${props => props.type === 'EARN' ? css`
    background-color: #ecfdf5; /* emerald-50 */
    color: #059669; /* emerald-600 */
  ` : css`
    background-color: #f1f5f9; /* slate-100 */
    color: #64748b; /* slate-500 */
  `}
`;

export const ItemDetails = styled.div`
  p:first-child {
    font-size: 0.875rem;
    font-weight: 900;
    color: #1e293b;
  }
  p:last-child {
    font-size: 0.625rem;
    font-weight: 700;
    color: #94a3b8;
    margin-top: 0.125rem;
  }
`;

export const ItemRight = styled.div`
  text-align: right;
  
  p:first-child {
    font-size: 0.875rem;
    font-weight: 900;
    color: ${props => props.type === 'EARN' ? '#059669' : '#1e293b'};
  }
  p:last-child {
    font-size: 0.625rem;
    font-weight: 700;
    color: #94a3b8;
    margin-top: 0.125rem;
  }
`;

export const LoadMoreButton = styled.button`
  width: 100%;
  padding: 1rem;
  font-size: 0.75rem;
  font-weight: 900;
  color: #64748b;
  background-color: rgba(248, 250, 252, 0.5);
  border-top: 1px solid #f1f5f9;
  transition: color 0.2s;
  
  &:hover {
    color: #2563eb;
  }
`;

/* Notification View */
export const NotiList = styled.div`
  min-height: 500px;
  background-color: white;
  border-radius: 2rem;
  border: 1px solid #f1f5f9;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  overflow: hidden;
`;

export const NotiGroup = styled.div`
  /* date group */
`;

export const DateHeader = styled.h3`
  font-size: 0.6875rem; /* 11px */
  font-weight: 900;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 1rem;
  margin-left: 0.5rem;
`;

export const NotiItem = styled.div`
  padding: 1rem;
  border-radius: 1rem;
  display: flex;
  gap: 1rem;
  transition: all 0.2s;
  border: 1px solid;
  margin-bottom: 0.75rem;
  
  ${props => props.read ? css`
    background-color: white;
    border-color: transparent;
    &:hover { background-color: #f8fafc; }
  ` : css`
    background-color: rgba(238, 242, 255, 0.3); /* indigo-50/30 */
    border-color: #e0e7ff; /* indigo-100 */
    &:hover { background-color: rgba(238, 242, 255, 0.5); }
  `}
`;

export const IconWrapper = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  ${props => props.type === 'success' && css`background: #d1fae5; color: #059669;`} /* emerald-100, 600 */
  ${props => props.type === 'alert' && css`background: #ffe4e6; color: #e11d48;`} /* rose-100, 600 */
  ${props => props.type === 'notice' && css`background: #fef3c7; color: #d97706;`} /* amber-100, 600 */
  ${props => props.type === 'info' && css`background: #dbeafe; color: #2563eb;`} /* blue-100, 600 */
`;

export const ContentWrapper = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.25rem;
  
  h4 {
    font-size: 0.875rem;
    font-weight: 900;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${props => props.read ? '#334155' : '#0f172a'};
  }
  
  span {
    font-size: 0.625rem;
    font-weight: 700;
    color: #94a3b8;
    margin-left: 0.5rem;
    white-space: nowrap;
  }
`;

export const ItemMessage = styled.p`
  font-size: 0.75rem;
  line-height: 1.625;
  color: ${props => props.read ? '#64748b' : '#475569'};
  font-weight: ${props => props.read ? '400' : '500'};
`;

export const UnreadDot = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 9999px;
  background-color: #6366f1;
  margin-top: 0.5rem;
`;

/* Main Dashboard Grid */
export const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(12, 1fr);
  }
`;

export const ColLeft = styled.div`
  @media (min-width: 1024px) {
    grid-column: span 4 / span 4;
  }
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const ColRight = styled.div`
  @media (min-width: 1024px) {
    grid-column: span 8 / span 8;
  }
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const BentoCard = styled.div`
  background-color: white;
  border-radius: 2rem;
  border: 1px solid #f1f5f9;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: ${props => props.padding || '2rem'};

  &:hover {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    transform: translateY(-4px);
  }

  ${props => props.$gradient && css`
    background: linear-gradient(to bottom right, white, rgba(248, 250, 252, 0.5));
  `}
`;

export const ProfileBento = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const ProfileInfo = styled.div`
  margin-top: 2rem;
  h2 {
    font-size: 1.5rem;
    font-weight: 900;
    color: #1e293b;
    letter-spacing: -0.025em;
  }
  p {
    color: #2563eb;
    font-weight: 900;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-top: 0.25rem;
  }
`;

export const ContactList = styled.div`
  width: 100%;
  margin-top: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: #f8fafc;
  border-radius: 1rem;
  border: 1px solid transparent;
  transition: all 0.2s;
  
  &:hover {
    background-color: white;
    border-color: #f1f5f9;
  }
`;

export const ContactIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  background-color: white;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05);
  transition: color 0.2s;
  
  ${ContactItem}:hover & {
    color: #3b82f6;
  }
`;

export const ContactText = styled.div`
  text-align: left;
  p:first-child {
    font-size: 0.625rem;
    font-weight: 900;
    color: #cbd5e1;
    text-transform: uppercase;
    letter-spacing: -0.05em;
  }
  p:last-child {
    font-size: 0.875rem;
    font-weight: 700;
    color: #334155;
  }
`;

export const EditButton = styled.button`
  width: 100%;
  margin-top: 2rem;
  padding: 1rem;
  background-color: #1e293b;
  color: white;
  border-radius: 1rem;
  font-weight: 900;
  font-size: 0.875rem;
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
  transition: all 0.2s;
  
  &:hover {
    background-color: #0f172a;
  }
`;

export const StressGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  align-items: center;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 2fr;
  }
`;

export const StressCircle = styled.div`
  display: flex;
  flex-col: column;
  align-items: center;
  justify-content: center;
  border-right: 1px solid #f1f5f9;
`;

export const CircleContent = styled.div`
  width: 6rem;
  height: 6rem;
  background-color: #fff1f2; /* rose-50 */
  border-radius: 9999px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 4px solid white;
  box-shadow: inset 0 2px 4px 0 rgba(0,0,0,0.06);
  
  span:first-child {
    font-size: 1.875rem;
    font-weight: 900;
    color: #f43f5e;
  }
  span:last-child {
    font-size: 0.625rem;
    font-weight: 900;
    color: #fda4af;
    text-transform: uppercase;
  }
`;

export const StressLevelBadge = styled.p`
  margin-top: 1rem;
  font-size: 0.75rem; /* xs */
  font-weight: 900;
  color: #10b981; /* emerald-500 */
  background-color: #ecfdf5; /* emerald-50 */
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

export const StressDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  h3 {
    font-size: 1.25rem;
    font-weight: 900;
    color: #1e293b;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  p {
    font-size: 0.875rem;
    color: #64748b;
    font-weight: 500;
    line-height: 1.625;
  }
`;

export const TagGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const Tag = styled.span`
  padding: 0.25rem 0.75rem;
  background-color: #f1f5f9;
  color: #64748b;
  font-size: 0.625rem;
  font-weight: 900;
  border-radius: 0.5rem;
`;

export const SectionTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  
  h3 {
    font-size: 1.25rem;
    font-weight: 900;
    color: #1e293b;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  button {
    font-size: 0.75rem;
    font-weight: 900;
    color: #2563eb;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    
    &:hover svg {
      transform: translateX(0.25rem);
    }
  }
`;

export const SmallCouponGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const SmallCouponCard = styled.div`
  background-color: #f8fafc;
  border-radius: 1.5rem;
  padding: 1.5rem;
  border: 1px solid #f1f5f9;
  transition: all 0.2s;
  
  &:hover {
    border-color: #bfdbfe;
    transform: translateY(-2px);
  }
`;

export const SettingsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const SettingItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: #f8fafc;
  border-radius: 1rem;
  transition: all 0.2s;
  
  &:hover {
    background-color: #eff6ff;
  }
`;

export const SettingLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  & > div:first-child {
    color: #94a3b8;
  }
  
  ${SettingItem}:hover & > div:first-child {
    color: #2563eb;
  }
  
  & > div:last-child {
    text-align: left;
    
    p:first-child {
      font-size: 0.75rem; /* xs */
      font-weight: 900;
      color: #334155;
    }
    p:last-child {
      font-size: 0.625rem; /* 10px */
      font-weight: 700;
      color: #94a3b8;
    }
  }
`;

export const ToggleSwitch = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  cursor: pointer;
`;

export const ToggleBg = styled.div`
  width: 2.25rem;
  height: 1.25rem;
  background-color: #e2e8f0;
  border-radius: 9999px;
  transition: all 0.2s;
  
  input:checked + & {
    background-color: #2563eb;
  }
`;

export const ToggleDot = styled.div`
  position: absolute;
  top: 2px;
  left: 2px;
  width: 1rem;
  height: 1rem;
  background-color: white;
  border-radius: 9999px;
  transition: all 0.2s;
  
  input:checked + div > & {
    transform: translateX(100%);
  }
`;

export const PointCard = styled.div`
  padding: 1.5rem;
  background-color: #0f172a;
  border-radius: 1.5rem;
  color: white;
  text-align: right;
  
  p:first-child {
    font-size: 0.75rem;
    font-weight: 900;
    color: #cbd5e1; /* slate-300 for better visibility */
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 0.25rem;
  }
  p:nth-child(2) {
    font-size: 1.5rem;
    font-weight: 900;
    color: #fbbf24;
    span {
      font-size: 0.875rem;
      color: #94a3b8;
    }
  }
  
  button {
    margin-top: 2rem;
    padding: 0.5rem 1rem;
    background-color: rgba(255,255,255,0.1);
    color: white; /* Added explicit white color */
    border-radius: 0.75rem;
    font-size: 0.625rem;
    font-weight: 900;
    transition: all 0.2s;
    
    &:hover { background-color: rgba(255,255,255,0.2); }
  }
`;
