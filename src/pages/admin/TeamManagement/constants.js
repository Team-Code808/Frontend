export const DEFAULT_DEPARTMENTS = ['상담 1팀', '상담 2팀', '상담 3팀', '운영지원', '기술지원'];

export const defaultMetrics = {
  csat: '-',
  aht: '-',
  attendance: '-',
  leave: '-',
  cooldowns: 0,
  alerts: 0,
  points: '-',
};

/**
 * API 응답 한 건 → 카드/모달용 멤버 객체
 */
export function mapApiToMemberCard(m) {
  const remainingLeave = m.remainingLeave != null ? m.remainingLeave : '-';
  return {
    id: m.memberId,
    name: m.name ?? '-',
    dept: m.departmentName ?? '-',
    role: m.rankName ?? '-',
    email: m.email ?? '-',
    phone: m.phone ?? '-',
    joinDate: m.joinDate ?? '-',
    remainingLeave,
    stress: m.stress != null ? m.stress : '-',
    avatar: '👤',
    status: m.attendanceStatus ?? '-',
    metrics: { ...defaultMetrics, leave: remainingLeave, cooldowns: m.cooldownCount ?? 0 },
    attendanceRecord: {},
  };
}
