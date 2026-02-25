import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const PageHeader = styled.div`
  h2 {
    font-size: 1.875rem;
    font-weight: 900;
    color: white;
    letter-spacing: -0.025em;
  }
  p {
    color: #94a3b8;
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }
`;

export const Card = styled.div`
  background-color: #1e293b;
  border: 1px solid rgba(51, 65, 85, 0.5);
  padding: 1.5rem;
  border-radius: 1rem;
`;

export const SectionTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: #e2e8f0;
  margin-bottom: 1rem;
`;

export const UploadZone = styled.label`
  display: block;
  border: 2px dashed #475569;
  border-radius: 1rem;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  background: #0f172a;
  transition: border-color 0.2s;
  &:hover {
    border-color: #6366f1;
  }
  input {
    display: none;
  }
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const InputGroup = styled.div`
  label {
    display: block;
    font-size: 0.75rem;
    font-weight: 600;
    color: #94a3b8;
    margin-bottom: 0.375rem;
  }
  input, select {
    width: 100%;
    padding: 0.5rem 0.75rem;
    border-radius: 0.5rem;
    border: 1px solid #334155;
    background: #0f172a;
    color: #e2e8f0;
    font-size: 0.875rem;
  }
  input:focus, select:focus {
    outline: none;
    border-color: #6366f1;
  }
`;

export const FullWidth = styled.div`
  grid-column: 1 / -1;
`;

export const RegisterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;

export const PrimaryButton = styled.button`
  padding: 0.625rem 1.25rem;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 700;
  cursor: pointer;
  &:hover {
    background: #4338ca;
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const TableWrap = styled.div`
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
  th, td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid #334155;
  }
  th {
    color: #94a3b8;
    font-weight: 600;
  }
  td {
    color: #e2e8f0;
  }
`;

export const Badge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  font-size: 0.75rem;
  font-weight: 600;
  background: ${(p) => (p.$variant === 'EMPLOYEE' ? '#334155' : p.$variant === 'PARTNER' ? '#1e3a5f' : '#374151')};
  color: #cbd5e1;
`;

export const ErrorBox = styled.div`
  padding: 0.75rem;
  background: #450a0a;
  border: 1px solid #b91c1c;
  border-radius: 0.5rem;
  color: #fecaca;
  font-size: 0.875rem;
`;
