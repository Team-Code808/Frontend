import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  MessageSquareHeart,
  UserCircle,
  LogOut,
  Bell,
  Coins,
  ShieldCheck,
  Activity,
  ArrowLeftRight,
  ClipboardList,
  X,
  CheckCircle2,
  AlertCircle,
  Info,
  MessageCircle,
} from "lucide-react";
import { NavItemType } from "../constants/types";
import Logo from "./Logo";
import useStore from "../store/useStore"; // 스토어 임포트 위치 확인
import axios from "../api/axios";
import * as S from "./Header.styles";

// --- 1. 전체 알림 모달 컴포넌트 ---
const AllNotificationsModal = ({ onClose }) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("ALL");
  const { notifications, markAsRead, isAdminMode, setIsAdminMode } = useStore();

  const filtered = notifications.filter((n) => {
    // 1. 역할 기반 필터링 (가장 중요!)
    // 관리자 모드면 ADMIN 알림만, 직원 모드면 USER 알림만 보여줌
    const roleMatch = isAdminMode ? n.targetRole === "ADMIN" : n.targetRole === "USER";

    // 2. 읽음/안 읽음 탭 필터링
    const statusMatch = filter === "ALL" || !n.read;

    return roleMatch && statusMatch;
  });

  return (
    <S.ModalOverlay>
      <S.Backdrop onClick={onClose} />
      <S.ModalContent $isAdminMode={isAdminMode}>
        <S.ModalHeader $isAdminMode={isAdminMode}>
          <div>
            <h2>알림 센터</h2>
            <p>받은 알림 내역을 모두 확인합니다.</p>
          </div>
          <S.CloseButton $isAdminMode={isAdminMode} onClick={onClose}>
            <X size={24} />
          </S.CloseButton>
        </S.ModalHeader>

        <S.ModalTabs $isAdminMode={isAdminMode}>
          <S.ModalTabButton $active={filter === 'ALL'} $isAdminMode={isAdminMode} onClick={() => setFilter('ALL')}>
            전체
          </S.ModalTabButton>
          <S.ModalTabButton $active={filter === 'UNREAD'} $isAdminMode={isAdminMode} onClick={() => setFilter('UNREAD')} color={isAdminMode ? "#818cf8" : "#4f46e5"}>
            안 읽음
          </S.ModalTabButton>
        </S.ModalTabs>

        <S.ModalList $isAdminMode={isAdminMode}>
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <S.ModalItem
                style={{ cursor: item.redirectUrl ? "pointer" : "default" }}
                key={item.id}
                read={item.read}
                $isAdminMode={isAdminMode}
                onClick={() => {
                  // 읽음 처리
                  if (!item.read) {
                    markAsRead(item.id);
                  }
                  // redirectUrl 있으면 이동
                  if (item.redirectUrl) {
                    // ADMIN 알림이면 관리자 모드로 전환 후 이동
                    if (item.targetRole === "ADMIN" && !isAdminMode) {
                      setIsAdminMode(true);
                    }
                    navigate(item.redirectUrl);
                    onClose(); // 모달 닫기
                  }
                }}>
                <S.IconBox type={item.type || "notice"}>
                  {item.type === "success" ? <CheckCircle2 size={18} /> :
                    item.type === "alert" ? <AlertCircle size={18} /> : <Bell size={18} />}
                </S.IconBox>
                <S.ListContent>
                  <S.ListHeader read={item.read} $isAdminMode={isAdminMode}>
                    <h4>{item.title}</h4>
                    <span>{item.time}</span>
                  </S.ListHeader>
                  <S.ListMessage $isAdminMode={isAdminMode}>{item.message}</S.ListMessage>
                </S.ListContent>
                {!item.read && <S.ListUnreadDot $isAdminMode={isAdminMode} />}
              </S.ModalItem>
            ))
          ) : (
            <div style={{ padding: "3rem", textAlign: "center", color: isAdminMode ? "#475569" : "#94a3b8" }}>
              <Bell size={40} style={{ opacity: 0.2, marginBottom: "0.5rem" }} />
              <p style={{ fontSize: "0.75rem", fontWeight: 700 }}>표시할 알림이 없습니다.</p>
            </div>
          )}
        </S.ModalList>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

// --- 2. 메인 헤더 컴포넌트 ---
const Header = () => {
  const {
    isAdminMode, setIsAdminMode, logout, user,
    notifications, addNotification, markAsRead, markAllAsRead, fetchNotifications,
    chat // chat 스토어 추가
  } = useStore();

  const { chatRooms, setChatRooms } = chat;

  const { name: userName, department, id: memberId } = user || {};

  const navigate = useNavigate();
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAllNotificationsModal, setShowAllNotificationsModal] = useState(false);
  const notificationRef = useRef(null);

  const recentNotifications = notifications
    .filter(n => isAdminMode ? n.targetRole === "ADMIN" : n.targetRole === "USER")
    .slice(0, 5); // 최근 5개 표시

  // [수정된 부분] 초기 데이터 로딩 및 SSE 연결
  useEffect(() => {
    if (!memberId) return;

    // 1. 초기 데이터 가져오기
    fetchNotifications(memberId);

    // 2. SSE 연결
    const eventSource = new EventSource(`http://localhost:8080/subscribe/${memberId}`);

    // Header.jsx 내 SSE 수신 부분
    console.log(`${memberId}번 유저 SSE 구독 시작`);

    eventSource.addEventListener("notification", (event) => {
      const data = JSON.parse(event.data);
      console.log("실제 받은 데이터:", data);
      // 현재 헤더의 관리자 모드 여부와 알림의 타겟 롤을 비교
      // 예: 관리자 모드인데 알림이 ADMIN용이면 알림창에서 더 강조하거나 별도 처리

      addNotification({
        id: data.id,
        title: data.title,
        message: data.content,
        time: "방금 전",
        read: data.status === "Y",
        redirectUrl: data.redirectUrl,
        // ⭐ 백엔드에서 온 targetRole을 그대로 저장
        targetRole: data.targetRole,
        type: data.targetRole === "ADMIN" ? "alert" : "success"
      });
    });

    eventSource.onerror = (e) => {
      console.error("SSE 연결 오류:", e);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [memberId, isAdminMode, fetchNotifications, addNotification]);

  // [추가] 채팅방 목록 초기 로딩 (안 읽은 메시지 배지 표시용)
  useEffect(() => {
    if (memberId) {
      axios.get('/chat/rooms')
        .then(res => {
          if (res.data) {
            setChatRooms(res.data);
          }
        })
        .catch(err => console.error("Failed to fetch chat rooms in Header:", err));
    }
  }, [memberId, setChatRooms]);

  // 전체 안 읽은 메시지 수 계산
  const totalUnreadChatCount = chatRooms.reduce((sum, room) => sum + (room.unreadCount || 0), 0);

  // 클릭 외부 감지 (유지)
  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 네비게이션 아이템 설정 (생략 - 기존 코드와 동일)
  const userNavItems = [
    { id: NavItemType.DASHBOARD, label: "대시보드", icon: LayoutDashboard, path: "/app/dashboard" },
    { id: NavItemType.DEPARTMENT, label: "부서정보", icon: Users, path: "/app/department" },
    { id: NavItemType.ATTENDANCE, label: "근태관리", icon: CalendarCheck, path: "/app/attendance" },
    { id: NavItemType.CONSULTATION, label: "상담신청", icon: MessageSquareHeart, path: "/app/consultation" },
    { id: NavItemType.POINT_MALL, label: "포인트몰", icon: Coins, path: "/app/pointmall" },
  ];
  const adminNavItems = [
    { id: NavItemType.DASHBOARD, label: "통합현황", icon: LayoutDashboard, path: "/app/dashboard" },
    { id: NavItemType.ADMIN_USERS, label: "팀원관리", icon: Users, path: "/app/teammanagement" },
    { id: NavItemType.ADMIN_MONITORING, label: "상세분석", icon: Activity, path: "/app/monitoring" },
    { id: NavItemType.ADMIN_APPLICATIONS, label: "신청관리", icon: ClipboardList, path: "/app/applications" },
    { id: "ADMIN_GIFTICONS", label: "기프티콘 관리", icon: Coins, path: "/app/gifticons" },
  ];

  const currentNavItems = isAdminMode ? adminNavItems : userNavItems;
  const currentPath = location.pathname;
  const isMyPageActive = currentPath.includes("/app/mypage");
  let activeTab = currentNavItems.find(item => currentPath.startsWith(item.path))?.id;

  return (
    <>
      <S.HeaderContainer $isAdminMode={isAdminMode}>
        <S.InnerContent>
          <S.HeaderRow>
            <S.LeftSection>
              <S.BrandGroup>
                <S.LogoBox onClick={() => navigate("/app/dashboard")}>
                  <Logo size={70} />
                  <S.BrandText $isAdminMode={isAdminMode}>
                    Calm Desk
                    <S.RoleBadge>{isAdminMode ? "ADMIN" : "STAFF"}</S.RoleBadge>
                  </S.BrandText>
                </S.LogoBox>
                <S.ModeToggleButton $isAdminMode={isAdminMode} onClick={() => { setIsAdminMode(!isAdminMode); navigate("/app/dashboard"); }}>
                  {isAdminMode ? <><ArrowLeftRight /> 직원 모드 복귀</> : <><ShieldCheck /> 관리자 전환</>}
                </S.ModeToggleButton>
              </S.BrandGroup>
            </S.LeftSection>

            <S.CenterNav>
              {currentNavItems.map((item) => (
                <S.NavButton key={item.id} onClick={() => navigate(item.path)} $isActive={activeTab === item.id} $isAdminMode={isAdminMode}>
                  <item.icon size={24} />
                  <span>{item.label}</span>
                  {activeTab === item.id && <S.ActiveIndicator $isAdminMode={isAdminMode} />}
                </S.NavButton>
              ))}
            </S.CenterNav>

            <S.RightSection>
              <S.RightGroup>
                <S.ProfileButton onClick={() => navigate("/app/mypage")} $isActive={isMyPageActive} $isAdminMode={isAdminMode}>
                  <S.ProfileAvatar $isActive={isMyPageActive} $isAdminMode={isAdminMode}><UserCircle size={20} /></S.ProfileAvatar>
                  <S.ProfileInfo>
                    <S.ProfileName $isAdminMode={isAdminMode}>{isAdminMode ? "관리자" : `${userName} 님`}</S.ProfileName>
                    <S.ProfileRole $isAdminMode={isAdminMode}>{isAdminMode ? "운영 총괄" : department}</S.ProfileRole>
                  </S.ProfileInfo>
                </S.ProfileButton>

                <S.ActionDivider $isAdminMode={isAdminMode}>
                  {/* 채팅 버튼 */}
                  <S.IconButton
                    onClick={() => navigate("/app/chat")}
                    $isAdminMode={isAdminMode}
                  >
                    <MessageCircle size={20} />
                    {totalUnreadChatCount > 0 && (
                      <S.UnreadCountBadge $isAdminMode={isAdminMode}>
                        {totalUnreadChatCount > 99 ? "99+" : totalUnreadChatCount}
                      </S.UnreadCountBadge>
                    )}
                  </S.IconButton>

                  {/* 알림 버튼 및 팝업 */}
                  <div style={{ position: "relative" }} ref={notificationRef}>
                    <S.IconButton onClick={() => setShowNotifications(!showNotifications)} $active={showNotifications} $isAdminMode={isAdminMode}>
                      <Bell size={20} />
                      {notifications.some(n =>
                        !n.read && (isAdminMode ? n.targetRole === "ADMIN" : n.targetRole === "USER")
                      ) && <S.NotiDot />}
                    </S.IconButton>

                    {showNotifications && (
                      <S.NotiPopover $isAdminMode={isAdminMode}>
                        <S.NotiHeader $isAdminMode={isAdminMode}>
                          <span>알림</span>
                          <button onClick={() => markAllAsRead(memberId)}>모두 읽음</button>
                        </S.NotiHeader>
                        <S.NotiList>
                          {recentNotifications.map((notif) => (
                            <S.NotiItem
                              key={notif.id}
                              read={notif.read}
                              $isAdminMode={isAdminMode}
                              onClick={() => {
                                // 1. 읽음 처리
                                markAsRead(notif.id);

                                // 2. 경로가 있다면 해당 페이지로 이동
                                if (notif.redirectUrl) {
                                  // ADMIN 알림이면 관리자 모드로 전환 후 이동
                                  if (notif.targetRole === "ADMIN" && !isAdminMode) {
                                    setIsAdminMode(true);
                                  }
                                  navigate(notif.redirectUrl);
                                  setShowNotifications(false); // 알림 팝업 닫기
                                }
                              }}
                            >
                              <S.NotiItemHeader $isAdminMode={isAdminMode}>
                                <span>{notif.title}</span>
                                <span>{notif.time}</span>
                              </S.NotiItemHeader>
                              <S.NotiMessage>{notif.message}</S.NotiMessage>
                            </S.NotiItem>
                          ))}
                          {recentNotifications.length === 0 && <div style={{ padding: "20px", textAlign: "center", fontSize: "12px", color: "#999" }}>새로운 알림이 없습니다.</div>}
                        </S.NotiList>
                        <S.NotiFooter $isAdminMode={isAdminMode}>
                          <button onClick={() => { setShowNotifications(false); setShowAllNotificationsModal(true); }}>알림 전체보기</button>
                        </S.NotiFooter>
                      </S.NotiPopover>
                    )}
                  </div>
                  <S.IconButton onClick={logout} $isAdminMode={isAdminMode} $logout><LogOut size={20} /></S.IconButton>
                </S.ActionDivider>
              </S.RightGroup>
            </S.RightSection>
          </S.HeaderRow>
        </S.InnerContent>
      </S.HeaderContainer>

      {showAllNotificationsModal && <AllNotificationsModal onClose={() => setShowAllNotificationsModal(false)} />}
    </>
  );
};

export default Header;