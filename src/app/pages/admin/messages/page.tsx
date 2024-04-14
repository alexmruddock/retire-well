//admin/messages/page.tsx

import React, { useState } from 'react';
import ChatSidebar from '@/app/components/chat/ChatSidebar';
import ChatArea from '@/app/components/chat/ChatArea';
import { auth } from '@clerk/nextjs'; // Adjust according to your auth handling
import { ChatProvider } from '@/app/components/chat/ChatContext';
import { Button } from '@/app/components/ui/button';

export default async function AdminChatPage() {
  const { userId } = auth(); // This assumes you're using Clerk for authentication

  // button should open a new chat area with a search box at the top 
  // and should be able to search for users to chat with

  return (
    <ChatProvider>
      <div className="flex h-[calc(90vh)]">
        <div className="w-1/4 h-full">
          {userId && <ChatSidebar userId={userId} />}
        </div>
        <div className='flex-1 flex-col h-full'>
          {userId && <ChatArea userId={userId} />}
        </div>
      </div>
    </ChatProvider>
  );
}
