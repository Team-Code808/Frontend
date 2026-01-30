import styled, { keyframes, css } from 'styled-components';


// Animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideInRight = keyframes`
  from { opacity: 0; transform: translateX(2rem); }
  to { opacity: 1; transform: translateX(0); }
`;

const slideInBottom = keyframes`
  from { opacity: 0; transform: translateY(1rem); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Container = styled.div`
  max-width: 80rem; /* 7xl */
  margin: 0 auto;
  padding-bottom: 5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  color: #e2e8f0;
  animation: ${slideInBottom} 0.7s ease-out;
`;

/* Profile Edit View Styles */
export const EditContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  color: #e2e8f0;
  animation: ${slideInRight} 0.5s ease-out;
`;

export const EditHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;

  button {
    padding: 0.5rem;
    border-radius: 9999px;
    transition: background-color 0.2s;
    &:hover { background-color: #1e293b; }
    
    svg {
      width: 1.5rem;
      height: 1.5rem;
      color: #94a3b8;
    }
  }

  h2 {
    font-size: 1.5rem; /* 2xl */
    font-weight: 900;
    color: white;
  }
`;

export const EditGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const AvatarEditCard = styled.div`
  @media (min-width: 1024px) {
    grid-column: span 1 / span 1;
  }
  background-color: #0f172a;
  padding: 2rem;
  border-radius: 2rem;
  border: 1px solid #1e293b;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const AvatarCircle = styled.div`
  width: 10rem;
  height: 10rem;
  background-color: #1e293b;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3.75rem; /* 6xl */
  border: 4px solid #334155;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  transition: transform 0.2s;
  
  &:hover { transform: scale(1.05); }
`;



export const FormCard = styled.div`
  @media (min-width: 1024px) {
    grid-column: span 2 / span 2;
  }
  background-color: #0f172a;
  padding: 2rem;
  border-radius: 2rem;
  border: 1px solid #1e293b;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-size: 0.75rem; /* xs */
    font-weight: 900;
    color: #64748b;
    text-transform: uppercase;
    margin-left: 0.25rem;
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 1rem;
  border: 1px solid transparent;
  transition: all 0.2s;
  
  ${props => props.readonly
    ? 'background-color: rgba(30, 41, 59, 0.5);'
    : 'background-color: #1e293b; border-color: #334155; &:focus-within { border-color: #6366f1; box-shadow: 0 0 0 2px rgba(79, 70, 229, 0.2); }'
  }
  
  svg {
    width: 1.125rem;
    height: 1.125rem;
    color: ${props => props.active ? '#6366f1' : '#64748b'};
  }
  
  span {
    font-weight: 700;
    color: #cbd5e1;
  }
  
  input {
    width: 100%;
    background-color: transparent;
    outline: none;
    font-weight: 700;
    color: #cbd5e1;
    
    &::placeholder { color: #475569; }
  }
`;

export const Badge = styled.span`
  margin-left: auto;
  font-size: 0.625rem; /* 10px */
  background-color: #1e293b;
  color: #64748b;
  padding: 0.125rem 0.5rem;
  border-radius: 0.25rem;
  font-weight: 700;
`;

export const PasswordSection = styled.div`
  padding-top: 1.5rem;
  border-top: 1px solid #1e293b;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  
  h3 {
    font-size: 0.875rem; /* sm */
    font-weight: 900;
    color: #cbd5e1;
    margin-left: 0.5rem;
  }
`;

export const ActionButtons = styled.div`
  padding-top: 1rem;
  border-top: 1px solid #1e293b;
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
`;

export const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 700;
  transition: all 0.2s;
  
  ${props => props.primary
    ? 'background-color: #4f46e5; color: white; box-shadow: 0 10px 15px -3px rgba(49, 46, 129, 0.2); &:hover { background-color: #4338ca; }'
    : 'color: #64748b; &:hover { background-color: #1e293b; }'
  }

  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

/* Main View Styles */
export const MainHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 0.5rem;

  h1 {
    font-size: 2.25rem; /* 4xl */
    font-weight: 900;
    /* color prop handled inline or inherited */
    letter-spacing: -0.025em;
  }
  
  p {
    font-weight: 600;
    margin-top: 0.5rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-size: 0.75rem; /* xs */
  }
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 1024px) {
    grid-template-columns: repeat(12, 1fr);
  }
`;

export const LeftCol = styled.div`
  @media (min-width: 1024px) {
    grid-column: span 4 / span 4;
  }
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const ProfileCard = styled.div`
  background-color: #0f172a;
  border: 1px solid #1e293b;
  padding: 2.5rem;
  border-radius: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
`;

export const ProfileAvatar = styled.div`
  position: relative;
  margin-bottom: 2rem;
  
  /* Avatar Circle */
  > div {
    position: relative;
    width: 8rem;
    height: 8rem;
    background-color: #1e293b;
    border-radius: 2.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem; /* 5xl */
    border: 4px solid #334155;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    overflow: hidden;
    transition: transform 0.5s;
    
    &:hover { transform: scale(1.05); }
  }
  
  /* Edit Button */
  button {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0.75rem;
    background-color: #4f46e5;
    color: white;
    border-radius: 1rem;
    border: 4px solid #0f172a;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    transition: background-color 0.2s;
    
    &:hover { background-color: #4338ca; }
  }
`;

export const ProfileInfo = styled.div`
  margin-top: 0.5rem;
  
  h2 {
    font-size: 1.5rem; /* 2xl */
    font-weight: 900;
    letter-spacing: -0.025em;
  }
  
  p {
    color: #818cf8; /* indigo-400 */
    font-weight: 900;
    font-size: 0.875rem; /* sm */
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-top: 0.25rem;
  }
`;

export const ContactList = styled.div`
  width: 100%;
  margin-top: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.2s;
  
  &:hover {
    border-color: rgba(99, 102, 241, 0.3);
    
    /* Child interaction */
    div:first-child {
      color: #818cf8;
    }
    
    div:last-child p:last-child {
      color: white;
    }
  }
`;

export const ItemIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  background-color: #1e293b;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  box-shadow: inset 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition: color 0.2s;
`;

export const ItemText = styled.div`
  text-align: left;
  
  p:first-child {
    font-size: 0.625rem;
    font-weight: 900;
    color: #475569;
    text-transform: uppercase;
    letter-spacing: -0.05em;
  }
  
  p:last-child {
    font-size: 0.875rem; /* sm */
    font-weight: 700;
    color: #cbd5e1;
    transition: color 0.2s;
  }
`;

export const EditProfileBtn = styled.button`
  width: 100%;
  margin-top: 2rem;
  padding: 1rem;
  background-color: #4f46e5;
  color: white;
  border-radius: 1rem;
  font-weight: 900;
  font-size: 0.875rem; /* sm */
  transition: all 0.2s;
  box-shadow: 0 10px 15px -3px rgba(49, 46, 129, 0.2);
  
  &:hover { background-color: #4338ca; }
  &:active { transform: scale(0.95); }
`;

export const PermissionCard = styled.div`
  background-color: #4f46e5;
  padding: 2rem;
  border-radius: 2.5rem;
  color: white;
  overflow: hidden;
  position: relative;
  border: 1px solid rgba(99, 102, 241, 0.5);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
`;

export const PermissionContent = styled.div`
  position: relative;
  z-index: 10;
  
  h3 {
    font-size: 1.25rem; /* xl */
    font-weight: 900;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  p {
    color: #e0e7ff; /* indigo-100 */
    font-size: 0.875rem; /* sm */
    font-weight: 500;
    line-height: 1.625;
  }
`;

export const CertifiedBadge = styled.div`
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  span {
    font-size: 0.75rem; /* xs */
    font-weight: 700;
    color: #e0e7ff;
  }
`;

export const LockIconBg = styled.div`
  position: absolute;
  bottom: -2.5rem;
  right: -2.5rem;
  width: 12rem;
  height: 12rem;
  opacity: 0.1;
  transform: rotate(12deg);
  
  svg {
    width: 100%;
    height: 100%;
  }
`;

export const RightCol = styled.div`
  @media (min-width: 1024px) {
    grid-column: span 8 / span 8;
  }
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const CodeCard = styled.div`
  background-color: #0f172a;
  border: 1px solid #1e293b;
  padding: 2rem;
  border-radius: 2.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  transition: all 0.3s;
`;

export const CodeContent = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

export const CodeText = styled.div`
  h3 {
    font-size: 1.25rem; /* xl */
    font-weight: 900;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  
  p {
    font-size: 0.875rem; /* sm */
    font-weight: 500;
  }
`;

export const CodeBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 0.5rem 0.5rem 0.5rem 1.5rem;
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  span {
    font-size: 1.5rem; /* 2xl */
    font-weight: 900;
    letter-spacing: 0.1em;
    font-family: monospace;
  }
  
  button {
    padding: 0.75rem;
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
    border-radius: 0.75rem;
    transition: all 0.2s;
    
    &:hover { background-color: rgba(255, 255, 255, 0.2); }
    &:active { transform: scale(0.95); }
  }
`;

export const KeyIconBg = styled.div`
  position: absolute;
  top: -1.5rem;
  right: -1.5rem;
  width: 10rem;
  height: 10rem;
  color: rgba(16, 185, 129, 0.05); /* emerald-500/5 */
  transform: rotate(12deg);
  
  svg {
    width: 100%;
    height: 100%;
  }
`;

export const SettingsCard = styled.div`
  background-color: #0f172a;
  border: 1px solid #1e293b;
  padding: 2rem;
  border-radius: 2.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  
  h3 {
    font-size: 1.25rem; /* xl */
    font-weight: 900;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

export const SettingsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SettingsItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem;
  background-color: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 2rem;
  transition: all 0.2s;
  text-align: left;
  
  &:hover {
    border-color: rgba(99, 102, 241, 0.5);
    
    /* Child interaction */
    > div > div:first-child {
      color: #818cf8;
    }
  }
  
  /* Select ChevronRight when it is a direct child */
  > svg {
    transition: all 0.2s;
  }

  &:hover > svg {
    color: #818cf8;
    transform: translateX(0.25rem);
  }
`;

export const ItemLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const IconWrapper = styled.div`
  width: 3rem;
  height: 3rem;
  background-color: #1e293b;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  transition: color 0.2s;
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
`;

export const TextWrapper = styled.div`
  p:first-child {
    font-size: 0.875rem; /* sm */
    font-weight: 900;
    color: white;
  }
  
  p:last-child {
    font-size: 0.625rem; /* 10px */
    font-weight: 700;
    color: #64748b;
  }
`;


