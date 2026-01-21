import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(1rem); }
  to { opacity: 1; transform: translateY(0); }
`;

export const PlaceholderContainer = styled.div`
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  animation: ${slideUp} 0.5s ease-out;
`;

export const PlaceholderIconBox = styled.div`
  width: 6rem;
  height: 6rem;
  border-radius: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
  
  ${props => props.$mode === 'admin'
    ? 'background-color: rgba(255, 255, 255, 0.05); border: 1px solid rgba(255, 255, 255, 0.1);'
    : 'background-color: #eef2ff; border: 1px solid #e0e7ff;'
  }
  
  svg {
    width: 3rem;
    height: 3rem;
    color: ${props => props.$mode === 'admin' ? '#818cf8' : '#6366f1'}; // indigo-400 : indigo-500
  }
`;

export const PlaceholderText = styled.div`
  text-align: center;
  max-width: 24rem;
  
  h2 {
    font-size: 1.5rem; /* 2xl */
    font-weight: 900;
    margin-bottom: 0.5rem;
    color: ${props => props.$mode === 'admin' ? '#e2e8f0' : '#1e293b'}; // slate-200 : slate-800
  }
  
  p {
    font-weight: 500;
    line-height: 1.625;
    color: #64748b; /* slate-500 */
  }
`;

export const Badge = styled.div`
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.625rem; /* 10px */
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  
  background-color: rgba(99, 102, 241, 0.1); /* indigo-500/10 */
  color: #818cf8; /* indigo-400 */
  border: 1px solid rgba(99, 102, 241, 0.2);
`;
