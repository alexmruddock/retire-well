import prisma from "@/lib/db/prisma";
import { getXataClient } from "@/xata";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const userId = searchParams.get("userId");

    if (!userId) {
        return new Response(JSON.stringify({ error: "User ID is required" }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    try {
        const chats = await prisma.chat.findMany({
            where: {
                participants: {
                    some: {
                        userId: userId
                    }
                }
            }
        });
        return new Response(JSON.stringify({ chats }), {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error("Database access error:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}

export async function POST(request: Request) {
    const body = await request.json();
    const xata = getXataClient();

    const userId = body.userId;
    const receiverId = body.receiverId;

    if (!userId) {
        return new Response(JSON.stringify({ error: "User ID is required" }), {
            status: 400,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    const userName = await xata.db.users.filter({ user_id: userId }).getMany().then(data => data[0].name);
    const receiverName = await xata.db.users.filter({ user_id: receiverId }).getMany().then(data => data[0].name);

    console.log("User ID: ", userId);
    console.log("Receiver ID: ", receiverId);
    console.log("User Name: ", userName);
    console.log("Receiver Name: ", receiverName);

    try {
        if (userId && receiverId && userName && receiverName) {
            const participantsData = [
                { userId: userId, name: userName },
                { userId: receiverId, name: receiverName }
            ]

            console.log("Participants Array: ", participantsData);

            const newChat = await prisma.chat.create({
                data: {
                    participants: participantsData,
                },
            });
            return new Response(JSON.stringify({ newChat }), {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        } else {
            return new Response(JSON.stringify({ error: "User ID and Receiver ID are required" }), {
                status: 400,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
    } catch (error) {
        console.error("Database access error:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}