// components/chat/ChatContext.tsx

"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

type ChatContextType = {
  selectedChatId: string | null;
  isNewChatMode: boolean;
  selectChat: (chatId: string) => void;
  setNewChatMode: (value: boolean) => void;
};

const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [isNewChatMode, setNewChatMode] = useState<boolean>(false);

  const selectChat = (chatId: string) => {
    setSelectedChatId(chatId);
  };

  return (
    <ChatContext.Provider value={{ selectedChatId, selectChat, isNewChatMode, setNewChatMode }}>
      {children}
    </ChatContext.Provider>
  );
};

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
