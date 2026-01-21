import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  Info
} from 'lucide-react';
import { NavItemType } from '../constants/types';
import Logo from './Logo';
import { NOTIFICATIONS_DATA } from '../constants/constants';
import * as S from './Header.styles';

const AllNotificationsModal = ({ onClose }) => {
  const [filter, setFilter] = useState('ALL');

  const filtered = NOTIFICATIONS_DATA.filter(n => filter === 'ALL' || !n.read);

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
            active={filter === 'ALL'}
            onClick={() => setFilter('ALL')}
          >
            전체
          </S.ModalTabButton>
          <S.ModalTabButton
            active={filter === 'UNREAD'}
            onClick={() => setFilter('UNREAD')}
            color="#4f46e5"
          >
            안 읽음
          </S.ModalTabButton>
        </S.ModalTabs>

        {/* 리스트 */}
        <S.ModalList>
          {filtered.length > 0 ? filtered.map(item => (
            <S.ModalItem key={item.id} read={item.read}>
              <S.IconBox type={item.type}>
                {item.type === 'success' ? <CheckCircle2 size={18} /> :
                  item.type === 'alert' ? <AlertCircle size={18} /> :
                    item.type === 'notice' ? <Bell size={18} /> : <Info size={18} />}
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
          )) : (
            <div style={{ padding: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#94a3b8' }}>
              <Bell size={40} style={{ opacity: 0.2, marginBottom: '0.5rem' }} />
              <p style={{ fontSize: '0.75rem', fontWeight: 700 }}>표시할 알림이 없습니다.</p>
            </div>
          )}
        </S.ModalList>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};

import useStore from '../store/useStore';

const Header = () => {
  const { isAdminMode, setIsAdminMode, logout, user } = useStore();
  const userName = user?.name || '';
  const onLogout = logout;
  const navigate = useNavigate();
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAllNotificationsModal, setShowAllNotificationsModal] = useState(false);
  const notificationRef = useRef(null);

  const notifications = NOTIFICATIONS_DATA.slice(0, 3); // 최신 3개만 미리보기

  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const userNavItems = [
    { id: NavItemType.DASHBOARD, label: '대시보드', icon: LayoutDashboard, path: '/app/dashboard' },
    { id: NavItemType.DEPARTMENT, label: '부서정보', icon: Users, path: '/app/department' },
    { id: NavItemType.ATTENDANCE, label: '근태관리', icon: CalendarCheck, path: '/app/attendance' },
    { id: NavItemType.CONSULTATION, label: '상담신청', icon: MessageSquareHeart, path: '/app/consultation' },
    { id: NavItemType.POINT_MALL, label: '포인트몰', icon: Coins, path: '/app/pointmall' },
  ];

  const adminNavItems = [
    { id: NavItemType.DASHBOARD, label: '통합현황', icon: LayoutDashboard, path: '/app/dashboard' },
    { id: NavItemType.ADMIN_USERS, label: '팀원관리', icon: Users, path: '/app/users' },
    { id: NavItemType.ADMIN_MONITORING, label: '상세분석', icon: Activity, path: '/app/monitoring' },
    { id: NavItemType.ADMIN_APPLICATIONS, label: '신청관리', icon: ClipboardList, path: '/app/applications' },
    { id: 'ADMIN_GIFTICONS', label: '기프티콘 관리', icon: Coins, path: '/app/gifticons' },
  ];

  const currentNavItems = isAdminMode ? adminNavItems : userNavItems;

  // 경로(path)에 따라 활성 탭 결정
  const currentPath = location.pathname;
  const isMyPageActive = currentPath.includes('/app/mypage');

  let activeTab = null;
  if (!isMyPageActive) {
    const activeItem = currentNavItems.find(item => currentPath.startsWith(item.path));
    if (activeItem) activeTab = activeItem.id;
  }

  const handleNavClick = (path) => {
    navigate(path);
  };

  const handleModeToggle = () => {
    setIsAdminMode(!isAdminMode);
    navigate('/app/dashboard');
  };

  return (
    <>
      <S.HeaderContainer $isAdminMode={isAdminMode}>
        <S.InnerContent>
          <S.HeaderRow>
            {/* 왼쪽 영역 */}
            <S.LeftSection>
              <S.BrandGroup>
                <S.LogoBox onClick={() => navigate('/app/dashboard')}>
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
                    <><ArrowLeftRight /> 직원 모드 복귀</>
                  ) : (
                    <><ShieldCheck /> 관리자 전환</>
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
                    {isActive && <S.ActiveIndicator $isAdminMode={isAdminMode} />}
                  </S.NavButton>
                );
              })}
            </S.CenterNav>

            {/* 오른쪽 영역 */}
            <S.RightSection>
              <S.RightGroup>
                <S.ProfileButton
                  onClick={() => navigate('/app/mypage')}
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
                    <S.ProfileName $isActive={isMyPageActive} $isAdminMode={isAdminMode}>
                      {isAdminMode ? "관리자" : `${userName} 님`}
                    </S.ProfileName>
                    <S.ProfileRole $isAdminMode={isAdminMode}>
                      {isAdminMode ? "운영 총괄" : "상담 1팀"}
                    </S.ProfileRole>
                  </S.ProfileInfo>
                </S.ProfileButton>

                <S.ActionDivider $isAdminMode={isAdminMode}>
                  {/* 알림 버튼 및 팝업 */}
                  <div style={{ position: 'relative' }} ref={notificationRef}>
                    <S.IconButton
                      onClick={() => setShowNotifications(!showNotifications)}
                      $active={showNotifications}
                      $isAdminMode={isAdminMode}
                    >
                      <Bell size={20} />
                      <S.NotiDot />
                    </S.IconButton>

                    {showNotifications && (
                      <S.NotiPopover $isAdminMode={isAdminMode}>
                        <S.NotiHeader $isAdminMode={isAdminMode}>
                          <span>알림</span>
                          <button onClick={() => setShowNotifications(false)}>모두 읽음</button>
                        </S.NotiHeader>
                        <S.NotiList>
                          {notifications.map(notif => (
                            <S.NotiItem key={notif.id} $isAdminMode={isAdminMode}>
                              <S.NotiItemHeader $isAdminMode={isAdminMode}>
                                <span>{notif.title}</span>
                                <span>{notif.time}</span>
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
        <AllNotificationsModal onClose={() => setShowAllNotificationsModal(false)} />
      )}
    </>
  );
};

export default Header;
