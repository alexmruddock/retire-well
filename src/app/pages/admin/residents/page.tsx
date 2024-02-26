import ResidentsTable from '@/app/components/admin/ResidentsTable';
import { getXataClient } from '@/xata';
import React from 'react'
import { DataTable } from "./data-table"
import { Resident, columns } from "./columns"

type Props = {}

async function getResidents() {
    const xata = getXataClient();
    const data = await xata.db.residents.getAll();
    return data;
}

export default async function ResidentsPage({ }: Props) {
    const residents = await getResidents();
    const data: Resident[] = residents.map(resident => {
        if (!resident.name) {
            throw new Error('Invalid resident data.');
        }
        return {
            id: resident.id,
            name: resident.name || '', // Assign an empty string if name is null or undefined
            roomNumber: resident.room_number || '', // Assign an empty string if roomNumber is null or undefined
            healthInformation: resident.health_information || [], // Assign an empty array if healthInformation is null or undefined
        }
    });
    return (
        <>
            <div className="font-bold text-xl text-center py-5">
                <h1>Residents</h1>
            </div>
            <div className="container mx-auto py-5 items-center justify-normal">
                <DataTable columns={columns} data={data} />
            </div>
        </>
    )
}