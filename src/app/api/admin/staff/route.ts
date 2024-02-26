import { getXataClient } from '@/xata';

export async function GET(request: Request) {
    const xata = getXataClient();
    const data = await xata.db.staff.getAll();
    return new Response(JSON.stringify(data), { status: 200 });
}

export async function DELETE(request: Request) {
    const xata = getXataClient();
    const data = await request.json();
    const id = data.id;
    await xata.db.staff.delete(id);
    return new Response("Staff deleted: " + id, { status: 200 });
}