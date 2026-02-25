import styled, { keyframes } from "styled-components";

const slideIn = keyframes`
  from { opacity: 0; transform: translateY(0.5rem); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Container = styled.div`
  max-width: 64rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  animation: ${slideIn} 0.3s ease-out;
`;

export const Header = styled.div`
  h1 {
    font-size: 1.875rem;
    font-weight: 800;
    color: #1e293b;
    margin-bottom: 0.25rem;
  }
  p {
    font-size: 1rem;
    color: #64748b;
  }
`;

export const CallLink = styled.button`
  margin-top: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: #4f46e5;
  background: transparent;
  border: 1px solid #4f46e5;
  border-radius: 0.5rem;
  cursor: pointer;
  &:hover {
    background: #eef2ff;
  }
`;

export const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
`;

export const SelectScope = styled.select`
  padding: 0.5rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background: white;
  cursor: pointer;
`;

export const SearchForm = styled.form`
  display: flex;
  gap: 0.5rem;
  margin-left: auto;
`;

export const SearchInput = styled.input`
  padding: 0.5rem 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  min-width: 12rem;
`;

export const SearchButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 1rem;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  cursor: pointer;
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const Card = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 1rem;
  border: 1px solid #f1f5f9;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  h3 {
    font-size: 1rem;
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

export const SearchResultCard = styled(Card)`
  margin-bottom: 0.5rem;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;

  th,
  td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid #f1f5f9;
  }
  th {
    font-weight: 600;
    color: #64748b;
    background: #f8fafc;
  }
  tr:hover td {
    background: #f8fafc;
  }
`;

export const ProfanityCount = styled.span`
  font-weight: 700;
  color: ${(p) => (p.$warn ? "#dc2626" : "#16a34a")};
`;

export const Loading = styled.p`
  padding: 2rem;
  text-align: center;
  color: #64748b;
`;

export const Empty = styled.p`
  padding: 2rem;
  text-align: center;
  color: #94a3b8;
`;

export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 1rem;
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
