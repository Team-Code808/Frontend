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
} from "lucide-react";
import { NavItemType } from "../constants/types";
import Logo from "./Logo";
import * as S from "./Header.styles";

const AllNotificationsModal = ({ onClose }) => {
  const [filter, setFilter] = useState("ALL");
  const { notifications, markAsRead, isAdminMode } = useStore(); // isAdminMode 추가

  const filtered = notifications.filter((n) => {
    // 1차 필터: 관리자/직원 권한 구분
    const roleMatch = isAdminMode ? n.type === "ADMIN" : n.type !== "ADMIN";
    
    // 2차 필터: 전체/안읽음 구분
    const statusMatch = filter === "ALL" || !n.read;
    
    return roleMatch && statusMatch;
  });
  return (
    <S.ModalOverlay>
      <S.Backdrop onClick={onClose} />
      <S.ModalContent>
        {/* 헤더 */}
        <S.ModalHeader>
          <div>
            <h2>알림 센터</h2>
            <p>받은 알림 내역을 모두 확인합니다.</p>
          </div>
          <S.CloseButton onClick={onClose}>
            <X size={24} />
          </S.CloseButton>
        </S.ModalHeader>

        {/* 탭 */}
        <S.ModalTabs>
          <S.ModalTabButton
            $active={filter === 'ALL'}
            onClick={() => setFilter('ALL')}
          >
            전체
          </S.ModalTabButton>
          <S.ModalTabButton
            $active={filter === 'UNREAD'}
            onClick={() => setFilter('UNREAD')}
            color="#4f46e5"
          >
            안 읽음
          </S.ModalTabButton>
        </S.ModalTabs>

        {/* 리스트 */}
        <S.ModalList>
          {filtered.length > 0 ? (
            filtered.map((item) => (
              <S.ModalItem 
                key={item.id} 
                $read={item.read} // 스타일드 컴포넌트 프롭은 $를 붙이는 것이 좋습니다
                onClick={() => markAsRead(item.id)} 
              >
                <S.IconBox type={item.type}>
                  {item.type === "success" ? (
                    <CheckCircle2 size={18} />
                  ) : item.type === "alert" ? (
                    <AlertCircle size={18} />
                  ) : item.type === "notice" ? (
                    <Bell size={18} />
                  ) : (
                    <Info size={18} />
                  )}
                </S.IconBox>
                <S.ListContent>
                  <S.ListHeader read={item.read}>
                    <h4>{item.title}</h4>
                    <span>{item.time}</span>
                  </S.ListHeader>
                  <S.ListMessage>{item.message}</S.ListMessage>
                </S.ListContent>
                {!item.read && <S.ListUnreadDot />}
              </S.ModalItem>
            ))
          ) : (
            <div
              style={{
                padding: "3rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                color: "#94a3b8",
              }}
            >
              <Bell
                size={40}
                style={{ opacity: 0.2, marginBottom: "0.5rem" }}
              />
              <p style={{ fontSize: "0.75rem", fontWeight: 700 }}>
                표시할 알림이 없습니다.
              </p>
            </div>
          )}
        </S.ModalList>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

import useStore from "../store/useStore";

const Header = () => {
  // 1. 통합 스토어(useStore)에서 알림 상태와 함수(fetch)를 가져옵니다.
  const { 
    notifications, 
    fetchNotifications, // 서버에서 데이터를 받아오는 함수
    subscribeToNotifications,
    markAsRead,
    markAllAsRead, 
    isAdminMode, 
    setIsAdminMode, 
    logout: onLogout,
    user 
  } = useStore();

  const { name: userName, department } = user || {};
  const navigate = useNavigate();
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAllNotificationsModal, setShowAllNotificationsModal] = useState(false);
  const notificationRef = useRef(null);

  // 2. 컴포넌트가 마운트될 때(처음 켜질 때) 서버에 알림 데이터를 요청합니다.
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  useEffect(() => {
    if (user?.id) {
      const unsubscribe = subscribeToNotifications(user.id);
      return () => unsubscribe(); // 언마운트 시 연결 해제
    }
  }, [user?.id, subscribeToNotifications]);



const filteredNotifications = notifications.filter(notif => {
  if (isAdminMode) {
    // 관리자 모드일 때는 type이 'ADMIN'인 것만 보여줌
    return notif.type === "ADMIN";
  } else {
    // 직원 모드일 때는 type이 'ADMIN'이 아닌 것만 보여줌
    return notif.type !== "ADMIN";
  }
});

  // 3. 파생 상태값 (항상 최신 notifications 기반으로 계산됨)
  const hasUnread = filteredNotifications.some(n => !n.read);
  const recentNotifications = filteredNotifications.slice(0, 3);
  
 
  // 클릭 외부 감지 로직 (기존과 동일)
  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const userNavItems = [
    {
      id: NavItemType.DASHBOARD,
      label: "대시보드",
      icon: LayoutDashboard,
      path: "/app/dashboard",
    },
    {
      id: NavItemType.DEPARTMENT,
      label: "부서정보",
      icon: Users,
      path: "/app/department",
    },
    {
      id: NavItemType.ATTENDANCE,
      label: "근태관리",
      icon: CalendarCheck,
      path: "/app/attendance",
    },
    {
      id: NavItemType.CONSULTATION,
      label: "상담신청",
      icon: MessageSquareHeart,
      path: "/app/consultation",
    },
    {
      id: NavItemType.POINT_MALL,
      label: "포인트몰",
      icon: Coins,
      path: "/app/pointmall",
    },
  ];

  const adminNavItems = [
    {
      id: NavItemType.DASHBOARD,
      label: "통합현황",
      icon: LayoutDashboard,
      path: "/app/dashboard",
    },
    {
      id: NavItemType.ADMIN_USERS,
      label: "팀원관리",
      icon: Users,
      path: "/app/teammanagement",
    },
    {
      id: NavItemType.ADMIN_MONITORING,
      label: "상세분석",
      icon: Activity,
      path: "/app/monitoring",
    },
    {
      id: NavItemType.ADMIN_APPLICATIONS,
      label: "신청관리",
      icon: ClipboardList,
      path: "/app/applications",
    },
    {
      id: "ADMIN_GIFTICONS",
      label: "기프티콘 관리",
      icon: Coins,
      path: "/app/gifticons",
    },
  ];

  const currentNavItems = isAdminMode ? adminNavItems : userNavItems;

  // 경로(path)에 따라 활성 탭 결정
  const currentPath = location.pathname;
  const isMyPageActive = currentPath.includes("/app/mypage");

  let activeTab = null;
  if (!isMyPageActive) {
    const activeItem = currentNavItems.find((item) =>
      currentPath.startsWith(item.path)
    );
    if (activeItem) activeTab = activeItem.id;
  }

  const handleNavClick = (path) => {
    navigate(path);
  };

  const handleModeToggle = () => {
    setIsAdminMode(!isAdminMode);
    navigate("/app/dashboard");
  };

  return (
    <>
      <S.HeaderContainer $isAdminMode={isAdminMode}>
        <S.InnerContent>
          <S.HeaderRow>
            {/* 왼쪽 영역 */}
            <S.LeftSection>
              <S.BrandGroup>
                <S.LogoBox onClick={() => navigate("/app/dashboard")}>
                  <Logo size={70} />
                  <S.BrandText $isAdminMode={isAdminMode}>
                    Calm Desk
                    <S.RoleBadge>{isAdminMode ? "ADMIN" : "STAFF"}</S.RoleBadge>
                  </S.BrandText>
                </S.LogoBox>

                <S.ModeToggleButton
                  $isAdminMode={isAdminMode}
                  onClick={handleModeToggle}
                >
                  {isAdminMode ? (
                    <>
                      <ArrowLeftRight /> 직원 모드 복귀
                    </>
                  ) : (
                    <>
                      <ShieldCheck /> 관리자 전환
                    </>
                  )}
                </S.ModeToggleButton>
              </S.BrandGroup>
            </S.LeftSection>

            {/* 중앙 내비게이션 */}
            <S.CenterNav>
              {currentNavItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <S.NavButton
                    key={item.id}
                    onClick={() => handleNavClick(item.path)}
                    $isActive={isActive}
                    $isAdminMode={isAdminMode}
                  >
                    <item.icon size={24} />
                    <span>{item.label}</span>
                    {isActive && (
                      <S.ActiveIndicator $isAdminMode={isAdminMode} />
                    )}
                  </S.NavButton>
                );
              })}
            </S.CenterNav>

            {/* 오른쪽 영역 */}
            <S.RightSection>
              <S.RightGroup>
                <S.ProfileButton
                  onClick={() => navigate("/app/mypage")}
                  $isActive={isMyPageActive}
                  $isAdminMode={isAdminMode}
                >
                  <S.ProfileAvatar
                    $isActive={isMyPageActive}
                    $isAdminMode={isAdminMode}
                  >
                    <UserCircle size={20} />
                  </S.ProfileAvatar>
                  <S.ProfileInfo>
                    <S.ProfileName
                      $isActive={isMyPageActive}
                      $isAdminMode={isAdminMode}
                    >
                      {isAdminMode ? "관리자" : `${userName} 님`}
                    </S.ProfileName>
                    <S.ProfileRole $isAdminMode={isAdminMode}>
                      {isAdminMode ? "운영 총괄" : department}
                    </S.ProfileRole>
                  </S.ProfileInfo>
                </S.ProfileButton>

                <S.ActionDivider $isAdminMode={isAdminMode}>
                  {/* 알림 버튼 및 팝업 */}
                  <div style={{ position: "relative" }} ref={notificationRef}>
                    <S.IconButton
                      onClick={() => setShowNotifications(!showNotifications)}
                      $active={showNotifications}
                      $isAdminMode={isAdminMode}
                    >
                      <Bell size={20} />
                      {hasUnread && <S.NotiDot />}
                    </S.IconButton>

                   {showNotifications && (
                      <S.NotiPopover $isAdminMode={isAdminMode}>
                        <S.NotiHeader $isAdminMode={isAdminMode}>
                          <span>알림</span>
                          <button onClick={markAllAsRead}>모두 읽음</button> {/* 기능 연결 */}
                        </S.NotiHeader>
                        <S.NotiList>
                          {recentNotifications.map((notif) => (
                            <S.NotiItem
                                key={notif.id}
                                $isAdminMode={isAdminMode}
                                $read={notif.read}
                                onClick={() => markAsRead(notif.id)} // 단일 읽음 기능 연결
                            >
                              <S.NotiItemHeader $isAdminMode={isAdminMode}>
                               <span>{notif.time || '방금 전'}</span>
                              </S.NotiItemHeader>
                              <S.NotiMessage>{notif.message}</S.NotiMessage>
                            </S.NotiItem>
                          ))}
                        </S.NotiList>
                        <S.NotiFooter $isAdminMode={isAdminMode}>
                          <button
                            onClick={() => {
                              setShowNotifications(false);
                              setShowAllNotificationsModal(true);
                            }}
                          >
                            알림 전체보기
                          </button>
                        </S.NotiFooter>
                      </S.NotiPopover>
                    )}
                  </div>

                  <S.IconButton
                    onClick={onLogout}
                    $isAdminMode={isAdminMode}
                    $logout
                  >
                    <LogOut size={20} />
                  </S.IconButton>
                </S.ActionDivider>
              </S.RightGroup>
            </S.RightSection>
          </S.HeaderRow>
        </S.InnerContent>
      </S.HeaderContainer>

      {/* 전체 알림 모달 */}
      {showAllNotificationsModal && (
        <AllNotificationsModal
          onClose={() => setShowAllNotificationsModal(false)}
        />
      )}
    </>
  );
};

export default Header;
