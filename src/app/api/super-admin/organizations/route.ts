import { getXataClient } from '@/xata';
import * as z from 'zod'

const formSchema = z.object({
    name: z.string().min(2, {}),
})

export async function PUT(request: Request) {
    const data = await request.json();
    const name = data.name;
    const primary_admin_name = data.primaryAdminName;
    const primary_admin_email = data.primaryAdminEmail;

    console.log("Data received: " + name + " " + primary_admin_name + " " + primary_admin_email);
    
    const xata = getXataClient();
        
    const newRecord = { name, primary_admin_name, primary_admin_email };
    await xata.db.organizations.create(newRecord);

    return new Response("Contact information: " + data, { status: 200 });
}