import { getXataClient } from '@/xata';
import * as z from 'zod'

const formSchema = z.object({
    name: z.string().min(2, {}),
    address: z.string().min(2, {}),
    city: z.string().min(2, {}),
    state: z.string().min(2, {}),
    country: z.string().min(2, {}),
    phoneNumber: z.string().min(2, {}),
    capacity: z.number().min(1, {})
})

export async function PUT(request: Request) {
    const xata = getXataClient();
    const data = await request.json();
    const name = data.name;
    const address = data.address;
    const city = data.city;
    const state = data.state;
    const country = data.country;
    const phone_number = data.phoneNumber;
    const capacity = data.capacity;
    const userId = data.userId;

    console.log("User ID: " + userId);
    console.log("");

    const userData = await xata.db.users.filter({
        user_id: userId
    }).getMany();
    console.log("User Data: " + userData);
    console.log("");

    const organization = userData[0].organization?.id;
    console.log("Organization ID: " + organization);
    console.log("");

    console.log("Data received: " +  " | " + name + " | " + address + " | " + city + " | " + state + " | " + country + " | " + phone_number + " | " + capacity + " | " + organization );
    console.log("");

    const newRecord = { name, address, city, state, country, phone_number, capacity, organization };
    await xata.db.locations.create(newRecord);

    return new Response("Location information: " + data, { status: 200 });
}

export async function DELETE(request: Request) {
    const xata = getXataClient();
    const data = await request.json();
    const id = data.id;
    await xata.db.locations.delete(id);
    return new Response("Location deleted: " + id, { status: 200 });
}