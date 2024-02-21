import React from 'react'
import { getXataClient } from '@/xata'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table"
import Link from 'next/link';

export default async function ContactsTable() {
  const xata = getXataClient();
  const contacts = await xata.db.contacts.getAll();

  return (
    <>
      <div className="overflow-x-auto">
        <div className="flex items-center justify-center">
          <h1 className="font-bold text-xl mb-4">Contacts</h1>
        </div>
        {contacts.length === 0 ? (
          <p className="text-gray-600">No contacts found.</p>
        ) : (
          <Table>
            <TableCaption>A list of your contacts</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Name</TableHead>
                <TableHead>Relationship</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-right">Phone Number</TableHead>
                <TableHead className="text-right">Link to Resident</TableHead>
                <TableHead className="text-right">Link to Profile</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell className="font-medium">{contact.name}</TableCell>
                  <TableCell>{contact.relationship}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell className="text-right">{contact.phone_number}</TableCell>
                  <TableCell className="text-right text-blue-600 dark:text-blue-500 hover:underline">
                    <Link href={`/pages/admin/residents/${contact.resident}`}>View Resident</Link>
                  </TableCell>
                  <TableCell className="text-right text-blue-600 dark:text-blue-500 hover:underline">
                    <Link href={`/pages/admin/contacts/${contact.id}`}>View Profile</Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </>
  );
}