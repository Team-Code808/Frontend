import styled, { keyframes, css } from 'styled-components';

// Animations
const slideInBottom = keyframes`
  from { opacity: 0; transform: translateY(1rem); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  animation: ${slideInBottom} 0.7s ease-out;
`;

/* Header Section */
export const HeaderSection = styled.section`
  background-color: white;
  padding: 2rem;
  border-radius: 1.5rem;
  border: 1px solid #f1f5f9;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
`;

export const HeaderContent = styled.div`
  position: relative;
  z-index: 10;
`;

export const BadgeGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
`;

export const Badge = styled.span`
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: 9999px;

  ${props => props.type === 'primary'
    ? 'background-color: #eff6ff; color: #2563eb;'
    : 'background-color: #f8fafc; color: #64748b;'}
`;

export const Title = styled.h1`
  font-size: 1.875rem; /* 3xl */
  font-weight: 700;
  color: #1e293b;
  letter-spacing: -0.025em;
`;

export const Description = styled.p`
  color: #64748b;
  margin-top: 0.5rem;
  max-width: 42rem;
  line-height: 1.625;
`;

export const StatsGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-top: 2rem;
`;

export const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const StatIconBox = styled.div`
  width: 3rem;
  height: 3rem;
  background-color: #eff6ff;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3b82f6;
`;

export const StatInfo = styled.div`
  p:first-child {
    font-size: 0.625rem;
    color: #94a3b8;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  p:last-child {
    font-size: 1.25rem;
    font-weight: 900;
    color: #1e293b;
  }
`;

export const BgDecoration = styled.div`
  position: absolute;
  top: -3rem;
  right: -3rem;
  width: 20rem;
  height: 20rem;
  color: #eff6ff;
  opacity: 0.2;
  transform: rotate(12deg);
  pointer-events: none;
`;

/* Team List Section */
export const TeamSection = styled.section``;

export const FilterHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  padding: 0 1rem;
`;

export const FilterTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  span {
    font-size: 0.75rem;
    font-weight: 500;
    color: #3b82f6;
    background-color: #eff6ff;
    padding: 0.125rem 0.5rem;
    border-radius: 9999px;
  }
`;

export const Controls = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const DropdownWrapper = styled.div`
  position: relative;
  min-width: 140px;
`;

export const DropdownTrigger = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.625rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  background-color: white;
  border: 1px solid #e2e8f0;
  color: #334155;
  border-radius: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

  &:hover {
    border-color: #cbd5e1;
    background-color: #f8fafc;
  }

  ${props => props.$isOpen && `
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
  `}
`;

export const DropdownMenu = styled.ul`
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  width: 100%;
  background-color: white;
  border: 1px solid #f1f5f9;
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  z-index: 50;
  animation: ${key => keyframes`
    from { opacity: 0; transform: translateY(-0.5rem); }
    to { opacity: 1; transform: translateY(0); }
  `} 0.2s ease-out;
`;

export const DropdownItem = styled.li`
  padding: 0.625rem 1rem;
  font-size: 0.875rem;
  color: #475569;
  cursor: pointer;
  transition: all 0.15s;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    background-color: #f8fafc;
    color: #3b82f6;
  }

  ${props => props.$isSelected && `
    background-color: #eff6ff;
    color: #3b82f6;
    font-weight: 600;
  `}
`;

export const ExcelButton = styled.button`
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 700;
  background-color: #2563eb;
  color: white;
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(219, 234, 254, 1);
  transition: all 0.2s;

  &:hover { background-color: #1d4ed8; }
`;

export const MemberList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const MemberCard = styled.div`
  background-color: white;
  padding: 1rem;
  border-radius: 1rem;
  border: 1px solid #f1f5f9;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    border-color: #dbeafe;
    
    /* Target nested Avatar */
    > div > div:first-child {
      transform: scale(1.05);
    }
  }
`;

export const CardInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    gap: 1.5rem;
  }
`;

export const Avatar = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  background-color: #f8fafc;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
  transition: transform 0.2s;
`;

export const MemberInfo = styled.div`
  flex: 1;
  text-align: center;
  min-width: 150px;
  
  @media (min-width: 768px) {
    text-align: left;
  }
`;

export const NameRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 0.25rem;
  
  @media (min-width: 768px) {
    justify-content: flex-start;
  }

  h3 {
    font-size: 1.125rem;
    font-weight: 700;
    color: #1e293b;
    letter-spacing: -0.025em;
  }
`;

export const StatusPill = styled.span`
  font-size: 0.625rem;
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
  font-weight: 700;
  
  ${props => props.$status === '업무 중' && 'background-color: #f0fdf4; color: #16a34a;'}
  ${props => props.$status === '자리 비움' && 'background-color: #fff7ed; color: #ea580c;'}
  ${props => props.$status === '쿨다운' && 'background-color: #eff6ff; color: #3b82f6;'}
  ${props => props.$status === '출근 전' && 'background-color: #f1f5f9; color: #64748b;'}
  ${props => props.$status === '퇴근' && 'background-color: #fca5a5; color: #7f1d1d;'}
  ${props => props.$status === '휴가 중' && 'background-color: #e2e8f0; color: #475569;'}
`;

export const RoleText = styled.p`
  font-size: 0.75rem;
  color: #94a3b8;
  font-weight: 700;
`;

export const ContactInfo = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 2rem;
    
    > div {
      flex: 1;
    }
  }
`;

export const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  
  /* Icon Circle */
  > div:first-child {
    width: 2rem;
    height: 2rem;
    border-radius: 9999px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    ${props => props.type === 'email' && 'background-color: #f8fafc; color: #94a3b8;'}
    ${props => props.type === 'phone' && 'background-color: #eff6ff; color: #3b82f6;'}
  }
  
  /* Text Content */
  > div:nth-child(2) {
    text-align: left;
  }
`;

export const EmailText = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  color: #475569;
`;

export const PhoneLabel = styled.span`
  display: block;
  font-size: 0.625rem;
  color: #94a3b8;
  font-weight: 700;
  text-transform: uppercase;
  line-height: 1;
  margin-bottom: 0.125rem;
`;

export const PhoneText = styled.span`
  font-weight: 900;
  color: #2563eb;
  letter-spacing: 0.05em;
`;



export const EmptyState = styled.div`
  text-align: center;
  padding: 2.5rem;
  color: #94a3b8;
  font-size: 0.875rem;
  font-weight: 500;
`;




