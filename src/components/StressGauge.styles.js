import styled from 'styled-components';

export const GaugeContainer = styled.div`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

export const SVG = styled.svg`
  transform: rotate(-90deg);
  
  circle {
    transition: all 1s ease-out;
  }
`;

export const TextContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Percentage = styled.span`
  font-size: 1.5rem; /* 2xl */
  font-weight: 900;
  color: #1e293b; /* slate-800 */
  letter-spacing: -0.025em;
`;

export const Label = styled.span`
  font-size: 0.625rem; /* 10px */
  color: #94a3b8; /* slate-400 */
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 700;
`;
