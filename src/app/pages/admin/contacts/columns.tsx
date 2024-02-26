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
import { revalidatePath } from "next/cache"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Contact = {
    id: string
    name: string
    relationship: string
    email: string
    phone_number: string
    residentId: string
    contactId: string
}

// need to figure out how to go from xata data to ColumnDef
export const columns: ColumnDef<Contact>[] = [
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
        accessorKey: "relationship",
        header: "Relationship",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "phone_number",
        header: "Phone number",
    },
    {
        accessorKey: "residentId",
        header: "Link to Resident",
        cell: ({ row }) => {
            const contact = row.original
            return (
                <Link href={`/pages/admin/residents/${contact.residentId}`}>
                    <div className="text-blue-600 dark:text-blue-500 hover:underline">View Resident</div>
                </Link>
            )
        },
    },
    {
        accessorKey: "contactId",
        header: "Link to Contact",
        cell: ({ row }) => {
            const contact = row.original
            return (
                <Link href={`/pages/admin/contacts/${contact.id}`}>
                    <div className="text-blue-600 dark:text-blue-500 hover:underline">View Contact</div>
                </Link>
            )
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const contact = row.original

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
                            onClick={() => navigator.clipboard.writeText(contact.email)}
                        >
                            Copy email address
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(contact.phone_number)}
                        >
                            Copy phone number
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View file</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="text-red-600 dark:text-red-500"
                            onClick={
                                async () => await fetch(`/api/admin/contacts`, {
                                    method: 'DELETE',
                                    body: JSON.stringify({
                                        id: contact.id
                                    }),
                                }).then(() =>
                                    revalidatePath('/pages/admin/contacts'))
                            }
                        >
                            Delete contact
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
