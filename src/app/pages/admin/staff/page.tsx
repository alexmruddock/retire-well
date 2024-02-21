import StaffTable from '@/app/components/admin/StaffTable';
import { getXataClient } from '@/xata';
import React from 'react'
import { DataTable } from "./data-table"
import { Staff, columns } from "./columns"

type Props = {}

async function getStaffMembers() {
    const xata = getXataClient();
    const data = await xata.db.staff.getAll();
    return data;
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
            <div className="text-bold text-lg text-center py-5">
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