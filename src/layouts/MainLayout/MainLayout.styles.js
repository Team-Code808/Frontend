import styled from 'styled-components';

export const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  transition: background-color 0.5s;
  
  ${props => props.$admin
    ? 'background-color: #020617;'
    : 'background-color: #f8fafc;'
  }
`;

export const MainContent = styled.main`
  flex: 1;
  width: 100%;
  max-width: 80rem;
  margin: 0 auto;
  padding: 2rem 1rem;
  
  @media (min-width: 768px) {
    padding: 2rem;
  }
`;

export const Footer = styled.footer`
  padding: 2rem 0;
  margin-top: auto;
  transition: all 0.5s;
  
  ${props => props.$admin
    ? 'background-color: #0f172a; border-top: 1px solid #1e293b;'
    : 'background-color: white; border-top: 1px solid #e2e8f0;'
  }
`;

export const FooterContent = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 1rem;
  text-align: center;
  
  p {
    color: #64748b;
    font-size: 0.875rem;
    font-weight: 500;
  }
`;
