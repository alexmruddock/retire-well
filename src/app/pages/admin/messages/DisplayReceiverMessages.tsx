"use client";

// Import React and useEffect, useState if you're using them
import React, { useEffect, useState } from 'react';

type DisplayReceiverMessagesProps = {
    userId: string;
};
export default function DisplayReceiverMessages({ userId }: DisplayReceiverMessagesProps) {
    const [receiverMessages, setReceiverMessages] = useState<string>('');

    useEffect(() => {
        async function getReceiverMessages() {
            const receiverMessagesURL = `/api/messages?userId=${userId}`;
            const fetchedReceiverMessages = await fetch(receiverMessagesURL, {
                method: 'GET'
            }).then(res => res.json()).then(data => data.receiverMessages);

            setReceiverMessages(JSON.stringify(fetchedReceiverMessages));
        }

        if (userId) {
            getReceiverMessages();
        }
    }, [userId]);
  return (
    <div>
        <p>{receiverMessages}</p>
    </div>
  )
}