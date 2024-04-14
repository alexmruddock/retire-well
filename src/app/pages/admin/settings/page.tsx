import { getXataClient } from '@/xata';
import { auth } from '@clerk/nextjs';

export default async function SettingsPage() {
    const xata = getXataClient();
    const { userId } = auth();

    const userData = await xata.db.users.filter({ user_id: userId }).getMany();
    const userOrganizationId = userData[0]?.organization?.id;

    const organizationData = await xata.db.organizations.filter({ id: userOrganizationId }).getMany();
    const userOrganizationName = organizationData[0]?.name;

    return (
        <div className="flex-col">
            <div className='font-bold text-xl text-center py-5'>
                <h1>Settings</h1>
            </div>
            <div className='container'>
                <p className="font-bold">Organization ID:</p> {userOrganizationId || 'Loading...'}
                <p className="font-bold">Organization Name:</p> {userOrganizationName || 'Loading...'}
            </div>
        </div>
    );
}
