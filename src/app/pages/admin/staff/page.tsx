import { getXataClient } from '@/xata';
import React from 'react'
import { DataTable } from "./data-table"
import { columns } from "./columns"
import { auth } from '@clerk/nextjs';

type Props = {}
const { userId } = auth();

async function getStaffMembers() {
    const xata = getXataClient();
    const data = await xata.db.staff.getAll();
    const userData = await xata.db.users.filter({ user_id: userId }).getMany();
    const userOrganizationId = userData[0]?.organization?.id;
    const filteredByOrg = data.filter((staff: any) => staff.organization.id === userOrganizationId);
    return filteredByOrg;
}

export default async function StaffPage({ }: Props) {
    const staffMembers = await getStaffMembers();
    const data = staffMembers.map(staffMember => {
        if (!staffMember.name) {
            throw new Error('Invalid staff member data.');
        }
        return {
            id: staffMember.id,
            name: staffMember.name || '',
            email: staffMember.email || '',
            phoneNumber: staffMember.phone_number || '',
            role: staffMember.role || '',
            status: staffMember.status || '',
            jobTitle: staffMember.job_title || '',
            qualifications: staffMember.qualifications || [],
        }
    });
    return (
        <>
            <div className="font-bold text-xl text-center py-5">
                <h1>Staff</h1>
            </div>
            <div className="container mx-auto py-5 items-center justify-normal">
                <div>
                    <DataTable columns={columns} data={data} />
                </div>
            </div>
        </>
    )
}