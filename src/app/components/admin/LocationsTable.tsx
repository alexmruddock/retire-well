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

export default async function LocationsTable({ }: Props) {
  const xata = getXataClient();
  const locations = await xata.db.locations.getAll();

  return (
    <>
      <div>
        <div className="flex items-center justify-center">
          <h1 className="font-bold text-xl mb-4">Locations</h1>
        </div>
        {locations.length === 0 ? (
          <p>No locations found.</p>
        ) : (
          <Table>
            <TableCaption>Comprehensive List of Locations</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>City</TableHead>
                <TableHead>State</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Link to Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {locations.map((location) => (
                <TableRow key={location.id}>
                  <TableCell>{location.name}</TableCell>
                  <TableCell>{location.address}</TableCell>
                  <TableCell>{location.city}</TableCell>
                  <TableCell>{location.state}</TableCell>
                  <TableCell>{location.country}</TableCell>
                  <TableCell>{location.phone_number}</TableCell>
                  <TableCell className="text-right text-blue-600 dark:text-blue-500 hover:underline">
                    <Link href={`/pages/admin/locations/${location.id}`}>View Location</Link>
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