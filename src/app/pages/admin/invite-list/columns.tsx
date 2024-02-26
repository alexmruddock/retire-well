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
import { revalidatePath } from "next/cache"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type InvitedUser = {
    id: string
    name: string
    email: string
    role: string
    status: string
    organizationId: string
}

// need to figure out how to go from xata data to ColumnDef
export const columns: ColumnDef<InvitedUser>[] = [
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
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => {
            const staff = row.original
            return <Badge>{staff.role}</Badge>
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const staff = row.original
            return <Badge variant="outline">{staff.status}</Badge>
        },
    },
    {
        accessorKey: "organizationId",
        header: "Organization",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const invitedContact = row.original

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
                            onClick={() => navigator.clipboard.writeText(invitedContact.email)}
                        >
                            Copy email
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="text-red-600 dark:text-red-500"
                            onClick={
                                async () => await fetch(`/api/admin/invites`, {
                                    method: 'DELETE',
                                    body: JSON.stringify({
                                        id: invitedContact.id
                                    }),
                                }).then(() =>
                                    revalidatePath('/pages/admin/invite-list'))
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
