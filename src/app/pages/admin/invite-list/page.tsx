import { getXataClient } from '@/xata';
import React from 'react'
import { DataTable } from "./data-table"
import { columns } from "./columns"
import { Button } from '@/app/components/ui/button';
import Link from 'next/link';

type Props = {}

async function getInviteList() {
    const xata = getXataClient();
    const data = await xata.db.invited.getAll();
    return data;
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
            <div className="text-bold text-lg text-center py-5">
                <h1>Invites</h1>
            </div>
            <div className="container mx-auto py-5 items-center justify-normal">
                <div>
                    <Button>
                        {/* create a new invite and Link to the new-invite page */}
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