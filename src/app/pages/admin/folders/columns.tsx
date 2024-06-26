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
import { revalidatePath } from "next/cache"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Folder = {
  id: string
  name: string
  user_id: string
}

async function deleteFolder(id: string) {
  await fetch(`/api/admin/folders`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  })
  revalidatePath("/pages/admin/folders")
}

// need to figure out how to go from xata data to ColumnDef
export const columns: ColumnDef<Folder>[] = [
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
    id: "actions",
    cell: ({ row }) => {
      const folder = row.original

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
              onClick={() => navigator.clipboard.writeText(folder.id)}
            >
              Copy folder ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View file (does nothing right now)</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-600 dark:text-red-500"
              onClick={()=>{
                // Execute deleteFolder asynchronously without directly returning a promise
                deleteFolder(folder.id).then(() => {
                  console.log("Folder deleted successfully");
                  // Optionally, add code here to handle UI updates or notifications
                }).catch((error) => {
                  console.error("Error deleting folder:", error);
                  // Handle errors, e.g., show an error notification
                });
              }}
            >
              Delete folder
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]