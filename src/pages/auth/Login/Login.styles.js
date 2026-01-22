import styled, { keyframes, css } from "styled-components";

// Animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideInRight = keyframes`
  from { transform: translateX(2rem); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const zoomIn = keyframes`
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`;

// Common Styles
const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Container = styled.div`
  min-height: 100vh;
  background-color: #f8fafc; /* bg-slate-50 */
  ${flexCenter}
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
`;

export const BackgroundDecor = styled.div`
  position: absolute;
  width: 40%;
  height: 40%;
  border-radius: 9999px;
  filter: blur(120px);
  z-index: 0;

  ${(props) =>
    props.type === "blue" &&
    css`
      top: -10%;
      left: -10%;
      background-color: rgba(191, 219, 254, 0.3); /* bg-blue-200/30 */
    `}

  ${(props) =>
    props.type === "indigo" &&
    css`
      bottom: -10%;
      right: -10%;
      background-color: rgba(199, 210, 254, 0.3); /* bg-indigo-200/30 */
    `}
`;

export const Card = styled.div`
  width: 100%;
  max-width: 1000px;
  display: grid;
  grid-template-columns: 1fr;
  background-color: white;
  border-radius: 48px;
  box-shadow: 0 25px 50px -12px rgba(226, 232, 240, 0.5); /* shadow-2xl shadow-slate-200/50 */
  overflow: hidden;
  position: relative;
  z-index: 10;
  animation: ${zoomIn} 0.5s ease-out;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const VisualSidebar = styled.div`
  display: none;
  flex-direction: column;
  justify-content: space-between;
  padding: 3rem;
  background-color: #2563eb; /* bg-blue-600 */
  color: white;
  position: relative;

  @media (min-width: 768px) {
    display: flex;
  }
`;

export const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  div {
    width: 2.5rem;
    height: 2.5rem;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 1rem;
    ${flexCenter}
    backdrop-filter: blur(12px);
  }

  span {
    font-size: 1.25rem;
    font-weight: 900;
    letter-spacing: -0.05em;
    text-transform: uppercase;
  }
`;

export const HeroText = styled.div`
  h2 {
    font-size: 2.25rem;
    font-weight: 900;
    line-height: 1.2;
    margin-bottom: 1.5rem;
    letter-spacing: -0.025em;
    white-space: pre-line;
  }

  p {
    color: #dbeafe; /* text-blue-100 */
    font-size: 1.125rem;
    font-weight: 500;
    line-height: 1.625;
    opacity: 0.8;
  }
`;

export const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);

  span {
    font-size: 0.875rem;
    font-weight: 700;
  }
`;

export const FormContainer = styled.div`
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-height: 95vh;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 768px) {
    padding: 4rem;
  }
`;

export const FormHeader = styled.div`
  margin-bottom: 2rem;
  text-align: center;

  @media (min-width: 768px) {
    text-align: left;
  }

  h3 {
    font-size: 2.25rem;
    font-weight: 900;
    color: #1e293b; /* text-slate-800 */
    margin-bottom: 0.5rem;
  }

  p {
    color: #94a3b8; /* text-slate-400 */
    font-weight: 700;
    font-size: 1rem;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  /* Applying slide-in animation if it's not the initial load */
  ${(props) =>
    props.animate &&
    css`
      animation: ${slideInRight} 0.3s ease-out;
    `}
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-size: 0.6875rem; /* 11px */
    font-weight: 900;
    color: #94a3b8; /* text-slate-400 */
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-left: 0.25rem;
  }
`;

export const InputWrapper = styled.div`
  position: relative;

  /* Icon positioning */
  svg {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    width: 1.25rem;
    height: 1.25rem;
    color: #cbd5e1; /* text-slate-300 */
    transition: color 0.2s;
  }

  &:focus-within svg {
    color: #3b82f6; /* text-blue-500 */
  }
`;

export const Input = styled.input`
  width: 100%;
  background-color: #f8fafc; /* bg-slate-50 */
  border: 2px solid transparent;
  border-radius: 1rem;
  padding: 1rem 1rem 1rem 3rem;
  font-size: 0.875rem;
  font-weight: 700;
  color: #334155; /* text-slate-700 */
  outline: none;
  transition: all 0.2s;

  &:focus {
    border-color: #2563eb; /* border-blue-600 */
  }

  ${(props) =>
    props.readOnly &&
    css`
      color: #64748b;
      cursor: not-allowed;
      background-color: #f1f5f9;
    `}

  ${(props) =>
    props.noIcon &&
    css`
      padding-left: 1rem;
    `}
`;

export const Select = styled.select`
  width: 100%;
  background-color: #f8fafc;
  border: 2px solid transparent;
  border-radius: 1rem;
  padding: 1rem 1rem 1rem 3rem;
  font-size: 0.875rem;
  font-weight: 700;
  color: #334155;
  outline: none;
  transition: all 0.2s;
  appearance: none;
  cursor: pointer;

  &:focus {
    border-color: ${(props) =>
      props.$variant === "indigo" ? "#4f46e5" : "#2563eb"};
  }

  ${(props) =>
    props.noIcon &&
    css`
      padding-left: 1rem;
    `}
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 1.5rem;
  border-radius: 2rem;
  font-weight: 900;
  font-size: 1.25rem;
  background-color: #2563eb; /* bg-blue-600 */
  color: white;
  box-shadow: 0 10px 15px -3px rgba(219, 234, 254, 1); /* shadow-blue-100 */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  transition: all 0.1s;
  margin-top: 1.5rem;

  &:hover {
    background-color: #1d4ed8; /* hover:bg-blue-700 */
  }

  &:active {
    transform: scale(0.98);
  }

  ${(props) =>
    props.$variant === "dark" &&
    css`
      background-color: #0f172a; /* bg-slate-900 */
      box-shadow: 0 10px 15px -3px rgba(226, 232, 240, 1); /* shadow-slate-200 */
      &:hover {
        background-color: #1e293b;
      }
    `}

  ${(props) =>
    props.$variant === "indigo" &&
    css`
      background-color: #4f46e5; /* bg-indigo-600 */
      box-shadow: 0 10px 15px -3px rgba(224, 231, 255, 1); /* shadow-indigo-100 */
      &:hover {
        background-color: #4338ca;
      }
    `}
`;

export const LinkButton = styled.button`
  font-size: 0.875rem;
  font-weight: 700;
  color: #94a3b8; /* text-slate-400 */
  transition: color 0.2s;

  &:hover {
    color: #2563eb; /* text-blue-600 */
  }
`;

export const TypeButton = styled.button`
  width: 100%;
  padding: 1.5rem;
  text-align: left;
  background-color: #f8fafc; /* bg-slate-50 */
  border: 2px solid transparent;
  border-radius: 1.5rem;
  transition: all 0.3s;

  &:hover {
    background-color: #f1f5f9; /* hover:bg-slate-100 */
    /* Dynamic border color based on type not nicely handled without props, hardcoding typical hover */
    border-color: #cbd5e1;
  }

  ${(props) =>
    props.activeType === "company" &&
    css`
      &:hover {
        border-color: #3b82f6;
      } /* hover:border-blue-500 */
    `}
  ${(props) =>
    props.activeType === "staff" &&
    css`
      &:hover {
        border-color: #6366f1;
      } /* hover:border-indigo-500 */
    `}

  h4 {
    font-size: 1.125rem;
    font-weight: 900;
    color: #1e293b;
    margin-bottom: 0.25rem;
  }

  p {
    font-size: 0.875rem;
    font-weight: 500;
    color: #64748b;
  }
`;

export const IconBox = styled.div`
  width: 3rem;
  height: 3rem;
  background-color: ${(props) =>
    props.color === "blue"
      ? "rgba(59, 130, 246, 0.1)"
      : "rgba(99, 102, 241, 0.1)"};
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.color === "blue" ? "#2563eb" : "#4f46e5")};
  margin-bottom: 1rem;
  transition: transform 0.2s;

  ${TypeButton}:hover & {
    transform: scale(1.1);
  }
`;

export const BackButton = styled.button`
  padding: 0.5rem;
  border-radius: 9999px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f1f5f9;
  }

  svg {
    color: #94a3b8;
  }
`;

export const StepHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;

  h3 {
    font-size: 1.25rem;
    font-weight: 900;
    color: #1e293b;
  }
`;

export const Grid2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

export const InfoBox = styled.div`
  background-color: ${(props) =>
    props.$variant === "blue"
      ? "#eff6ff"
      : "#e0e7ff"}; /* bg-blue-50 or indigo-50 */
  padding: 1rem;
  border-radius: 1rem;
  border: 1px solid
    ${(props) => (props.$variant === "blue" ? "#dbeafe" : "#e0e7ff")};

  p {
    font-size: 0.75rem;
    font-weight: 700;
    color: ${(props) => (props.$variant === "blue" ? "#1d4ed8" : "#4338ca")};
    line-height: 1.625;
  }
`;

export const VerifyButton = styled.button`
  padding: 1rem 1.5rem;
  background-color: #4f46e5;
  color: white;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 900;
  white-space: nowrap;
  transition: all 0.2s;
  border: none;
  cursor: pointer;

  &:hover:not(:disabled) {
    background-color: #4338ca;
  }

  &:disabled {
    background-color: #cbd5e1;
    cursor: not-allowed;
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }
`;

export const VerificationMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 0.75rem;
  font-size: 0.875rem;
  font-weight: 700;
  margin-top: 0.5rem;
  animation: ${fadeIn} 0.3s ease-out;

  ${(props) =>
    props.success &&
    css`
      background-color: #d1fae5;
      color: #065f46;
      border: 1px solid #6ee7b7;
    `}

  ${(props) =>
    props.error &&
    css`
      background-color: #fee2e2;
      color: #991b1b;
      border: 1px solid #fca5a5;
    `}
  
  svg {
    flex-shrink: 0;
  }
`;
