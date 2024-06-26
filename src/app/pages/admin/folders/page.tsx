import { getXataClient } from '@/xata';
import React from 'react'
import FolderForm from '@/app/components/admin/FolderForm'
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { Folder, columns } from "./columns"
import { DataTable } from "./data-table"

const schema = z.object({
    name: z.string().min(5),
})

export default async function AdminFoldersPage() {
    const { userId } = auth();
    const xata = getXataClient();

    if (!userId) {
        redirect('/')
    }

    const userData = await xata.db.users.filter({ user_id: userId }).getMany();
    const userOrganizationId = userData[0]?.organization?.id;

    async function createFolder(formData: FormData) {
        'use server';
        const parsedForm = schema.parse({
            name: formData.get('name')
        })

        const user_id = userId;
        if (!user_id) {
            return;
        }

        const organization = userOrganizationId
        
        const newRecord = { ...parsedForm, user_id, organization};
        
        const xata = getXataClient();
        await xata.db.folders.create(newRecord);

        revalidatePath('/pages/admin/folders');
    }

    const folders = await xata.db.folders.filter({
        user_id: userId,
    }).getMany();

    const filteredByOrg = folders.filter((folder: any) => folder.organization.id === userOrganizationId);

    const data: Folder[] = filteredByOrg.map(folder => {
        return {
            id: folder.id,
            name: folder.name || '', // Assign an empty string if name is null or undefined
            user_id: folder.user_id || '', // Assign an empty string if user_id is null or undefined
        }
    });

    return (
        <>
            <div className="font-bold text-xl text-center py-5">
                <h1>Folders</h1>
            </div>
            <div className="container mx-auto py-5 items-center justify-normal">
                <FolderForm handleCreateFolder={createFolder} />
                <div className="mb-10"></div>
                <DataTable columns={columns} data={data} />
            </div>
        </>
    )
}