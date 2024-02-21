"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/app/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu"

import { Checkbox } from "@/app/components/ui/checkbox"
import Link from "next/link"

import { Badge } from "@/app/components/ui/badge"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Resident = {
    id: string
    name: string
    roomNumber: string
    healthInformation: string[]
}

// need to figure out how to go from xata data to ColumnDef
export const columns: ColumnDef<Resident>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "roomNumber",
        header: "Room Number",
    },
    {
        accessorKey: "healthInformation",
        header: "Health Information",
        cell: ({ row }) => {
            const resident = row.original
            return (
                <span>
                    {resident.healthInformation.map((info, index) => (
                        <span key={index} >
                            <Badge variant="outline">{info}</Badge>
                        </span>
                    ))}
                </span>
            )
        }
    },
    {
        accessorKey: "id",
        header: "Link to Profile",
        cell: ({ row }) => {
            const resident = row.original
            return (
                <Link href={`/pages/admin/residents/${resident.id}`}>
                    <div className="text-right text-blue-600 dark:text-blue-500 hover:underline">View Resident</div>
                </Link>
            )
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const resident = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(resident.roomNumber)}
                        >
                            Copy room number
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(resident.healthInformation.join(", "))}
                        >
                            Copy health information
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
