"use client";
import React, { useRef } from 'react';
import { Button } from '@/app/components/ui/button';

export default function FolderForm({ handleCreateFolder } : { handleCreateFolder: (formData: FormData) => void }) {
    const ref = useRef<HTMLFormElement>(null);
    
    return (
        <form
            className="mb-4 w-full flex gap-x-2 items-center"
            action={(formData)=> {
                handleCreateFolder(formData);
                ref.current?.reset();
            }}
            ref={ref}
        >
            <div className="grow">
                <label
                    className="text-gray-600 text-sm font-bold mb-2 hidden"
                    htmlFor="name"
                    aria-label="New Folder"
                >
                    New Name
                </label>
                <input
                    className="shadow appearance-none border-2 border-gray-700 rounded w-full py-2 px-3 text-gray-600 leading-tight focus:outline-non focus:shadow-outline bg-transparent"
                    name="name"
                    id="name"
                    type="text"
                    placeholder="my folder"
                />
            </div>
            <Button>
                Add Folder
            </Button>
        </form>
    )
}