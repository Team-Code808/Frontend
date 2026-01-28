import React from 'react';
import * as S from './StressGauge.styles';

const StressGauge = ({ percentage }) => {
  const radius = 60;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getColor = (p) => {
    if (p > 70) return "#ef4444";
    if (p > 40) return "#f97316";
    return "#3b82f6";
  };

  return (
    <S.GaugeContainer>
      <S.SVG
        height={radius * 2}
        width={radius * 2}
      >
        <circle
          stroke="#f1f5f9"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke={getColor(percentage)}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
      </S.SVG>
      <S.TextContainer>
        <S.Percentage>{percentage}%</S.Percentage>
        <S.Label>Stress</S.Label>
      </S.TextContainer>
    </S.GaugeContainer>
  );
};

export default StressGauge;
