import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: scale(0.95) translateY(8px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
`;

const pulse = keyframes`
  0%, 100% { box-shadow: 0 4px 14px rgba(99, 102, 241, 0.35); }
  50% { box-shadow: 0 4px 20px rgba(99, 102, 241, 0.5); }
`;

const typingDots = keyframes`
  0%, 20% { opacity: 0.3; }
  50% { opacity: 1; }
  100% { opacity: 0.3; }
`;

export const WidgetWrapper = styled.div`
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0;
  font-family: inherit;
`;

export const ChatPanel = styled.div`
  display: ${(p) => (p.$open ? 'flex' : 'none')};
  flex-direction: column;
  width: 22rem;
  max-width: calc(100vw - 3rem);
  height: 28rem;
  max-height: calc(100vh - 8rem);
  background: ${(p) => (p.$admin ? '#0f172a' : '#ffffff')};
  border: 1px solid ${(p) => (p.$admin ? '#1e293b' : '#e2e8f0')};
  border-radius: 1rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  animation: ${fadeIn} 0.2s ease-out;
  overflow: hidden;
  margin-bottom: 0.75rem;
`;

export const PanelHeader = styled.div`
  padding: 1rem 1.25rem;
  background: ${(p) => (p.$admin ? '#1e293b' : '#f1f5f9')};
  border-bottom: 1px solid ${(p) => (p.$admin ? '#334155' : '#e2e8f0')};
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;

  h3 {
    font-size: 0.9375rem;
    font-weight: 700;
    color: ${(p) => (p.$admin ? '#e2e8f0' : '#1e293b')};
  }

  button {
    padding: 0.35rem;
    border-radius: 0.5rem;
    color: ${(p) => (p.$admin ? '#94a3b8' : '#64748b')};
    transition: color 0.15s, background 0.15s;

    &:hover {
      color: ${(p) => (p.$admin ? '#e2e8f0' : '#1e293b')};
      background: ${(p) => (p.$admin ? '#334155' : '#e2e8f0')};
    }
  }
`;

export const MessageList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-height: 0;
`;

export const MessageBubble = styled.div`
  max-width: 85%;
  padding: 0.625rem 1rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  line-height: 1.5;
  word-break: break-word;
  align-self: ${(p) => (p.$isUser ? 'flex-end' : 'flex-start')};
  white-space: pre-wrap;

  ${(p) =>
    p.$isUser
      ? `
    background: #6366f1;
    color: #fff;
    border-bottom-right-radius: 0.25rem;
  `
      : `
    background: ${p.$admin ? '#1e293b' : '#f1f5f9'};
    color: ${p.$admin ? '#e2e8f0' : '#334155'};
    border-bottom-left-radius: 0.25rem;
    border: 1px solid ${p.$admin ? '#334155' : '#e2e8f0'};
  `}
`;

export const MessageTime = styled.span`
  display: block;
  margin-top: 0.25rem;
  font-size: 0.6875rem;
  opacity: 0.8;
`;

export const TypingIndicator = styled.div`
  align-self: flex-start;
  padding: 0.75rem 1.25rem;
  border-radius: 1rem;
  border-bottom-left-radius: 0.25rem;
  background: ${(p) => (p.$admin ? '#1e293b' : '#f1f5f9')};
  border: 1px solid ${(p) => (p.$admin ? '#334155' : '#e2e8f0')};
  display: flex;
  gap: 0.25rem;
  align-items: center;

  span {
    width: 0.375rem;
    height: 0.375rem;
    border-radius: 50%;
    background: ${(p) => (p.$admin ? '#94a3b8' : '#64748b')};
    animation: ${typingDots} 1.4s ease-in-out infinite both;

    &:nth-child(1) { animation-delay: 0s; }
    &:nth-child(2) { animation-delay: 0.2s; }
    &:nth-child(3) { animation-delay: 0.4s; }
  }
`;

export const InputArea = styled.div`
  padding: 0.75rem 1rem;
  border-top: 1px solid ${(p) => (p.$admin ? '#334155' : '#e2e8f0')};
  background: ${(p) => (p.$admin ? '#0f172a' : '#ffffff')};
  flex-shrink: 0;
  display: flex;
  gap: 0.5rem;
  align-items: flex-end;
`;

export const ChatInput = styled.textarea`
  flex: 1;
  min-height: 2.5rem;
  max-height: 6rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.75rem;
  border: 1px solid ${(p) => (p.$admin ? '#334155' : '#e2e8f0')};
  background: ${(p) => (p.$admin ? '#1e293b' : '#f8fafc')};
  color: ${(p) => (p.$admin ? '#e2e8f0' : '#1e293b')};
  font-size: 0.875rem;
  resize: none;
  transition: border-color 0.15s, box-shadow 0.15s;

  &::placeholder {
    color: ${(p) => (p.$admin ? '#64748b' : '#94a3b8')};
  }

  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2);
  }
`;

export const SendButton = styled.button`
  flex-shrink: 0;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.75rem;
  background: #6366f1;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s, transform 0.1s;

  &:hover:not(:disabled) {
    background: #4f46e5;
  }

  &:active:not(:disabled) {
    transform: scale(0.96);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const FloatButton = styled.button`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  box-shadow: 0 4px 14px rgba(99, 102, 241, 0.35);
  transition: transform 0.2s, box-shadow 0.2s;
  animation: ${pulse} 2.5s ease-in-out infinite;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(99, 102, 241, 0.45);
  }

  &:active {
    transform: scale(0.98);
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
    transition: transform 0.2s;
  }

  ${(p) =>
    p.$open &&
    `
    svg {
      transform: rotate(90deg);
    }
  `}
`;
