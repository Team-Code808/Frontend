import React, { useEffect, useState } from 'react';
import {
  Users,
  HeartPulse,
  AlertTriangle,
  MessageSquare,
  TrendingUp,
  BarChart3,
  PieChart as PieIcon,
  ChevronDown,
  Info,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Zap
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import * as S from './Monitoring.styles';
import { fetchMonitoringData } from '../../../api/admin';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const { name, value, color, fill } = payload[0].payload;
    const finalColor = color || fill || payload[0].fill;

    return (
      <div style={{
        backgroundColor: '#0f172a',
        border: '1px solid #334155',
        borderRadius: '12px',
        padding: '12px 16px',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)',
        minWidth: '150px',
        zIndex: 1000
      }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: finalColor, marginRight: '8px' }} />
          <span style={{ color: '#f1f5f9', fontWeight: 'bold', fontSize: '14px' }}>{name}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#94a3b8', fontSize: '13px' }}>인원</span>
          <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '16px' }}>{value}명</span>
        </div>
      </div>
    );
  }
  return null;
};

const AdminMonitoring = () => {
  const [isPeriodOpen, setIsPeriodOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('2026년 1분기');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    stats: {
      totalEmployees: '0명',
      avgStress: '0%',
      highRiskCount: '0명',
      avgCooldown: '0회',
      consultationCount: '0건',
      employeeTrend: '0',
      stressTrend: '0%',
      riskTrend: '0',
      cooldownTrend: '0%',
      consultationTrend: '0%'
    },
    trend: [],
    distribution: [],
    deptComparison: [],
    factors: []
  });

  const periods = ['2026년 1분기', '2025년 4분기', '2025년 3분기', '2025년 2분기'];

  useEffect(() => {
    loadData();
  }, [selectedPeriod]);

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await fetchMonitoringData(selectedPeriod);
      if (res) {
        setData(res);
      }
    } catch (error) {
      console.error("Failed to fetch monitoring data:", error);
    } finally {
      setLoading(false);
    }
  };

  const { stats, trend, distribution, deptComparison, factors } = data;

  return (
    <S.Container>
      {/* Header with Title & Filter */}
      <S.Header>
        <S.TitleBox>
          <h2>
            <Activity size={28} color="#818cf8" />
            심층 분석 레포트
          </h2>
          <p>Advanced Emotional Analytics</p>
        </S.TitleBox>
        <S.HeaderControls>
          <S.PeriodDropdownContainer>
            <S.PeriodButton onClick={() => setIsPeriodOpen(!isPeriodOpen)}>
              {selectedPeriod}
              <ChevronDown size={14} style={{ transform: isPeriodOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
            </S.PeriodButton>
            {isPeriodOpen && (
              <S.DropdownMenu>
                {periods.map(period => (
                  <S.DropdownItem
                    key={period}
                    onClick={() => {
                      setSelectedPeriod(period);
                      setIsPeriodOpen(false);
                    }}
                    active={selectedPeriod === period}
                  >
                    {period}
                  </S.DropdownItem>
                ))}
              </S.DropdownMenu>
            )}
          </S.PeriodDropdownContainer>
          <S.PrintButton>분석 보고서 출력</S.PrintButton>
        </S.HeaderControls>
      </S.Header>

      {/* Summary Cards */}
      <S.StatsGrid>
        {[
          { label: '전체 직원', val: stats.totalEmployees, trend: stats.employeeTrend, icon: Users, color: 'blue' },
          { label: '평균 스트레스', val: stats.avgStress, trend: stats.stressTrend, icon: HeartPulse, color: 'rose' },
          { label: '위험군 (70%+)', val: stats.highRiskCount, trend: stats.riskTrend, icon: AlertTriangle, color: 'orange' },
          { label: '평균 쿨다운', val: stats.avgCooldown, trend: stats.cooldownTrend, icon: Zap, color: 'violet' },
          { label: '전월 대비 상담', val: stats.consultationCount, trend: stats.consultationTrend, icon: MessageSquare, color: 'emerald' },
        ].map((stat, i) => (
          <S.StatCard key={i}>
            <S.StatContent>
              <S.StatHeader>
                <S.IconBox color={stat.color}>
                  <stat.icon size={20} />
                </S.IconBox>
                <span>{stat.label}</span>
              </S.StatHeader>
              <S.StatValueRow>
                <p>{loading ? '...' : stat.val}</p>
                <S.TrendBadge trend={stat.trend?.includes('-') ? 'down' : 'up'}>
                  {stat.trend?.includes('-') ? <ArrowDownRight size={14} /> : <ArrowUpRight size={14} />}
                  {stat.trend ? stat.trend.replace(/[+-]/, '') : '0'}
                </S.TrendBadge>
              </S.StatValueRow>
            </S.StatContent>
            <S.BackgroundIcon>
              <stat.icon />
            </S.BackgroundIcon>
          </S.StatCard>
        ))}
      </S.StatsGrid>

      <S.AnalysisGrid>
        {/* Monthly Trend Chart */}
        <S.TrendChartCard>
          <S.ChartHeader>
            <S.ChartTitles>
              <h3>
                <TrendingUp size={20} color="#818cf8" />
                월별 통합 추이 분석
              </h3>
              <p>상담 빈도와 평균 스트레스 수치의 상관관계</p>
            </S.ChartTitles>
            <S.Legend>
              <S.LegendItem color="#818cf8">
                <div />
                <span>상담 건수</span>
              </S.LegendItem>
              <S.LegendItem color="#fb7185">
                <div />
                <span>스트레스 %</span>
              </S.LegendItem>
              <S.LegendItem color="#fb923c">
                <div />
                <span>쿨다운 횟수</span>
              </S.LegendItem>
            </S.Legend>
          </S.ChartHeader>

          <S.ChartWrapper>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trend}>
                <defs>
                  <linearGradient id="colorConsult" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorStress" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#fb7185" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#fb7185" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorCooldown" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#fb923c" stopOpacity={0.1} />
                    <stop offset="95%" stopColor="#fb923c" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }}
                  padding={{ left: 20, right: 20 }}
                  interval={0}
                />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: '1px solid #334155',
                    borderRadius: '16px',
                    padding: '12px'
                  }}
                  itemStyle={{ fontWeight: 900 }}
                />
                <Area name="상담" type="monotone" dataKey="consultation" stroke="#818cf8" strokeWidth={3} fillOpacity={1} fill="url(#colorConsult)" />
                <Area name="스트레스" type="monotone" dataKey="stress" stroke="#fb7185" strokeWidth={3} fillOpacity={1} fill="url(#colorStress)" />
                <Area name="쿨다운" type="monotone" dataKey="cooldown" stroke="#fb923c" strokeWidth={3} fillOpacity={1} fill="url(#colorCooldown)" />
              </AreaChart>
            </ResponsiveContainer>
          </S.ChartWrapper>
        </S.TrendChartCard>

        {/* Stress Distribution */}
        <S.DistributionCard>
          <div style={{ marginBottom: '2rem' }}>
            <S.ChartTitles>
              <h3>
                <PieIcon size={20} color="#fb7185" />
                스트레스 수준 분포
              </h3>
              <p uppercase>Emotional Baseline Distribution</p>
            </S.ChartTitles>
          </div>

          <S.PieContainer>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {distribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip
                  content={<CustomTooltip />}
                  position={{ x: 0, y: 0 }}
                />
              </PieChart>
            </ResponsiveContainer>
            <S.CenterLabel>
              <p>{stats.totalEmployees.replace('명', '')}</p>
              <p>전체</p>
            </S.CenterLabel>
          </S.PieContainer>

          <S.DistributionList>
            {distribution.map((item, i) => (
              <S.DistItem key={i}>
                <div>
                  <S.ColorDot color={item.color} />
                  <span>{item.name}</span>
                </div>
                <span>{item.value ? Math.round((item.value / parseInt(stats.totalEmployees.replace('명', '') || 1)) * 100) : 0}%</span>
              </S.DistItem>
            ))}
          </S.DistributionList>
        </S.DistributionCard>
      </S.AnalysisGrid>

      <S.BottomGrid>
        {/* Dept Comparison */}
        <S.ComparisonCard>
          <S.ChartHeader>
            <S.ChartTitles>
              <h3>
                <BarChart3 size={20} color="#60a5fa" />
                부서별 스트레스 비교
              </h3>
              <p italic>Average vs High Risk Individuals per Dept</p>
            </S.ChartTitles>
            <S.InfoButton><Info size={16} /></S.InfoButton>
          </S.ChartHeader>

          <div style={{ height: 300, width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptComparison} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#334155" />
                <XAxis type="number" hide />
                <YAxis
                  dataKey="dept"
                  type="category"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 900 }}
                />
                <Tooltip
                  cursor={{ fill: 'rgba(255,255,255,0.03)' }}
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '12px' }}
                />
                <Bar dataKey="avg" fill="#818cf8" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </S.ComparisonCard>

        {/* Stress Factors Horizontal */}
        <S.FactorsCard>
          <S.ChartTitles>
            <h3>
              <AlertTriangle size={20} color="#fb923c" />
              주요 스트레스 요인 분석
            </h3>
            <p uppercase>Primary Emotional Triggers</p>
          </S.ChartTitles>

          <S.FactorsList>
            {factors.map((item, i) => (
              <S.FactorItem key={i}>
                <S.FactorHeader>
                  <span>{item.factor}</span>
                  <span>{item.value}%</span>
                </S.FactorHeader>
                <S.FactorBarBg>
                  <S.FactorBarFill width={`${item.value}%`} />
                </S.FactorBarBg>
              </S.FactorItem>
            ))}
          </S.FactorsList>
        </S.FactorsCard>
      </S.BottomGrid>
    </S.Container>
  );
};

export default AdminMonitoring;
