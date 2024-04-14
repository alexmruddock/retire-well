// components/chat/ChatArea.tsx

"use client";

import React, { useEffect, useState } from 'react';
import { useChat } from '@/app/components/chat/ChatContext';
import ChatInput from '@/app/components/chat/ChatInput';
import { useUser } from '@clerk/nextjs';
import Image from 'next/image';

type Message = {
    id: string;
    senderId: string;
    receiverId: string;
    content: string;
    chatId: string;
    createdAt: Date;
};

type ChatAreaProps = {
    userId: string;
};

type User = {
    id: string;
    user_id: string;
    name: string;
};

export default function ChatArea({ userId }: ChatAreaProps) {
    const { user } = useUser();

    const [allMessagesSorted, setAllMessagesSorted] = useState<Message[]>([]);
    const { selectedChatId } = useChat();
    const { isNewChatMode } = useChat();
    const { selectChat } = useChat();
    const { setNewChatMode } = useChat();
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

    useEffect(() => {
        if (userId && selectedChatId) {
            getMessages();
        }
    }, [selectedChatId, userId]);

    // get the messages in a particular chat
    async function getMessages() {
        const messagesURL = `/api/messages?userId=${userId}`;

        try {
            const response = await fetch(messagesURL, { method: 'GET' });
            const { senderMessages, receiverMessages } = await response.json();

            // Combine and sort messages
            const allMessages = [...senderMessages, ...receiverMessages];
            const allMessagesSorted = allMessages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
            setAllMessagesSorted(allMessagesSorted.filter(message => message.chatId === selectedChatId));
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    }

    // send a message in a particular chat to a receiver
    const handleSendMessage = async (message: string) => {
        const sendMessageURL = `/api/messages`; // Adjust this URL according to your backend
        const senderId = userId;
        const chatId = selectedChatId;
        // API request to send the message
        await fetch(sendMessageURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chatId: chatId,
                senderId: senderId,
                content: message,
            }),
        });

        getMessages();
    };

    // find users based on the search query
    const findUsers = async (userId: string, searchQuery: string) => {
        const users: User[] = await fetch(`/api/users?userId=${userId}`, {
            method: 'GET',
        }).then(res => res.json()).then(data => data.filteredByOrg);
        console.log("Users retrieved from API call: ", users);

        const filtered = users.filter(user =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

        console.log("Filtered list from query: ", filtered);

        setFilteredUsers(filtered);
    }

    useEffect(() => {
        if (searchQuery !== '') {
            findUsers(userId, searchQuery);
        } else {
            setFilteredUsers([]); // Reset if search query is cleared
        }
    }, [userId, searchQuery]);

    useEffect(() => {
        console.log("Filtered users updated: ", filteredUsers);
    }, [filteredUsers]);

    const handleSelectUser = async (userId: string, receiverId: string) => {
        const newChatId = await fetch(`/api/chats`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
                receiverId: receiverId,
            }),
        }).then(res => res.json()).then(data => data.id);

        // we open the new chat and close the search mode 
        selectChat(newChatId);
        console.log("New chat ID: ", newChatId);

        setNewChatMode(false);
    }

    return (
        <div className='flex-1 flex flex-col overflow-y-scroll h-full'>
            {isNewChatMode ? (
                <>
                    <div className="flex p-4 gap-4">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="rounded-md p-2 w-full"
                            placeholder="Search for users..."
                        // Implement search logic here or in an event handler
                        />
                        <button
                            onClick={() => setNewChatMode(false)} // Assuming setNewChatMode is accessed from useChat
                            className="bg-gray-200 rounded-md p-3"
                        >
                            X
                        </button>
                    </div>
                    {filteredUsers.map((user) => (
                        <div
                            key={user.id}
                            onClick={() => handleSelectUser(userId, user.user_id)}
                            className="cursor-pointer p-2 hover:bg-gray-200"
                        >
                            {user.name}
                        </div>
                    ))}
                </>
            ) : (
                <>
                    <div className="flex flex-col space-y-2 px-2 py-2">
                        {allMessagesSorted.map((message) => (
                            <div
                                key={message.id}
                                className={`rounded-lg p-2 max-w-xs ${message.senderId === userId ? 'self-end bg-blue-100' : 'self-start bg-gray-100'}`}
                            >
                                <p className={`${message.senderId === userId ? 'text-right' : 'text-left'}`}>
                                    {message.content}
                                </p>
                                {/* {message.senderId === userId && user?.imageUrl && (
                                        <Image
                                            src={user.imageUrl}
                                            alt="User image"
                                            width={40}
                                            height={40}
                                            className='ml-2 rounded-full w-10 h-10 object-cover'
                                        />
                                    )} */}
                            </div>
                        ))}
                    </div>
                    <footer className="mt-auto">
                        <ChatInput onSendMessage={handleSendMessage} />
                    </footer>
                </>
            )}
        </div>
    );
};

