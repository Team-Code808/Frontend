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

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

export const Container = styled.div`
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  animation: ${slideInBottom} 0.5s ease-out;
`;

export const BannerSection = styled.section`
  padding: 2.5rem;
  border-radius: 2.5rem;
  color: white;
  position: relative;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  transition: all 0.5s;
  
  ${props => props.$tab === 'SHOP'
    ? 'background-color: #f59e0b; box-shadow: 0 20px 25px -5px rgba(254, 243, 199, 0.5);' /* amber-500 */
    : 'background-color: #4f46e5; box-shadow: 0 20px 25px -5px rgba(224, 231, 255, 0.5);' /* indigo-600 */
  }
`;

export const BannerContent = styled.div`
  position: relative;
  z-index: 10;
  
  h1 {
    font-size: 2.25rem; /* 4xl */
    font-weight: 900;
    letter-spacing: -0.025em;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: rgba(255, 255, 255, 0.8);
    font-weight: 500;
  }
`;

export const PointBadge = styled.div`
  margin-top: 2rem;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(12px);
  padding: 0.75rem 1.5rem;
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  
  span {
    font-size: 1.125rem; /* lg */
    font-weight: 700;
  }
  
  strong {
    color: white;
    text-decoration: underline;
    text-decoration-thickness: 2px;
    text-underline-offset: 4px;
  }
`;

export const BackgroundIcon = styled.div`
  position: absolute;
  top: -2.5rem;
  right: -2.5rem;
  width: 16rem;
  height: 16rem;
  color: white;
  opacity: 0.1;
  transform: rotate(12deg);
  transition: all 0.7s;
  
  svg {
    width: 100%;
    height: 100%;
  }
`;

export const TabContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const TabGroup = styled.div`
  background-color: #f1f5f9; /* slate-100 */
  padding: 0.375rem;
  border-radius: 1rem;
  display: flex;
  gap: 0.25rem;
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
`;

export const TabButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 2rem;
  border-radius: 0.75rem;
  font-size: 0.875rem; /* sm */
  font-weight: 900;
  transition: all 0.2s;
  
  ${props => props.$active
    ? 'background-color: white; shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);'
    : 'color: #94a3b8; &:hover { color: #475569; }'
  }
  
  ${props => props.$active && props.$mode === 'SHOP' && 'color: #d97706;'} /* amber-600 */
  ${props => props.$active && props.$mode === 'MISSIONS' && 'color: #4f46e5;'} /* indigo-600 */
`;

/* Shop Section */
export const ShopContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  animation: ${fadeIn} 0.5s ease-out;
`;

export const ShopHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  h2 {
    font-size: 1.25rem; /* xl */
    font-weight: 700;
    color: #1e293b; /* slate-800 */
  }
`;

export const SearchBar = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const SearchInputWrapper = styled.div`
  position: relative;
  
  svg {
    position: absolute;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    width: 1rem;
    height: 1rem;
    color: #94a3b8;
  }
  
  input {
    padding: 0.5rem 1rem 0.5rem 2.25rem;
    background-color: white;
    border: 1px solid #e2e8f0;
    border-radius: 0.75rem;
    font-size: 0.75rem; /* xs */
    outline: none;
    transition: all 0.2s;
    
    &:focus { border-color: #f59e0b; }
  }
`;

export const FilterBtn = styled.button`
  padding: 0.5rem;
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  color: #94a3b8;
  transition: all 0.2s;
  
  &:hover { color: #f59e0b; }
`;

export const ItemsGrid = styled.div`
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

export const ItemCard = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: 1.5rem;
  border: 1px solid #f1f5f9; /* slate-100 */
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
  cursor: pointer;
  
  &:hover {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    transform: translateY(-0.25rem);
    
    /* Image scale */
    > div:first-child { transform: scale(1.1); }
    
    /* Button style */
    button {
      background-color: #f59e0b;
      color: white;
    }
  }
`;

export const ItemImage = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  background-color: #f8fafc; /* slate-50 */
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem; /* 5xl */
  margin-bottom: 1rem;
  transition: transform 0.3s;
`;

export const ItemInfo = styled.div`
  h3 {
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 0.25rem;
  }
  
  p {
    color: #d97706; /* amber-600 */
    font-weight: 900;
    font-size: 1.125rem; /* lg */
    
    span {
      font-size: 0.75rem; /* xs */
      color: #94a3b8;
      font-weight: 700;
    }
  }
`;

export const QuantityInfo = styled.p`
  margin-top: 0.5rem;
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 500;
  
  span {
    color: #3b82f6;
    font-weight: 700;
  }
`;

export const ExchangeButton = styled.button`
  width: 100%;
  margin-top: 1rem;
  padding: 0.625rem;
  background-color: ${props => props.disabled ? '#f1f5f9' : '#f8fafc'};
  color: ${props => props.disabled ? '#cbd5e1' : '#94a3b8'};
  border-radius: 0.75rem;
  font-size: 0.75rem; /* xs */
  font-weight: 900;
  transition: all 0.2s;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  
  &:hover:not(:disabled) {
    background-color: #f59e0b;
    color: white;
  }
`;

/* Missions Section */
export const MissionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  animation: ${fadeIn} 0.5s ease-out;
`;

export const MissionGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const MissionCard = styled.div`
  background-color: white;
  border-radius: 2.5rem;
  border: 1px solid #f1f5f9;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 280px;

  &:hover {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    transform: translateY(-0.25rem);
    border-color: #e0e7ff; /* indigo-100 */
    
    /* Icon scale */
    div:first-child > div:first-child > div {
      transform: scale(1.1);
    }
  }
`;

export const CardTop = styled.div`
  margin-bottom: 1.5rem;
`;

export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

export const IconBox = styled.div`
  padding: 0.75rem;
  background-color: #f8fafc;
  border-radius: 1rem;
  transition: transform 0.2s;
  
  svg {
    width: 1.25rem;
    height: 1.25rem;
  }
  
  .animate-pulse { animation: ${pulse} 2s infinite; }
`;

export const StatusPill = styled.span`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.625rem; /* 10px */
  font-weight: 900;
  text-transform: uppercase;
  
  ${props => props.$status === '완료'
    ? 'background-color: #dcfce7; color: #16a34a;' /* green-100 green-600 */
    : 'background-color: #f1f5f9; color: #94a3b8;' /* slate-100 slate-400 */
  }
`;

export const MissionInfo = styled.div`
  h3 {
    font-size: 1.125rem; /* lg */
    font-weight: 900;
    color: #1e293b;
    margin-bottom: 0.25rem;
  }
  
  p {
    font-size: 0.75rem; /* xs */
    color: #94a3b8;
    font-weight: 500;
    line-height: 1.625;
  }
`;

export const CardBottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ProgressRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  
  p:first-child {
    font-size: 1.25rem; /* xl */
    font-weight: 900;
    color: #4f46e5;
  }
  
  p:last-child {
    font-size: 0.625rem; /* 10px */
    font-weight: 700;
    color: #94a3b8;
  }
`;

export const ProgressBarBg = styled.div`
  width: 100%;
  height: 0.5rem;
  background-color: #f8fafc;
  border-radius: 9999px;
  overflow: hidden;
`;

export const ProgressBarFill = styled.div`
  height: 100%;
  transition: width 1s ease-out;
  width: ${props => props.$width}%;
  background-color: ${props => props.$complete ? '#22c55e' : '#6366f1'}; /* green-500 : indigo-500 */
`;

export const ActionBtn = styled.button`
  width: 100%;
  padding: 0.625rem;
  border-radius: 0.75rem;
  font-size: 0.75rem;
  font-weight: 900;
  transition: all 0.2s;
  cursor: pointer;

  /* 1. 이미 보상을 받은 경우 (회색) */
  ${props => props.$complete && `
    background-color: #f1f5f9;
    color: #94a3b8;
    cursor: not-allowed;
  `}

  /* 2. 아직 미션 진행 중인 경우 (연한 파란색 또는 테두리만) */
  ${props => !props.$complete && !props.$canClick && `
    background-color: #e0e7ff; /* 연한 보라/파랑 */
    color: #a5b4fc;
    cursor: not-allowed;
  `}

  /* 3. 미션 완료! 보상 받을 수 있는 상태 (진한 파란색 + 호버) */
  ${props => !props.$complete && props.$canClick && `
    background-color: #4f46e5;
    color: white;
    box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.2);
    &:hover {
      background-color: #4338ca;
      transform: translateY(-1px);
    }
    &:active {
      transform: translateY(0);
    }
  `}
`;

const zoomIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
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

export const PurchaseInfo = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  background-color: #f8fafc;
  padding: 1rem;
  border-radius: 1rem;
  
  .img-placeholder {
    width: 4rem;
    height: 4rem;
    border-radius: 0.75rem;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  }
  
  div:last-child {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    
    h4 {
        font-weight: 700;
        color: #1e293b;
    }
    
    p {
        font-size: 0.875rem;
        color: #64748b;
        font-weight: 500;
    }
  }
`;

export const ConfirmButton = styled.button`
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


