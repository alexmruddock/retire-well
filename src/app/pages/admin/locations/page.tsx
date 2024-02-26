import { getXataClient } from '@/xata';
import React from 'react'
import { DataTable } from "./data-table"
import { Location, columns } from "./columns"
import { Button } from '@/app/components/ui/button';
import Link from 'next/link';

type Props = {}

async function getLocations() {
    const xata = getXataClient();
    const data = await xata.db.locations.getAll();
    return data;
}

export default async function LocationsPage({ }: Props) {
    const locations = await getLocations();
    const data: Location[] = locations.map(location => {
        if (!location.name) {
            throw new Error('Invalid location data.');
        }
        return {
            id: location.id,
            name: location.name || '',
            address: location.address || '',
            city: location.city || '',
            state: location.state || '',
            country: location.country || '',
            phoneNumber: location.phone_number || '',
            capacity: location.capacity ? Number(location.capacity) : 0,
        }
    });

    return (
        <>
            <div className="font-bold text-xl text-center py-5">
                <h1>Locations</h1>
            </div>
            <div className="container mx-auto py-5 items-center justify-normal">
                <Button>
                    <Link href="/pages/admin/locations/new-location">
                        Create New Location
                    </Link>
                </Button>
                <DataTable columns={columns} data={data} />
            </div>
        </>
    )
}