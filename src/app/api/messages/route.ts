import prisma from "@/lib/db/prisma";

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
        const senderMessages = await prisma.message.findMany({
            where: {
                senderId: userId
            }
        });
        const receiverMessages = await prisma.message.findMany({
            where: {
                receiverId: userId
            }
        });
        return new Response(JSON.stringify({ senderMessages, receiverMessages }), {
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
    const { content, senderId, chatId } = await request.json();

    try {
        const chat = await prisma.chat.findFirst({
            where: {
                id: chatId,
            },
        });
        console.log("Participants: ", chat?.participants)
        
        const receiverId = chat?.participants.find(p => p.userId !== senderId)?.userId;
        
        console.log("ReceiverId: ",receiverId);

        if (content && senderId && receiverId) {
            try {
                const message = await prisma.message.create({
                    data: {
                        content,
                        senderId,
                        receiverId,
                        chatId
                    }
                });
                return Response.json({ message }, { status: 201 });
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
        else {
            return new Response(JSON.stringify({ error: "Content, senderId, and receiverId are required" }), {
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

export async function PUT(request: Request) {

}

export async function DELETE(request: Request) {

}