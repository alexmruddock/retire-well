import { getXataClient } from '@/xata';

export async function GET(request: Request) {
    const xata = getXataClient();
    const data = await xata.db.folders.getAll();
    return new Response(JSON.stringify(data), { status: 200 });
}

export async function POST(request: Request) {
    const xata = getXataClient();
    const data = await request.json();
    const folder = await xata.db.folders.create(data);
    return new Response(JSON.stringify(folder), { status: 200 });
}

export async function PUT(request: Request) {
    const xata = getXataClient();
    const data = await request.json();
    const folder = await xata.db.folders.update(data);
    return new Response(JSON.stringify(folder), { status: 200 });
}

export async function DELETE(request: Request) {
    const xata = getXataClient();
    const data = await request.json();
    const id = data.id;
    await xata.db.folders.delete(id);
    return new Response("Folder deleted: " + id, { status: 200 });
}