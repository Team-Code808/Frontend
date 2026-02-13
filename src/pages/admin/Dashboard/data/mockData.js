// // 근태 데이터 생성 헬퍼 함수
// const generateMockAttendance = (seed) => {
//   const attendance = {};
//   for (let i = 1; i <= 31; i++) {
//     const rand = (seed + i * 7) % 100;

//     // 주말 (2026년 1월 1일은 목요일)
//     // 0=일, 1=월, 2=화, 3=수, 4=목, 5=금, 6=토
//     const dayOfWeek = (i + 3) % 7; // (1+3)%7 = 4 (Thu)

//     if (dayOfWeek === 0 || dayOfWeek === 6) {
//       attendance[i] = ""; // 주말
//     } else {
//       if (rand < 5) attendance[i] = "absent";
//       else if (rand < 15) attendance[i] = "late";
//       else if (rand < 25) attendance[i] = "vacation";
//       else attendance[i] = "present";
//     }
//   }
//   return attendance;
// };

// export const deptStressData = [
//   { dept: "상담 1팀", stress: 42 },
//   { dept: "상담 2팀", stress: 38 },
//   { dept: "상담 3팀", stress: 75 },

//   { dept: "운영지원", stress: 24 },
//   { dept: "품질관리", stress: 31 },
//   { dept: "기술지원", stress: 18 },
// ];

// export const deptCooldownData = [
//   { dept: "상담 1팀", count: 12 },
//   { dept: "상담 2팀", count: 8 },
//   { dept: "상담 3팀", count: 15 },
//   { dept: "운영지원", count: 3 },
//   { dept: "품질관리", count: 5 },
//   { dept: "기술지원", count: 2 },
// ];

// export const agents = [
//   {
//     id: 1,
//     name: "박진호",
//     dept: "상담 1팀",
//     role: "시니어",
//     stress: 88,
//     status: "업무 중",
//     avatar: "👨‍💼",
//     phone: "010-3921-7025",
//     email: "jh.park@calmdesk.com",
//     joinDate: "2021.11.15",
//     metrics: {
//       csat: 4.2,
//       aht: "4m 12s",
//       attendance: 92,
//       leave: 8,
//       cooldowns: 12,
//       alerts: 5,
//       points: "2,120",
//     },
//     attendanceRecord: generateMockAttendance(1),
//   },
//   {
//     id: 2,
//     name: "이지은",
//     dept: "상담 2팀",
//     role: "상담원",
//     stress: 82,
//     status: "자리비움",
//     avatar: "👩‍💼",
//     phone: "010-4822-7042",
//     email: "je.lee@calmdesk.com",
//     joinDate: "2023.02.01",
//     metrics: {
//       csat: 4.5,
//       aht: "3m 58s",
//       attendance: 95,
//       leave: 11,
//       cooldowns: 8,
//       alerts: 3,
//       points: "3,400",
//     },
//     attendanceRecord: generateMockAttendance(2),
//   },
//   {
//     id: 3,
//     name: "강동원",
//     dept: "상담 1팀",
//     role: "상담원",
//     stress: 79,
//     status: "자리비움",
//     avatar: "👨‍💻",
//     phone: "010-5811-7103",
//     email: "dw.kang@calmdesk.com",
//     joinDate: "2022.08.20",
//     metrics: {
//       csat: 3.9,
//       aht: "5m 05s",
//       attendance: 89,
//       leave: 5.5,
//       cooldowns: 15,
//       alerts: 4,
//       points: "1,850",
//     },
//     attendanceRecord: generateMockAttendance(3),
//   },
//   {
//     id: 4,
//     name: "김태리",
//     dept: "상담 3팀",
//     role: "상담원",
//     stress: 75,
//     status: "업무 중",
//     avatar: "👩‍🔬",
//     phone: "010-6721-7118",
//     email: "tr.kim@calmdesk.com",
//     joinDate: "2023.01.10",
//     metrics: {
//       csat: 4.7,
//       aht: "3m 30s",
//       attendance: 100,
//       leave: 18,
//       cooldowns: 1,
//       alerts: 1,
//       points: "5,200",
//     },
//     attendanceRecord: generateMockAttendance(4),
//   },
//   {
//     id: 5,
//     name: "최우식",
//     dept: "상담 2팀",
//     role: "상담원",
//     stress: 72,
//     status: "자리비움",
//     avatar: "🧔",
//     phone: "010-7214-7150",
//     email: "ws.choi@calmdesk.com",
//     joinDate: "2022.12.05",
//     metrics: {
//       csat: 4.1,
//       aht: "4m 45s",
//       attendance: 94,
//       leave: 12,
//       cooldowns: 6,
//       alerts: 2,
//       points: "2,900",
//     },
//     attendanceRecord: generateMockAttendance(5),
//   },
//   {
//     id: 6,
//     name: "한소희",
//     dept: "상담 3팀",
//     role: "상담원",
//     stress: 65,
//     status: "업무 중",
//     avatar: "👩‍🎨",
//     phone: "010-8123-7200",
//     email: "sh.han@calmdesk.com",
//     joinDate: "2024.01.15",
//     metrics: {
//       csat: 4.9,
//       aht: "3m 20s",
//       attendance: 99,
//       leave: 15,
//       cooldowns: 0,
//       alerts: 0,
//       points: "1,200",
//     },
//     attendanceRecord: generateMockAttendance(6),
//   },
//   {
//     id: 7,
//     name: "조정석",
//     dept: "상담 1팀",
//     role: "팀장",
//     stress: 58,
//     status: "업무 중",
//     avatar: "👨‍🎨",
//     phone: "010-1234-5678",
//     email: "js.jo@calmdesk.com",
//     joinDate: "2020.03.10",
//     metrics: {
//       csat: 4.8,
//       aht: "3m 50s",
//       attendance: 98,
//       leave: 14,
//       cooldowns: 2,
//       alerts: 0,
//       points: "5,800",
//     },
//     attendanceRecord: generateMockAttendance(7),
//   },
// ];

// export const departments = ["전체", "상담 1팀", "상담 2팀", "상담 3팀"];
