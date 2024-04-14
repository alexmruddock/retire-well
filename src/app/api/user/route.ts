import { getXataClient } from "@/xata";

const xata = getXataClient();

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const user = await xata.db.users.filter({ user_id: userId }).getMany();
    return new Response(JSON.stringify({ user }), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}