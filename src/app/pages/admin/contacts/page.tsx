import ContactsTable from '@/app/components/admin/ContactsTable';
import { getXataClient } from '@/xata';
import React from 'react'
import { DataTable } from "./data-table"
import { Contact, columns } from "./columns"

type Props = {}

async function getContacts() {
    const xata = getXataClient();
    const data = await xata.db.contacts.getAll();
    return data;
}

export default async function ContactsPage({ }: Props) {
    const contacts = await getContacts();
    const data: Contact[] = contacts.map(contact => {
        if (!contact.name || !contact.relationship || !contact.email || !contact.phone_number || !contact.resident) {
            throw new Error('Invalid contact data');
        }
        return {
            id: contact.id,
            name: contact.name || '', // Assign an empty string if name is null or undefined
            relationship: contact.relationship || '', // Assign an empty string if relationship is null or undefined
            email: contact.email || '', // Assign an empty string if email is null or undefined
            phone_number: contact.phone_number || '', // Assign an empty string if phone_number is null or undefined
            residentId: contact.resident.id || '', // Assign an empty string if residentId is null or undefined
            contactId: contact.id || '', // Assign an empty string if contactId is null or undefined
        }
    });
    return (
        <>
            <div className="text-bold text-lg text-center py-5">
                <h1>Contacts</h1>
            </div>
            <div className="container mx-auto py-5 items-center justify-normal">
                <DataTable columns={columns} data={data} />
            </div>
        </>
    )
}