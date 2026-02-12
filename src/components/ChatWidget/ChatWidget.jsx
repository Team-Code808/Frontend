import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import useStore from '../../store/useStore';
import { chatApi } from '../../api/chatApi';
import * as S from './ChatWidget.styles';

const formatTime = () => {
  const now = new Date();
  return now.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

const ChatWidget = () => {
  const isAdminMode = useStore((state) => state.isAdminMode);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      content: '안녕하세요. Calm Desk 챗봇입니다. 무엇을 도와드릴까요?',
      time: formatTime(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isSending, setIsSending] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    const text = inputValue.trim();
    if (!text || isSending) return;

    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      time: formatTime(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsSending(true);

    try {
      const res = await chatApi.sendMessage(text);
      const reply = res?.data?.reply ?? '응답을 불러오지 못했습니다.';
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          role: 'assistant',
          content: reply,
          time: formatTime(),
        },
      ]);
    } catch (err) {
      const errorMsg =
        err.response?.data?.message || err.message || '챗봇 연결에 실패했습니다. 잠시 후 다시 시도해 주세요.';
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          role: 'assistant',
          content: errorMsg,
          time: formatTime(),
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <S.WidgetWrapper>
      <S.ChatPanel $open={isOpen} $admin={isAdminMode}>
        <S.PanelHeader $admin={isAdminMode}>
          <h3>챗봇</h3>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="챗봇 닫기"
          >
            <X size={20} />
          </button>
        </S.PanelHeader>
        <S.MessageList ref={listRef}>
          {messages.map((msg) => (
            <S.MessageBubble
              key={msg.id}
              $isUser={msg.role === 'user'}
              $admin={isAdminMode}
            >
              {msg.content}
              <S.MessageTime>{msg.time}</S.MessageTime>
            </S.MessageBubble>
          ))}
          {isSending && (
            <S.TypingIndicator $admin={isAdminMode} aria-label="응답 생성 중">
              <span />
              <span />
              <span />
            </S.TypingIndicator>
          )}
        </S.MessageList>
        <S.InputArea $admin={isAdminMode}>
          <S.ChatInput
            $admin={isAdminMode}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="메시지를 입력하세요..."
            rows={1}
            disabled={isSending}
          />
          <S.SendButton
            type="button"
            onClick={handleSend}
            disabled={!inputValue.trim() || isSending}
            aria-label="보내기"
          >
            <Send size={18} />
          </S.SendButton>
        </S.InputArea>
      </S.ChatPanel>
      <S.FloatButton
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? '챗봇 닫기' : '챗봇 열기'}
        $open={isOpen}
      >
        <MessageCircle />
      </S.FloatButton>
    </S.WidgetWrapper>
  );
};

export default ChatWidget;
