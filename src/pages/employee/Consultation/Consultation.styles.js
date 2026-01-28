import styled, { keyframes, css } from 'styled-components';

const slideInBottom = keyframes`
  from { opacity: 0; transform: translateY(1rem); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Container = styled.div`
  max-width: 64rem; /* 5xl */
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  animation: ${slideInBottom} 0.5s ease-out;
`;

export const Header = styled.div`
  h1 {
    font-size: 1.875rem; /* 3xl */
    font-weight: 800;
    color: #1e293b; /* slate-800 */
    margin-bottom: 0.25rem;
  }
  p {
    font-size: 1rem;
    font-weight: 500;
    color: #64748b; /* slate-500 */
  }
`;

export const MainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: 768px) {
    grid-column: span 1 / span 1;
  }
`;

export const RightColumn = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 1.5rem;
  border: 1px solid #f1f5f9;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

  @media (min-width: 768px) {
    grid-column: span 2 / span 2;
  }
`;

export const GuideCard = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: 1.5rem;
  border: 1px solid #f1f5f9;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

  h3 {
    font-weight: 700;
    color: #1e293b;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

export const GuideList = styled.ul`
  font-size: 0.875rem; /* sm */
  color: #64748b;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const GuideItem = styled.li`
  display: flex;
  gap: 0.5rem;
  
  span:first-child {
    color: #4f46e5; /* indigo-600 */
    font-weight: 700;
  }
`;

export const StatusCard = styled.div`
  background-color: #4f46e5; /* indigo-600 */
  padding: 1.5rem;
  border-radius: 1.5rem;
  color: white;
  box-shadow: 0 10px 15px -3px rgba(199, 210, 254, 1);

  h3 {
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
`;

export const StatusContent = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  div p:first-child {
    font-size: 1.875rem; /* 3xl */
    font-weight: 800;
  }
  
  div p:last-child {
    font-size: 0.75rem;
    opacity: 0.8;
  }

  svg {
    opacity: 0.4;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.label`
  display: block;
  font-weight: 700;
  color: #334155; /* slate-700 */
`;

export const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border-radius: 1rem;
  border: 1px solid #e2e8f0;
  outline: none;
  font-weight: 700;
  color: #334155;
  transition: all 0.2s;

  &:focus {
    border-color: #6366f1; /* indigo-500 */
    box-shadow: 0 0 0 2px #e0e7ff;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 12rem;
  padding: 1rem;
  border-radius: 1rem;
  border: 1px solid #e2e8f0;
  outline: none;
  resize: none;
  color: #475569; /* slate-600 */
  transition: all 0.2s;

  &:focus {
    border-color: #6366f1; /* indigo-500 */
    box-shadow: 0 0 0 2px #e0e7ff;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 1.25rem;
  border-radius: 1rem;
  font-weight: 700;
  font-size: 1.125rem; /* lg */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.2s;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);

  ${props => props.disabled ? css`
    background-color: #10b981; /* emerald-500 */
    color: white;
    cursor: default;
    box-shadow: 0 10px 15px -3px rgba(209, 250, 229, 1);
  ` : css`
    background-color: #4f46e5;
    color: white;
    box-shadow: 0 10px 15px -3px rgba(199, 210, 254, 1);
    &:hover { background-color: #4338ca; }
  `}
`;
