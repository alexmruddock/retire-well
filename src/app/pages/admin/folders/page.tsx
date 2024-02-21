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

    async function createFolder(formData: FormData) {
        'use server';
        const parsedForm = schema.parse({
            name: formData.get('name')
        })

        const user_id = userId;
        if (!user_id) {
            return;
        }

        const newRecord = { ...parsedForm, user_id };
        const xata = getXataClient();
        await xata.db.folders.create(newRecord);
        revalidatePath('/pages/admin/folders');
    }

    const folders = await xata.db.folders.filter({
        user_id: userId
    }).getMany();

    const data: Folder[] = folders.map(folder => {
        return {
            id: folder.id,
            name: folder.name || '', // Assign an empty string if name is null or undefined
            user_id: folder.user_id || '', // Assign an empty string if user_id is null or undefined
        }
    });

    return (
        <>
            <div className="text-bold text-lg text-center py-5">
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