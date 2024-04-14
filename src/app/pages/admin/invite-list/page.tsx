import { getXataClient } from '@/xata';
import React from 'react'
import { DataTable } from "./data-table"
import { columns } from "./columns"
import { Button } from '@/app/components/ui/button';
import Link from 'next/link';
import { auth } from '@clerk/nextjs';

type Props = {}
const { userId } = auth();

async function getInviteList() {
    const xata = getXataClient();
    const data = await xata.db.invited.getAll();
    const userData = await xata.db.users.filter({ user_id: userId }).getMany();
    const userOrganizationId = userData[0]?.organization?.id;
    const filteredByOrg = data.filter((invited: any) => invited.organization.id === userOrganizationId);
    return filteredByOrg;
}

export default async function InviteListPage({ }: Props) {
    const inviteList = await getInviteList();
    const data = inviteList.map(invite => {
        if (!invite.email) {
            throw new Error('Invalid staff member data.');
        }
        return {
            id: invite.id,
            name: invite.name || '',
            email: invite.email || '',
            role: invite.role || '',
            status: invite.status || '',
            organizationId: invite.organization?.id || '',
        }
    });
    return (
        <>
            <div className="font-bold text-xl text-center py-5">
                <h1>Invites</h1>
            </div>
            <div className="container mx-auto py-5 items-center justify-normal">
                <div>
                    <Button>
                        <Link href="/pages/admin/invite-list/new-invite">
                            Create New Invite
                        </Link>
                    </Button>
                    <DataTable columns={columns} data={data} />
                </div>
            </div>
        </>
    )
}