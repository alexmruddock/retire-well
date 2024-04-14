"use client";

// Import React and useEffect, useState if you're using them
import React, { useEffect, useState } from 'react';

type DisplaySenderMessagesProps = {
    userId: string;
};

export default function DisplaySenderMessages({ userId }: DisplaySenderMessagesProps) {
    const [senderMessages, setSenderMessages] = useState<string>('');

    useEffect(() => {
        async function getSenderMessages() {
            const senderMessagesURL = `/api/messages?userId=${userId}`;
            const fetchedSenderMessages = await fetch(senderMessagesURL, {
                method: 'GET'
            }).then(res => res.json()).then(data => data.senderMessages);

            setSenderMessages(JSON.stringify(fetchedSenderMessages));
        }

        if (userId) {
            getSenderMessages();
        }
    }, [userId]);

  return (
    <div>
        <p>{senderMessages}</p>
    </div>
  )
}