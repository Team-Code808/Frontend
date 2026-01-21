import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f8fafc;
  padding: 2rem;
  text-align: center;
`;

export const IconWrapper = styled.div`
  margin-bottom: 2rem;
  color: #3b82f6;
  
  svg {
    width: 120px;
    height: 120px;
    opacity: 0.8;
  }
`;

export const Title = styled.h1`
  font-size: 6rem;
  font-weight: 800;
  line-height: 1;
  color: #1e293b;
  margin: 0;
  
  span {
    color: #3b82f6;
  }
`;

export const SubTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #334155;
  margin: 1rem 0;
`;

export const Description = styled.p`
  font-size: 1.1rem;
  color: #64748b;
  max-width: 500px;
  margin-bottom: 3rem;
  line-height: 1.6;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.2s;
  cursor: pointer;

  ${props => props.$primary ? `
    background-color: #3b82f6;
    color: white;
    border: none;
    box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.2);

    &:hover {
      background-color: #2563eb;
      transform: translateY(-2px);
      box-shadow: 0 6px 10px -1px rgba(59, 130, 246, 0.3);
    }
  ` : `
    background-color: white;
    color: #475569;
    border: 1px solid #e2e8f0;

    &:hover {
      background-color: #f8fafc;
      border-color: #cbd5e1;
      transform: translateY(-2px);
    }
  `}
`;
