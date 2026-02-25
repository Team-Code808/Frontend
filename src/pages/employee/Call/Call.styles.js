import styled, { keyframes } from "styled-components";

const slideIn = keyframes`
  from { opacity: 0; transform: translateY(0.5rem); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Container = styled.div`
  max-width: 36rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  animation: ${slideIn} 0.3s ease-out;
`;

export const Header = styled.div`
  h1 {
    font-size: 1.5rem;
    font-weight: 800;
    color: #1e293b;
    margin-bottom: 0.25rem;
  }
  p {
    font-size: 0.875rem;
    color: #64748b;
  }
`;

export const Error = styled.div`
  padding: 0.75rem 1rem;
  background: #fef2f2;
  color: #dc2626;
  border-radius: 0.5rem;
  font-size: 0.875rem;
`;

export const Card = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 1rem;
  border: 1px solid #f1f5f9;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 1rem;

  p {
    margin: 0;
    font-size: 0.875rem;
    color: #64748b;
  }
`;

export const BigButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 0.75rem;
  border: none;
  cursor: pointer;
  background: ${(p) => (p.$danger ? "#dc2626" : "#4f46e5")};
  color: white;
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const SmallButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  border-radius: 0.5rem;
  border: 1px solid #e2e8f0;
  background: white;
  cursor: pointer;
`;

export const LinkRow = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const LinkInput = styled.input`
  flex: 1;
  padding: 0.5rem 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 0.875rem;
`;

export const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${(p) => (p.$connected ? "#dcfce7" : "#fef3c7")};
  color: ${(p) => (p.$connected ? "#16a34a" : "#b45309")};
`;

export const Hint = styled.p`
  margin-top: 1rem;
  font-size: 0.75rem;
  color: #94a3b8;
`;
