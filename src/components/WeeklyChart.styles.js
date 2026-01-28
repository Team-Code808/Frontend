import styled from 'styled-components';

export const ChartContainer = styled.div`
  width: 100%;
  height: 100%;
  
  /* Recharts 스타일 오버라이딩 (필요시 여기서 커스텀 스타일 적용) */
  .recharts-cartesian-grid-horizontal line,
  .recharts-cartesian-grid-vertical line {
    stroke: #f1f5f9;
  }
`;
