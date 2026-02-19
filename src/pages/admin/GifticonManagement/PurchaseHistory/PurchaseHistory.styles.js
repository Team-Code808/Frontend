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


export const Pagination = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    padding: 18px 0;
    border-top: 1px solid #494444;
`;

export const PageButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 8px;
    border: 1px solid #ddd;
    background-color: white;
    color: #666;
    cursor: pointer;
    transition: all 0.2s;

    &:hover:not(:disabled) {
        background-color: #f8f9fa;
        border-color: #bbb;
    }

    &:disabled {
        opacity: 0.3;
        cursor: not-allowed;
    }
`;

export const PageNumber = styled.span`
    font-size: 14px;
    color: #666;
    strong {
        color: #009688; /* 포인트 컬러 */
        font-weight: 600;
    }
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
    position: relative; /* 중요: 오버레이의 기준점 */
    width: 100%;
    min-height: 480px;  /* 페이지 이동 시 높이 덜컹거림 방지 */
    background: rgba(2, 2, 27, 0.6);;
    border-radius: 12px;
    border: 2px solid #1f1e1e;
    display: flex;     /* Flexbox 활성화 */
    flex-direction: column;
`;

export const LoadingOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(12, 10, 10, 0.6); /* 배경 살짝 흐리게 */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    backdrop-filter: blur(2px); /* 현대적인 블러 효과 */
`;

// 간단한 스피너 애니메이션 (선택 사항)
export const Spinner = styled.div`
    width: 30px;
    height: 30px;
    border: 3px solid #423f3f;
    border-top: 3px solid #009688;
    border-radius: 50%;
    animation: spin 1s linear infinite;

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

export const EmptyState = styled.div`
  /* flex: 1을 추가하여 TableContainer의 전체 높이를 차지하게 합니다. */
  flex: 1; 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* 세로 중앙 정렬 */
  padding: 2rem;
  color: #94a3b8;
  gap: 1rem;

  svg {
    opacity: 0.5;
    /* 아이콘이 너무 작아 보이면 크기를 고정하거나 키울 수 있습니다. */
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
