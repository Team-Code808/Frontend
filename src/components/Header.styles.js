import styled, { keyframes, css } from 'styled-components';

// Animations
const zoomIn = keyframes`
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
`;

const slideInBottom = keyframes`
  from { opacity: 0; transform: translateY(0.5rem); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideInTop = keyframes`
  from { opacity: 0; transform: translateY(-0.5rem); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: 50;
  transition: all 0.5s;
  border-bottom: 1px solid;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

  ${props => props.$isAdminMode ? css`
    background-color: #0f172a; /* slate-900 */
    border-color: #1e293b; /* slate-800 */
  ` : css`
    background-color: white;
    border-color: #f1f5f9; /* slate-100 */
  `}
`;

export const InnerContent = styled.div`
  max-width: 80rem;
  margin: 0 auto;
  padding: 0 1rem;
  
  @media (min-width: 768px) {
    padding: 0 2rem;
  }
`;

export const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  height: 5rem;
`;

/* Left Section */
export const LeftSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  min-width: 0;
`;

export const BrandGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-shrink: 0;
`;

export const LogoBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  
  /* Group hover equivalent: targeting the Logo component if possible, 
     or just applied generally */
  &:hover > :first-child {
    transform: scale(1.05);
  }
`;

export const BrandText = styled.span`
  font-size: 1.25rem; /* xl */
  font-weight: 900;
  letter-spacing: -0.05em;
  text-transform: uppercase;
  display: none;
  
  @media (min-width: 640px) {
    display: block;
  }
  
  ${props => props.$isAdminMode ? css`color: white;` : css`color: #2563eb;`}
`;

export const RoleBadge = styled.span`
  font-size: 0.625rem;
  opacity: 0.5;
  margin-left: 0.25rem;
  color: inherit;
`;

export const ModeToggleButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid;
  font-size: 0.6875rem; /* 11px */
  font-weight: 900;
  transition: all 0.2s;
  
  ${props => props.$isAdminMode ? css`
    background-color: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
    color: white;
    &:hover { background-color: rgba(255, 255, 255, 0.2); }
  ` : css`
    background-color: #1e293b;
    border-color: #1e293b;
    color: white;
    &:hover { background-color: #0f172a; }
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  `}

  svg {
    width: 0.875rem; 
    height: 0.875rem;
  }
`;

/* Center Navigation */
export const CenterNav = styled.nav`
  display: none;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  
  @media (min-width: 768px) {
    display: flex;
  }
  
  @media (min-width: 1024px) {
    gap: 3rem;
  }
`;

export const NavButton = styled.button`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.375rem;
  transition: all 0.2s;
  
  ${props => props.$isActive ? css`
    color: ${props.$isAdminMode ? '#818cf8' : '#2563eb'}; /* indigo-400 or blue-600 */
    
    svg {
      stroke-width: 2.5px;
    }
  ` : css`
    color: ${props.$isAdminMode ? '#64748b' : '#94a3b8'}; /* slate-500 or slate-400 */
    
    &:hover {
      color: ${props.$isAdminMode ? '#cbd5e1' : '#475569'}; /* slate-300 or slate-600 */
    }
    
    svg {
      stroke-width: 2px;
    }
  `}

  span {
    font-size: 0.6875rem; /* 11px */
    font-weight: 700;
    letter-spacing: -0.025em;
    white-space: nowrap;
  }
`;

export const ActiveIndicator = styled.div`
  position: absolute;
  bottom: -0.75rem;
  width: 0.25rem;
  height: 0.25rem;
  border-radius: 9999px;
  animation: ${zoomIn} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  background-color: ${props => props.$isAdminMode ? '#818cf8' : '#2563eb'};
`;

/* Right Section */
export const RightSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  min-width: 0;
`;

export const RightGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-shrink: 0;
`;

export const ProfileButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.375rem;
  padding-right: 0.75rem;
  border-radius: 0.75rem;
  transition: all 0.2s;
  border: 2px solid;

  ${props => props.$isAdminMode ? css`
    /* Admin Mode */
    ${props.$isActive ? css`
      background-color: rgba(238, 242, 255, 0.1);
      border-color: #6366f1; /* indigo-500 */
    ` : css`
      background-color: transparent;
      border-color: #1e293b;
      &:hover { border-color: #334155; }
    `}
  ` : css`
    /* Staff Mode Light */
    ${props.$isActive ? css`
      background-color: #eff6ff;
      border-color: #2563eb;
    ` : css`
      background-color: white;
      border-color: #f1f5f9;
      &:hover { border-color: #cbd5e1; }
    `}
  `}
`;

export const ProfileAvatar = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: colors 0.2s;
  
  ${props => props.$isAdminMode ? css`
    ${props.$isActive ? 'background: #eef2ff; color: white;' : 'background: #1e293b; color: #64748b;'}
  ` : css`
    ${props.$isActive ? 'background: #2563eb; color: white;' : 'background: #f1f5f9; color: #94a3b8;'}
  `}
`;

export const ProfileInfo = styled.div`
  text-align: left;
  display: none;
  
  @media (min-width: 1024px) {
    display: block;
  }
`;

export const ProfileName = styled.p`
  font-size: 0.6875rem;
  font-weight: 900;
  line-height: 1;
  margin-bottom: 0.125rem;
  
  ${props => props.$isAdminMode ? css`
    ${props.$isActive ? 'color: #818cf8;' : 'color: #cbd5e1;'}
  ` : css`
    ${props.$isActive ? 'color: #2563eb;' : 'color: #334155;'}
  `}
`;

export const ProfileRole = styled.p`
  font-size: 0.5625rem; /* 9px */
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: -0.05em;
  color: ${props => props.$isAdminMode ? '#64748b' : '#94a3b8'};
`;

export const ActionDivider = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  border-left: 1px solid;
  padding-left: 0.75rem;
  
  border-color: ${props => props.$isAdminMode ? '#1e293b' : '#f1f5f9'};
`;

export const IconButton = styled.button`
  position: relative;
  padding: 0.5rem;
  border-radius: 0.75rem;
  transition: all 0.2s;
  
  /* Shared Base */
  background-color: ${props => props.$active ? '#eff6ff' : 'transparent'};
  color: ${props => props.$active
    ? (props.$isAdminMode ? '#818cf8' : '#60a5fa')
    : (props.$isAdminMode ? '#64748b' : '#94a3b8')
  };

  /* Hovers */
  &:hover {
    ${props => props.$isAdminMode ? css`
      color: #818cf8;
      background-color: rgba(255,255,255,0.05);
    ` : css`
      color: ${props.$logout ? '#f87171' : '#2563eb'};
      background-color: ${props.$logout ? '#fef2f2' : '#eff6ff'};
    `}
  }
  
  /* Specific override for logout hover text color logic if needed more strictly */
  ${props => props.$logout && css`
    &:hover {
        color: ${props.$isAdminMode ? '#f87171' : '#ef4444'}; /* red-400 or red-500 */
    }
  `}
`;

/* Notifications Popover */
export const NotiDot = styled.span`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 0.375rem;
  height: 0.375rem;
  background-color: #ef4444;
  border-radius: 9999px;
  border: 1px solid #0f172a;
`;

export const NotiPopover = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.75rem;
  width: 20rem;
  border-radius: 1rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  border: 1px solid;
  overflow: hidden;
  z-index: 100;
  animation: ${slideInTop} 0.2s ease-out;

  ${props => props.$isAdminMode ? css`
    background-color: #0f172a;
    border-color: #1e293b;
  ` : css`
    background-color: white;
    border-color: #f1f5f9;
  `}
`;

export const NotiHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  ${props => props.$isAdminMode ? css`
    border-color: #1e293b;
    background-color: rgba(30, 41, 59, 0.5);
    span { color: white; }
    button { color: #64748b; &:hover { color: #cbd5e1; } }
  ` : css`
    border-color: #f8fafc;
    background-color: rgba(248, 250, 252, 0.5);
    span { color: #1e293b; }
    button { color: #94a3b8; &:hover { color: #475569; } }
  `}

  span {
    font-size: 0.875rem;
    font-weight: 900;
  }
  
  button {
    font-size: 0.75rem;
    font-weight: 700;
  }
`;

export const NotiList = styled.div`
  max-height: 300px;
  overflow-y: auto;
`;

export const NotiItem = styled.div`
  padding: 1rem;
  border-bottom: 1px solid;
  transition: background-color 0.2s;
  cursor: pointer;
  
  ${props => props.$isAdminMode ? css`
    border-color: #1e293b;
    &:hover { background-color: #1e293b; }
  ` : css`
    border-color: #f8fafc;
    &:hover { background-color: #f8fafc; }
  `}
`;

export const NotiItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.25rem;
  
  span:first-child {
    font-size: 0.75rem;
    font-weight: 900;
    transition: color 0.2s;
    ${props => props.$isAdminMode
    ? css`color: #cbd5e1; ${NotiItem}:hover & { color: #818cf8; }`
    : css`color: #334155; ${NotiItem}:hover & { color: #2563eb; }`
  }
  }
  
  span:last-child {
    font-size: 0.625rem; /* 10px */
    color: #94a3b8;
  }
`;

export const NotiMessage = styled.p`
  font-size: 0.75rem;
  line-height: 1.625;
  font-weight: 500;
  color: #64748b;
`;

export const NotiFooter = styled.div`
  padding: 0.75rem;
  text-align: center;
  
  ${props => props.$isAdminMode ? 'background-color: rgba(30, 41, 59, 0.5);' : 'background-color: rgba(248, 250, 252, 0.5);'}
  
  button {
    font-size: 0.75rem;
    font-weight: 700;
    transition: color 0.2s;
    
    ${props => props.$isAdminMode
    ? css`color: #64748b; &:hover { color: #818cf8; }`
    : css`color: #94a3b8; &:hover { color: #2563eb; }`
  }
  }
`;

/* Modal Styles */
export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

export const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  background-color: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(4px);
  animation: ${fadeIn} 0.2s ease-out;
`;

export const ModalContent = styled.div`
  position: relative;
  background-color: white;
  width: 100%;
  max-width: 32rem;
  border-radius: 2rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  border: 1px solid #f1f5f9;
  display: flex;
  flex-direction: column;
  max-height: 80vh;
  animation: ${zoomIn} 0.2s ease-out;
`;

export const ModalHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #f8fafc;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  z-index: 10;
  
  h2 {
    font-size: 1.25rem;
    font-weight: 900;
    color: #1e293b;
  }
  
  p {
    font-size: 0.75rem;
    font-weight: 700;
    color: #94a3b8;
    margin-top: 0.25rem;
  }
`;

export const CloseButton = styled.button`
  padding: 0.5rem;
  border-radius: 9999px;
  transition: background-color 0.2s;
  
  &:hover { background-color: #f8fafc; }
  
  svg {
    color: #94a3b8;
  }
`;

export const ModalTabs = styled.div`
  padding: 0.75rem 1.5rem;
  background-color: rgba(248, 250, 252, 0.5);
  display: flex;
  gap: 0.5rem;
  border-bottom: 1px solid #f8fafc;
`;

export const ModalTabButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  font-size: 0.75rem;
  font-weight: 900;
  transition: all 0.2s;
  
  ${props => props.active ? css`
    background-color: white;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05);
    border: 1px solid #f1f5f9;
    color: ${props.color || '#1e293b'};
  ` : css`
    color: #94a3b8;
    &:hover { color: #475569; }
  `}
`;

export const ModalList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const ModalItem = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  border: 1px solid;
  transition: background-color 0.2s;
  
  ${props => props.read ? css`
    background-color: white;
    border-color: #f1f5f9;
    &:hover { background-color: #f8fafc; }
  ` : css`
    background-color: rgba(238, 242, 255, 0.3);
    border-color: #e0e7ff;
  `}
`;

export const IconBox = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  ${props => props.type === 'success' && css`background: #d1fae5; color: #059669;`}
  ${props => props.type === 'alert' && css`background: #ffe4e6; color: #e11d48;`}
  ${props => props.type === 'notice' && css`background: #fef3c7; color: #d97706;`}
  ${props => props.type === 'info' && css`background: #dbeafe; color: #2563eb;`}
`;

export const ListContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const ListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.25rem;
  
  h4 {
    font-size: 0.875rem;
    font-weight: 900;
    color: ${props => props.read ? '#475569' : '#0f172a'};
  }
  
  span {
    font-size: 0.625rem;
    font-weight: 700;
    color: #94a3b8;
    white-space: nowrap;
    margin-left: 0.5rem;
  }
`;

export const ListMessage = styled.p`
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 500;
  line-height: 1.625;
`;

export const ListUnreadDot = styled.div`
  width: 0.375rem;
  height: 0.375rem;
  border-radius: 9999px;
  background-color: #6366f1;
  margin-top: 0.375rem;
`;
