import styled from 'styled-components';

export const Container = styled.div`
  padding: 2rem;
  color: #f8fafc;
`;

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

export const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  color: #f8fafc;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const BulkButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  background: ${props => {
    if (props.variant === 'activate') return 'rgba(34, 197, 94, 0.1)';
    if (props.variant === 'deactivate') return 'rgba(239, 68, 68, 0.1)';
    return 'rgba(79, 70, 229, 0.1)';
  }};
  color: ${props => {
    if (props.variant === 'activate') return '#22c55e';
    if (props.variant === 'deactivate') return '#ef4444';
    return '#6366f1';
  }};
  border: 1px solid ${props => {
    if (props.variant === 'activate') return 'rgba(34, 197, 94, 0.3)';
    if (props.variant === 'deactivate') return 'rgba(239, 68, 68, 0.3)';
    return 'rgba(79, 70, 229, 0.3)';
  }};
  border-radius: 8px;
  font-weight: 500;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: ${props => {
      if (props.variant === 'activate') return 'rgba(34, 197, 94, 0.15)';
      if (props.variant === 'deactivate') return 'rgba(239, 68, 68, 0.15)';
      return 'rgba(79, 70, 229, 0.15)';
    }};
    border-color: ${props => {
      if (props.variant === 'activate') return 'rgba(34, 197, 94, 0.5)';
      if (props.variant === 'deactivate') return 'rgba(239, 68, 68, 0.5)';
      return 'rgba(79, 70, 229, 0.5)';
    }};
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`;

export const ItemCard = styled.div`
  background: rgba(30, 41, 59, 0.7);
  border: 1px solid rgba(148, 163, 184, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  transition: all 0.2s;
  overflow: hidden;

  /* Inactive styling override */
  ${props => !props.active && `
    border-color: rgba(148, 163, 184, 0.2);
    background: rgba(15, 23, 42, 0.8);
    opacity: 0.8;
  `}
`;

export const ItemImage = styled.div`
  width: 100%;
  height: 160px;
  background: rgba(15, 23, 42, 0.5);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  margin-bottom: 0.5rem;
  
  ${props => !props.active && `
    filter: grayscale(100%);
    opacity: 0.5;
  `}
`;

export const ItemInfo = styled.div`
  flex: 1;
`;

export const ItemName = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #f8fafc;
  margin-bottom: 0.25rem;
`;

export const ItemPrice = styled.p`
  color: #94a3b8;
  font-size: 0.95rem;

  span {
    color: #fbbf24;
    font-weight: 600;
  }
`;

export const QuantityRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-top: 1px solid rgba(148, 163, 184, 0.1);
`;

export const QuantityLabel = styled.span`
  font-size: 0.875rem;
  color: #94a3b8;
  font-weight: 500;
`;

export const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(15, 23, 42, 0.5);
  border-radius: 8px;
  padding: 0.25rem;
`;

export const QuantityButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: rgba(30, 41, 59, 0.8);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 6px;
  color: #f8fafc;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: rgba(51, 65, 85, 0.9);
    border-color: rgba(148, 163, 184, 0.4);
  }

  &:active:not(:disabled) {
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

export const QuantityValue = styled.span`
  min-width: 40px;
  text-align: center;
  font-size: 0.875rem;
  font-weight: 600;
  color: #f8fafc;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: background 0.2s;
  
  &:hover {
    background: rgba(30, 41, 59, 0.5);
  }
`;

export const QuantityInput = styled.input`
  width: 60px;
  text-align: center;
  font-size: 0.875rem;
  font-weight: 600;
  color: #f8fafc;
  background: rgba(30, 41, 59, 0.9);
  border: 1px solid rgba(148, 163, 184, 0.4);
  border-radius: 4px;
  padding: 0.25rem;
  outline: none;
  
  &:focus {
    border-color: #4f46e5;
    background: rgba(30, 41, 59, 1);
  }
  
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  &[type=number] {
    -moz-appearance: textfield;
  }
`;

export const StatusRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.75rem;
  border-top: 1px solid rgba(148, 163, 184, 0.1);
`;

export const StatusBadge = styled.span`
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  background: ${props => props.active ? 'rgba(34, 197, 94, 0.1)' : 'rgba(148, 163, 184, 0.1)'};
  color: ${props => props.active ? '#4ade80' : '#94a3b8'};
`;

export const ToggleButton = styled.button`
  position: relative;
  width: 48px;
  height: 24px;
  background: ${props => props.active ? '#4f46e5' : '#334155'};
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  transition: background 0.2s;

  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${props => props.active ? '26px' : '2px'};
    width: 20px;
    height: 20px;
    background: white;
    border-radius: 50%;
    transition: left 0.2s;
  }
`;
