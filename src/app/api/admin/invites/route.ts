import { getXataClient } from '@/xata';
import React from 'react'
import * as z from 'zod'

const formSchema = z.object({
    email: z.string({}).email(),
    name: z.string().min(2, {}),
    role: z.enum(['Admin', 'Staff', 'Resident', 'Family']),
})

export async function PUT(request: Request) {
    const xata = getXataClient();
    // const { name, email, role } = await request.json();
    const data = await request.json();
    const email = data.email;
    const name = data.name;
    const role = data.role;
    const userId = data.userId;

    console.log("User ID: " + userId);

    const userData = await xata.db.users.filter({
        user_id: userId
    }).getMany();

    console.log("User Data: " + userData);

    const organization = userData[0].organization?.id;
    console.log("Organization ID: " + organization);

    const status = "Invited";

    console.log("Data received: " + email + " | " + name + " | " + role + " | " + organization + " | "+ status);
    
    const newRecord = { name, email, role, organization, status };
    await xata.db.invited.create(newRecord);

    return new Response("Contact information: " + data, { status: 200 });
}