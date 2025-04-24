import { useCallback, useRef } from 'react';

export function useChatScroll() {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return { messagesEndRef, scrollToBottom };
} 