import styled, { keyframes, css } from "styled-components";

// 애니메이션
const slideInBottom = keyframes`
  from { opacity: 0; transform: translateY(1rem); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  animation: ${slideInBottom} 0.7s ease-out;
`;

/* 관리자 퀵 배너 */
export const QuickBanner = styled.div`
  background-color: #4f46e5; /* indigo-600 */
  padding: 1.5rem;
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: white;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 8px 10px -6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export const BannerContent = styled.div`
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const ShieldIconBox = styled.div`
  width: 3rem;
  height: 3rem;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(12px);
`;

export const BannerText = styled.div`
  h2 {
    font-size: 1.25rem;
    font-weight: 900;
    font-style: italic;
    letter-spacing: -0.025em;
  }

  p {
    color: #e0e7ff; /* indigo-100 */
    font-size: 0.75rem;
    font-weight: 500;
  }
`;

export const BannerStats = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
  z-index: 10;

  @media (min-width: 768px) {
    margin-top: 0;
  }
`;

export const StatBadge = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  font-size: 0.625rem; /* 10px */
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border: 1px solid rgba(255, 255, 255, 0.1);
  ${(props) => props.alert && "color: #fdba74;"}/* orange-300 */
`;

export const BannerDecor = styled.div`
  position: absolute;
  top: -2.5rem;
  right: -2.5rem;
  width: 12rem;
  height: 12rem;
  opacity: 0.1;
  transform: rotate(12deg);
  pointer-events: none;
`;

/* 통계 그리드 */
export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const StatCard = styled.div`
  background-color: #1e293b; /* slate-800 */
  border: 1px solid rgba(51, 65, 85, 0.5); /* slate-700/50 */
  padding: 1.25rem;
  border-radius: 2rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -2px rgba(0, 0, 0, 0.1);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;

  span {
    font-size: 0.625rem;
    font-weight: 900;
    color: #94a3b8; /* slate-400 */
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
`;

export const IconBox = styled.div`
  padding: 0.625rem;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 0.75rem;

  /* Dynamic color logic */
  ${(props) => props.color === "indigo" && "color: #818cf8;"}
  ${(props) => props.color === "blue" && "color: #60a5fa;"}
  ${(props) => props.color === "orange" && "color: #fb923c;"}
  ${(props) => props.color === "emerald" && "color: #34d399;"}
`;

export const StatValue = styled.p`
  font-size: 1.25rem; /* 2xl -> xl */
  font-weight: 900;
  color: white;
  letter-spacing: -0.025em;
`;

export const TrendText = styled.p`
  font-size: 0.625rem;
  font-weight: 700;
  margin-top: 0.25rem;

  ${(props) => props.trendType === "good" && "color: #60a5fa;"}
  ${(props) => props.trendType === "danger" && "color: #fb7185;"}
  ${(props) => props.trendType === "neutral" && "color: #64748b;"}
`;

/* 메인 콘텐츠 그리드 */
export const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(12, 1fr);
  }
`;

/* 주간 차트 섹션 */
export const ChartSection = styled.div`
  background-color: #1e293b;
  border: 1px solid rgba(51, 65, 85, 0.5);
  padding: 1.5rem;
  border-radius: 2.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  min-height: 280px;

  @media (min-width: 1024px) {
    grid-column: span 8 / span 8;
  }
`;

export const SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
`;

export const HeaderLeft = styled.div`
  h3 {
    font-size: 1.25rem;
    font-weight: 900;
    color: white;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  p {
    color: #94a3b8;
    font-size: 0.75rem;
    font-weight: 500;
    margin-top: 0.25rem;
  }
`;

export const AvgBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: rgba(15, 23, 42, 0.5);
  padding: 0.25rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(51, 65, 85, 0.5);

  span {
    font-size: 0.625rem; /* 10px */
    font-weight: 900;
    color: #fb7185;
    padding: 0.25rem 0.75rem;
  }
`;

export const ChartTabContainer = styled.div`
  display: flex;
  background-color: #0f172a;
  padding: 0.25rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(51, 65, 85, 0.5);
  margin-left: auto;
  margin-right: 1rem;
`;

export const ChartTabButton = styled.button`
  padding: 0.375rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.625rem;
  font-weight: 700;
  transition: all 0.2s;
  color: ${(props) => (props.active ? "#fff" : "#64748b")};
  background-color: ${(props) =>
    props.active ? props.activeColor || "#334155" : "transparent"};

  &:hover {
    color: ${(props) => (props.active ? "#fff" : "#94a3b8")};
  }
`;

export const ChartWrapper = styled.div`
  height: 70%;
  width: 100%;
  margin-top: 1rem;
`;

/* 스트레스 고위험군 섹션 */
export const TopListSection = styled.div`
  background-color: #1e293b;
  border: 1px solid rgba(51, 65, 85, 0.5);
  padding: 1.5rem;
  border-radius: 2.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  min-height: 280px;

  @media (min-width: 1024px) {
    grid-column: span 4 / span 4;
  }
`;

export const SearchButton = styled.button`
  padding: 0.5rem;
  background-color: #0f172a;
  border-radius: 0.75rem;
  color: #64748b;
  transition: color 0.2s;
  border: 1px solid rgba(51, 65, 85, 0.5);

  &:hover {
    color: #818cf8;
  }
`;

export const FilterTabs = styled.div`
  display: flex;
  gap: 0.25rem;
  background-color: #0f172a;
  padding: 0.25rem;
  border-radius: 1rem;
  margin-bottom: 1.5rem;
  overflow-x: auto;
  border: 1px solid rgba(51, 65, 85, 0.5);

  /* Hide scrollbar */
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

export const TabButton = styled.button`
  white-space: nowrap;
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  font-size: 0.625rem;
  font-weight: 900;
  transition: all 0.2s;

  ${(props) =>
    props.active
      ? "background-color: #334155; color: #818cf8; box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05);"
      : "color: #64748b; &:hover { color: #cbd5e1; }"}
`;

export const AgentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  flex: 1;
`;

export const AgentCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  border-radius: 1rem;
  transition: all 0.2s;
  border: 1px solid transparent;

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
    border-color: rgba(51, 65, 85, 0.5);
  }
`;

export const AgentAvatar = styled.div`
  width: 3rem;
  height: 3rem;
  background-color: #0f172a;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(51, 65, 85, 0.5);
`;

export const AgentInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

export const NameRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.125rem;

  p {
    font-size: 0.875rem;
    font-weight: 900;
    color: white;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  span {
    font-size: 0.75rem;
    font-weight: 900;
    color: #fb923c;
  }
`;

export const StatusRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  span:first-child {
    font-size: 0.5625rem; /* 9px */
    font-weight: 700;
    color: #64748b;
  }

  span:nth-child(2) {
    width: 0.25rem;
    height: 0.25rem;
    background-color: #334155;
    border-radius: 9999px;
  }

  span:last-child {
    font-size: 0.5625rem;
    font-weight: 700;
    ${(props) =>
      props.status === "업무 중" ? "color: #818cf8;" : "color: #64748b;"}
  }
`;

export const ActionButton = styled.button`
  padding: 0.5rem;
  color: #475569;
  transition: color 0.2s;

  ${AgentCard}:hover & {
    color: #818cf8;
  }
`;

export const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 3rem 0;
  opacity: 0.3;

  svg {
    color: #64748b;
    width: 2.5rem;
    height: 2.5rem;
  }
  p {
    font-size: 0.75rem;
    font-weight: 700;
    margin-top: 0.5rem;
    color: #64748b;
  }
`;

export const DetailButton = styled.button`
  width: 100%;
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: #0f172a;
  color: #94a3b8;
  border-radius: 1rem;
  font-size: 0.6875rem; /* 11px */
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  transition: all 0.2s;
  border: 1px solid rgba(51, 65, 85, 0.5);

  &:hover {
    color: #818cf8;
    background-color: rgba(99, 102, 241, 0.1);
    border-color: rgba(99, 102, 241, 0.2);
  }
`;

// 애니메이션
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const zoomIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`;

/* 모달 스타일 */
export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 120;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
  animation: ${fadeIn} 0.3s ease-out;
`;

export const ModalContainer = styled.div`
  position: relative;
  background-color: #0f172a;
  width: 100%;
  max-width: 64rem;
  border-radius: 3rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  border: 1px solid #1e293b;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: ${zoomIn} 0.3s ease-out;
`;

export const ModalHeader = styled.div`
  width: 100%;
  padding: 1.5rem;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: stretch;
    padding: 2rem 3rem;
  }

  ${(props) =>
    props.status === "위험" && "background-color: #be123c;"} /* rose-700 */
  ${(props) =>
    props.status === "주의" && "background-color: #ea580c;"} /* orange-600 */
  ${(props) =>
    props.status === "정상" && "background-color: #4338ca;"} /* indigo-700 */
  ${(props) =>
    props.status === "식사 중" &&
    "background-color: #059669;"} /* emerald-600 */
  ${(props) =>
    props.status === "통화 중" && "background-color: #7c3aed;"} /* violet-600 */
  ${(props) =>
    props.status === "대기" && "background-color: #475569;"} /* slate-600 */
  ${(props) =>
    props.status === "업무 중" && "background-color: #2563eb;"} /* blue-600 */
`;

export const ModalAvatar = styled.div`
  width: 6rem;
  height: 6rem;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 2.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.25rem; /* 4xl */
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  flex-shrink: 0;

  @media (min-width: 768px) {
    width: 9rem;
    height: 9rem;
    font-size: 3rem;
  }
`;

export const ModalInfo = styled.div`
  flex: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (min-width: 768px) {
    text-align: left;
  }
`;

export const NameTitle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-bottom: 0.5rem;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: baseline;
    gap: 1rem;
  }

  h2 {
    font-size: 1.875rem;
    font-weight: 900;
    letter-spacing: -0.05em;
    @media (min-width: 768px) {
      font-size: 2.25rem;
    }
  }

  span {
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.875rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
  }
`;

export const ContactRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.5rem;

  @media (min-width: 768px) {
    justify-content: flex-start;
  }
`;

export const ContactChip = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.375rem 0.75rem;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.05);

  svg {
    color: rgba(255, 255, 255, 0.6);
    width: 0.75rem;
    height: 0.75rem;
  }
  span {
    font-size: 0.6875rem;
    font-weight: 700;
    color: white;
  }
`;

export const ModalActions = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  flex-shrink: 0;

  @media (min-width: 768px) {
    flex-direction: column;
    margin-top: auto;
    margin-bottom: 0.375rem;
  }
`;

export const CallButton = styled.button`
  padding: 0.75rem 2rem;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 1rem;
  font-size: 0.6875rem;
  font-weight: 900;
  color: white;
  text-transform: uppercase;
  transition: all 0.2s;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
  &:active {
    transform: scale(0.95);
  }
`;

export const CloseModalButton = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 2rem;
  padding: 0.5rem;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 9999px;
  color: rgba(255, 255, 255, 0.5);
  transition: color 0.2s;

  &:hover {
    color: white;
    background-color: rgba(0, 0, 0, 0.4);
  }
`;

/* 상세 내용 콘텐츠 */
export const DetailContent = styled.div`
  flex: 1;
  padding: 1.5rem;
  background-color: #0f172a;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: 768px) {
    padding: 2rem 3rem;
  }
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(12, 1fr);
  }
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: 1024px) {
    grid-column: span 7 / span 7;
  }
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: 1024px) {
    grid-column: span 5 / span 5;
  }
`;

/* 스트레스 바 위젯 */
export const StressWidget = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  padding: 1.25rem;
  border-radius: 1.75rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
`;

export const WidgetHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;

  p {
    font-size: 0.5625rem;
    font-weight: 900;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

export const BadgeSmall = styled.span`
  font-size: 0.5625rem;
  font-weight: 900;
  color: #818cf8;
  background-color: rgba(129, 140, 248, 0.1);
  padding: 0.125rem 0.5rem;
  border-radius: 9999px;
`;

export const StressValue = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.375rem;
  margin-bottom: 0.75rem;

  span:first-child {
    font-size: 2.25rem;
    font-weight: 900;
    color: white;
  }

  span:last-child {
    font-size: 1.125rem;
    color: #475569;
    font-weight: 700;
  }
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 0.375rem;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 9999px;
  overflow: hidden;

  div {
    height: 100%;
    background: linear-gradient(to right, #6366f1, #818cf8);
    transition: width 1s ease-out;
  }
`;

/* 주요 지표 그리드 */
export const MetricsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.625rem;
`;

export const MetricCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 1.75rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.2s;

  &:hover {
    border-color: rgba(99, 102, 241, 0.2);
  }
`;

export const MetricTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const MetricIcon = styled.div`
  padding: 0.625rem;
  border-radius: 1rem;
  flex-shrink: 0;

  ${(props) =>
    props.color === "amber" &&
    "background-color: rgba(245, 158, 11, 0.1); color: #f59e0b;"}
  ${(props) =>
    props.color === "emerald" &&
    "background-color: rgba(16, 185, 129, 0.1); color: #10b981;"}
  ${(props) =>
    props.color === "orange" &&
    "background-color: rgba(249, 115, 22, 0.1); color: #f97316;"}
`;

export const MetricName = styled.span`
  font-size: 0.6875rem;
  font-weight: 900;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  white-space: nowrap;
`;

export const MetricValue = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.375rem;

  p {
    font-size: 1.875rem;
    font-weight: 900;
    line-height: 1;

    ${(props) => props.color === "amber" && "color: #f59e0b;"}
    ${(props) => props.color === "emerald" && "color: white;"}
    ${(props) => props.color === "orange" && "color: white;"}
  }

  span {
    font-size: 1rem;
    color: #475569;
    font-weight: 700;
  }
`;

/* Right Column Widgets */
export const WellnessSection = styled.div``;

export const SectionTitle = styled.h4`
  font-size: 0.625rem;
  font-weight: 900;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  padding-left: 0.5rem;
`;

export const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
`;

export const HistoryItem = styled.div`
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 1.25rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 0.2s;

  &:hover {
    border-color: rgba(99, 102, 241, 0.3);
  }
`;

export const HistoryContent = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 0;
`;

export const HistoryIcon = styled.div`
  width: 2.25rem;
  height: 2.25rem;
  background-color: #1e293b;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #94a3b8;
`;

export const HistoryText = styled.div`
  min-width: 0;

  p:first-child {
    font-size: 0.75rem;
    font-weight: 900;
    color: #f1f5f9;
    margin-bottom: 0.125rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p:last-child {
    font-size: 0.5625rem;
    font-weight: 700;
    color: #475569;
  }
`;

export const WellnessItem = styled.div`
  padding: 1.25rem;
  background-color: rgba(255, 255, 255, 0.03);
  border-radius: 1.75rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
  transition: all 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
`;

export const WellnessLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
`;

export const WellnessIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  ${(props) =>
    props.color === "indigo" &&
    "background-color: rgba(99, 102, 241, 0.1); color: #6366f1;"}
  ${(props) =>
    props.color === "rose" &&
    "background-color: rgba(244, 63, 94, 0.1); color: #f43f5e;"}
`;

export const WellnessLabel = styled.span`
  font-size: 0.625rem;
  font-weight: 900;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

export const WellnessValue = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0.25rem;

  p {
    font-size: 1.5rem;
    font-weight: 900;
    line-height: 1;
    color: ${(props) => props.color || "white"};
  }

  span {
    font-size: 0.75rem;
    font-weight: 700;
    color: #475569;
  }
`;

/* Calendar Widget */
export const CalendarWidget = styled.div`
  background-color: rgba(255, 255, 255, 0.02);
  padding: 1.25rem;
  border-radius: 1.75rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
`;

export const CalendarGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.25rem;
  text-align: center;
  flex: 1;
`;

export const WeekDay = styled.div`
  font-size: 0.75rem;
  font-weight: 700;
  color: #64748b;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const YesterdayText = styled.div`
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 500;
  margin-top: 0.25rem;
`;

export const DayCell = styled.div`
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #94a3b8;
  position: relative;
  background-color: rgba(255, 255, 255, 0.02);
  border: 1px solid transparent;
  transition: all 0.2s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }

  ${(props) => {
    switch (props.status) {
      case "present":
        return "background-color: rgba(34, 197, 94, 0.1); color: #4ade80; border-color: rgba(34, 197, 94, 0.2);"; // Green
      case "late":
        return "background-color: rgba(245, 158, 11, 0.1); color: #f59e0b; border-color: rgba(245, 158, 11, 0.2);"; // Amber
      case "absent":
        return "background-color: rgba(244, 63, 94, 0.1); color: #fb7185; border-color: rgba(244, 63, 94, 0.2);"; // Rose
      case "vacation":
        return "background-color: rgba(167, 139, 250, 0.1); color: #a78bfa; border-color: rgba(167, 139, 250, 0.2);"; // Violet
      default:
        return "";
    }
  }}
`;
