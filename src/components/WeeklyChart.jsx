import React from 'react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';
import * as S from './WeeklyChart.styles';



const WeeklyChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#cbd5e1' }}>데이터가 없습니다</div>;
  }
  return (
    <S.ChartContainer>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 30 }}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#64748b', fontSize: 13, fontWeight: 600 }}
            dy={15}
            interval={0}
            padding={{ left: 10, right: 10 }}
          />
          <YAxis
            hide
            domain={[0, 100]}
          />
          <Tooltip
            contentStyle={{
              borderRadius: '16px',
              border: 'none',
              boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
              padding: '12px 16px',
              backgroundColor: 'white'
            }}
            itemStyle={{ color: '#3b82f6', fontWeight: 700 }}
            labelStyle={{ color: '#64748b', marginBottom: '4px' }}
            cursor={{ stroke: '#3b82f6', strokeWidth: 1, strokeDasharray: '4 4' }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#3b82f6"
            strokeWidth={4}
            fillOpacity={1}
            fill="url(#colorValue)"
            animationDuration={2000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </S.ChartContainer>
  );
};

export default WeeklyChart;
