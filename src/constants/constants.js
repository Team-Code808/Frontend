
export const MOCK_USER = {
  name: "김철수",
  position: "상담 전문위원",
  department: "고객행복 1팀",
  email: "cs.kim@calmdesk.com",
  phone: "010-1234-5678",
  joinDate: "2022.05.10",
  avatar: "👨‍💻",
  point: "2,450"
};

// MyPage.tsx 요구사항에 맞춰 상태(status) 필드 추가
export const COUPONS = [
  { id: 1, name: '스타벅스 아메리카노', shop: 'Starbucks', date: '2026.12.31 까지', color: 'bg-emerald-500', icon: '☕', status: 'AVAILABLE' },
  { id: 2, name: '배달의민족 1만원권', shop: 'Baemin', date: '2026.06.15 까지', color: 'bg-cyan-500', icon: '🛵', status: 'AVAILABLE' },
  { id: 3, name: 'BHC 후라이드 치킨', shop: 'BHC', date: '2026.05.20 까지', color: 'bg-amber-500', icon: '🍗', status: 'AVAILABLE' },
];

export const NOTIFICATIONS_DATA = [
  {
    id: 1,
    type: 'success',
    title: '미션 완료',
    message: '오늘의 출근 완료 미션을 성공적으로 마쳤습니다.',
    time: '오전 09:05',
    date: '2026.01.20',
    read: false
  },
  {
    id: 2,
    type: 'alert',
    title: '스트레스 경고',
    message: '현재 스트레스 지수가 높습니다. 잠시 휴식을 취하는 것은 어떨까요?',
    time: '오전 10:30',
    date: '2026.01.20',
    read: true
  },
  {
    id: 3,
    type: 'notice',
    title: '공지사항',
    message: '다음 주 월요일은 정기 시스템 점검이 예정되어 있습니다.',
    time: '어제',
    date: '2026.01.19',
    read: true
  }
];
