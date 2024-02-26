"use client";

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from 'zod'

import { Button } from "@/app/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/app/components/ui/form"
import { Input } from "@/app/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/app/components/ui/select"
import { getXataClient } from '@/xata';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { auth, useUser } from '@clerk/nextjs';

const formSchema = z.object({
    email: z.string({
        required_error: "Please select a role."
    }).email(),
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    role: z.enum(['Admin', 'Staff', 'Resident', 'Family']),
})

export function InviteForm() {

    const {user} = useUser();
    const userId = user?.id;

    if(!userId) {
        redirect('/');
    }
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            name: "",
            role: "Admin",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const createInvitedContact = await fetch(`/api/admin/invites`, {
            method: 'PUT',
            body: JSON.stringify({
                email: values.email,
                name: values.name,
                role: values.role,
                userId: userId,
            }),
        });
        redirect('/pages/admin/invite-list');
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="container space-y-8">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="xyz@abc.com" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is the email of the person you are inviting.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="John Smith" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is the name of the person you are inviting.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Role</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Admin">Admin</SelectItem>
                                    <SelectItem value="Staff">Staff</SelectItem>
                                    <SelectItem value="Resident">Resident</SelectItem>
                                    <SelectItem value="Family">Family</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                This is the role of the person you are inviting.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                /> 
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}