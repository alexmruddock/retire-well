"use client";

// Import React and useEffect, useState if you're using them
import React, { useEffect, useState } from 'react';

// Define a type for your component's props
type DisplayChatsProps = {
    userId: string;
};

export default function DisplayChats({ userId }: DisplayChatsProps) {
    // Since you're working with async data, you'll likely want to use useState and useEffect
    const [chats, setChats] = useState<string>('');

    useEffect(() => {
        async function getChats() {
            const chatUrlNoParam = `/api/chats?userId=${userId}`;
            const fetchedChats = await fetch(chatUrlNoParam, {
                method: 'GET'
            }).then(res => res.json()).then(data => data.chats);

            // Assuming fetchedChats is an array or object you might want to convert it to a string differently
            // This is just a placeholder conversion
            setChats(JSON.stringify(fetchedChats));
        }

        if (userId) {
            getChats();
        }
    }, [userId]); // Dependency array to re-run this effect when userId changes

    return (
        <div>
            <p>{chats}</p>
        </div>
    );
}

// Usage remains the same
