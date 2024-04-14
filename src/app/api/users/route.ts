import { getXataClient } from "@/xata";

const xata = getXataClient();

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    const userData = await xata.db.users.filter({ user_id: userId }).getMany();
    console.log("User Data: ", userData);

    const userOrganizationId = userData[0]?.organization?.id;
    console.log("User Organization ID: ", userOrganizationId);

    const users = await xata.db.users.getAll();
    console.log("All Users: ", users);

    // return all users other than the current user provided by userId
    const otherUsers = users?.filter(user => user.user_id !== userId);
    console.log("Other Users: ", otherUsers);

    const removeSuperAdmin = otherUsers?.filter(user => user.role !== "super-admin");
    console.log("Remove Super Admin: ", removeSuperAdmin);

    const filteredByOrg = removeSuperAdmin?.filter((user: any) => user.organization?.id === userOrganizationId);
    console.log("Filtered by Organization: ", filteredByOrg);

    // Check if filteredByOrg has data
    if (filteredByOrg.length === 0) {
        // No data found, return a meaningful response
        return new Response(JSON.stringify({ message: "No users found in the same organization or no other users except super-admins." }), {
            status: 404, // or 200, depending on how you want to handle this case
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }

    return new Response(JSON.stringify({ filteredByOrg }), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}