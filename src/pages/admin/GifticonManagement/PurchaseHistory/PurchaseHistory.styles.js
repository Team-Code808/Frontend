import styled from 'styled-components';

export const Container = styled.div`
  padding: 2rem;
  color: #f8fafc;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(30, 41, 59, 0.7);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 8px;
  color: #f8fafc;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  width: fit-content;

  &:hover {
    background: rgba(30, 41, 59, 0.9);
    border-color: rgba(148, 163, 184, 0.4);
  }
`;

export const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: 700;
  color: #f8fafc;
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const Filters = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
`;

export const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 250px;

  svg {
    position: absolute;
    left: 0.75rem;
    color: #94a3b8;
    pointer-events: none;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  background: rgba(30, 41, 59, 0.7);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 8px;
  color: #f8fafc;
  font-size: 0.875rem;
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-color: #4f46e5;
    background: rgba(30, 41, 59, 0.9);
  }

  &::placeholder {
    color: #64748b;
  }
`;

export const DateWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  svg {
    position: absolute;
    left: 0.75rem;
    color: #94a3b8;
    pointer-events: none;
    z-index: 1;
  }
`;

export const DateInput = styled.input`
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  background: rgba(30, 41, 59, 0.7);
  border: 1px solid rgba(148, 163, 184, 0.2);
  border-radius: 8px;
  color: #f8fafc;
  font-size: 0.875rem;
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-color: #4f46e5;
    background: rgba(30, 41, 59, 0.9);
  }

  &::-webkit-calendar-picker-indicator {
    filter: invert(1);
    cursor: pointer;
  }
`;

export const TableContainer = styled.div`
  background: rgba(30, 41, 59, 0.7);
  border: 1px solid rgba(148, 163, 184, 0.1);
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 1.5rem;
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  color: #94a3b8;
  gap: 1rem;

  svg {
    opacity: 0.5;
  }

  p {
    font-size: 1rem;
    font-weight: 500;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHead = styled.thead`
  background: rgba(15, 23, 42, 0.8);
`;

export const TableHeader = styled.th`
  padding: 1rem;
  text-align: left;
  font-size: 0.875rem;
  font-weight: 600;
  color: #cbd5e1;
  border-bottom: 1px solid rgba(148, 163, 184, 0.1);
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  border-bottom: 1px solid rgba(148, 163, 184, 0.1);
  transition: background 0.2s;

  &:hover {
    background: rgba(15, 23, 42, 0.5);
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const TableCell = styled.td`
  padding: 1rem;
  font-size: 0.875rem;
  color: #f8fafc;
`;

export const DateCell = styled.div`
  color: #cbd5e1;
  font-weight: 500;
`;

export const UserCell = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #f8fafc;
  font-weight: 500;

  svg {
    color: #94a3b8;
  }
`;

export const ItemCell = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #f8fafc;
  font-weight: 500;
`;

export const ItemIcon = styled.span`
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  background: rgba(15, 23, 42, 0.5);
  border-radius: 8px;
`;

export const PriceCell = styled.div`
  color: #fbbf24;
  font-weight: 600;
`;

export const Summary = styled.div`
  text-align: center;
  color: #94a3b8;
  font-size: 0.875rem;
  padding: 1rem;

  strong {
    color: #f8fafc;
    font-weight: 600;
  }
`;
