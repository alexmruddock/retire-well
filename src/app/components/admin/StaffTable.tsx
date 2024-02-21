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

type Props = {}

export default async function StaffTable({ }: Props) {
  const xata = getXataClient();
  const staff = await xata.db.staff.getAll();

  return (
    <>
      <div>
        <div className="flex items-center justify-center">
          <h1 className="font-bold text-xl mb-4">Staff</h1>
        </div>
        {staff.length === 0 ? (
          <p>No staff found.</p>
        ) : (
          <Table>
            <TableCaption>Comprehensive List of Staff Members</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Link to Profile</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {staff.map((staffMember) => (
                <TableRow key={staffMember.id}>
                  <TableCell>{staffMember.name}</TableCell>
                  <TableCell>{staffMember.email}</TableCell>
                  <TableCell>{staffMember.phone_number}</TableCell>
                  <TableCell>{staffMember.role}</TableCell>
                  <TableCell className="text-right text-blue-600 dark:text-blue-500 hover:underline">
                    <Link href={`/pages/admin/staff/${staffMember.id}`}>View Staff Member</Link>
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