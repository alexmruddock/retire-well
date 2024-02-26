import { getXataClient } from '@/xata';

export async function GET(request: Request) {
    const xata = getXataClient();
    const data = await xata.db.contacts.getAll();
    return new Response(JSON.stringify(data), { status: 200 });
}

export async function DELETE(request: Request) {
    const xata = getXataClient();
    const data = await request.json();
    const id = data.id;
    await xata.db.contacts.delete(id);
    return new Response("Contact deleted: " + id, { status: 200 });
}