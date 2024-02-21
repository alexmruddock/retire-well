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
export type Location = {
    id: string
    name: string
    address: string
    city: string
    state: string
    country: string
    phoneNumber: string
    capacity: number
}

// need to figure out how to go from xata data to ColumnDef
export const columns: ColumnDef<Location>[] = [
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
        accessorKey: "address",
        header: "Address",
    },
    {
        accessorKey: "city",
        header: "City",
    },
    {
        accessorKey: "state",
        header: "State",
    },
    {
        accessorKey: "country",
        header: "Country",
    },
    {
        accessorKey: "phoneNumber",
        header: "Phone Number",
    },
    {
        accessorKey: "capacity",
        header: "Capacity",
    },
    {
        accessorKey: "id",
        header: "Link to Details",
        cell: ({ row }) => {
            const location = row.original
            return (
                <Link href={`/pages/admin/locations/${location.id}`}>
                    <div className="text-right text-blue-600 dark:text-blue-500 hover:underline">View Location</div>
                </Link>
            )
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const location = row.original

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
                            onClick={() => navigator.clipboard.writeText(location.phoneNumber)}
                        >
                            Copy phone number
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
