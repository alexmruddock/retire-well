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
import { Badge } from '@/app/components/ui/badge';

type Props = {}

export default async function ResidentsTable({ }: Props) {
  const xata = getXataClient();
  const residents = await xata.db.residents.getAll();

  return (
    <>
      <div>
        <div className="flex items-center justify-center">
          <h1 className="font-bold text-xl mb-4">Residents</h1>
        </div>
        {residents.length === 0 ? (
          <p>No residents found.</p>
        ) : (
          <Table>
            <TableCaption>List of Residents</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Room Number</TableHead>
                <TableHead>Health Information</TableHead>
                <TableHead>Link to Profile</TableHead> {/* Assuming you might want to add actions like view, edit, delete */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {residents.map((resident) => (
                <TableRow key={resident.id}>
                  <TableCell>{resident.name}</TableCell>
                  <TableCell>{resident.room_number}</TableCell>
                  <TableCell>
                    {resident.health_information?.map((info, index) => (
                      <span key={index} >
                        <Badge variant="outline">{info}</Badge>
                      </span>
                    ))}
                  </TableCell>
                  <TableCell className="text-right text-blue-600 dark:text-blue-500 hover:underline">
                    <Link href={`/pages/admin/residents/${resident.id}`}>View Resident</Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </>
  )
}