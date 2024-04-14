// components/chat/ChatSidebar.tsx

"use client";

import React, { useEffect, useState } from 'react';
import { useChat } from '@/app/components/chat/ChatContext';
import { Button } from '@/app/components/ui/button';

// Define a type for your component's props
type ChatSidebarProps = {
  userId: string;
};

type Participant = {
  userId: string;
  name: string;
}

type Chat = {
  id: string;
  participants: Participant[];
}

export default function ChatSidebar({ userId }: ChatSidebarProps) {
  const [fetchedChats, setFetchedChats] = useState<Chat[]>([]);
  const [chatsWithParticipantNames, setChatsWithParticipantNames] = useState([]);
  const { selectChat } = useChat();
  const { setNewChatMode } = useChat();

  const handleNewChatClick = () => {
    setNewChatMode(true);
  };

  useEffect(() => {
    async function getChats() {
      const chatUrlNoParam = `/api/chats?userId=${userId}`;
      const fetchedChats = await fetch(chatUrlNoParam, {
        method: 'GET'
      }).then(res => res.json()).then(data => 
        {
          console.log(data.chats)
          return data.chats
        });
      setFetchedChats(fetchedChats);
    }

    if (userId) {
      getChats();
    }
  }, [userId]);

  return (
    <div className="bg-gray-100 flex-col">
      <div className='flex items-center py-4 px-4 justify-between align-middle'>
        <h1 className='font-bold text-xl '>Chats</h1>
        <Button onClick={handleNewChatClick}>New Chat</Button>
      </div>
      {fetchedChats.map((fetchedChat) => (
        <div
          key={fetchedChat.id}
          onClick={() => selectChat(fetchedChat.id)}
          className="p-4 hover:bg-gray-200 cursor-pointer border overflow-auto"
        >
          ChatID: {fetchedChat.id}
          {fetchedChat.participants?.map((participant) => (
            <div key={participant.userId}>
                {participant.name}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};