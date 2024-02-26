import { getXataClient } from '@/xata';
import { auth } from '@clerk/nextjs';
import React from 'react'
import { DataTable } from "./data-table"
import { columns } from "./columns"
import { Button } from '@/app/components/ui/button';
import Link from 'next/link';

type Props = {}

async function getOrganizations() {
    const xata = getXataClient();
    const data = await xata.db.organizations.getAll();
    return data;
}

export default async function OrganizationManagementPage({ }: Props) {
    const { userId } = auth();
    const user_id = userId;

    const xata = getXataClient();
    const userData = await xata.db.users.filter({
        user_id: userId
    }).getMany();

    const role = userData[0].role;
    if (role !== 'super-admin') {
        return (
            <div>Unauthorized</div>
        )
    }

    const organizations = await getOrganizations();
    const data = organizations.map(organization => {
        if (!organization.name) {
            throw new Error('Invalid organization data.');
        }
        return {
            id: organization.id,
            name: organization.name || '',
            primaryAdminName: organization.primary_admin_name || '',
            primaryAdminEmail: organization.primary_admin_email || '',
        }
    });

    return (
        <>
            <div className="font-bold text-xl text-center py-5">
                <h1>Organizations</h1>
            </div>
            <div className="container mx-auto py-5 items-center justify-normal">
                <Button>
                    {/* create a new invite and Link to the new-invite page */}
                    <Link href="/pages/super-admin/organizations/new-organization">
                        Create New Organization
                    </Link>
                </Button>
                <DataTable columns={columns} data={data} />
            </div>
        </>
    )
}