// components/chat/ChatInput.tsx

import React, { useState } from 'react';
import { Button } from '@/app/components/ui/button';

type ChatInputProps = {
    onSendMessage: (message: string) => void;
};

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
    const [message, setMessage] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (message.trim()) {
            onSendMessage(message);
            setMessage(''); // Clear the input field after sending the message
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center p-2">
            <input
                type="text"
                value={message}
                onChange={handleChange}
                className="flex-1 rounded-md p-2 mr-2"
                placeholder="Type a message..."
            />
            <Button type="submit" >
                Send
            </Button>
        </form>
    );
};

export default ChatInput;
