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
import { redirect } from 'next/navigation';

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    primaryAdminName: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    primaryAdminEmail: z.string({
        required_error: "Please select a role."
    }).email(),
})

export function OrganizationCreationForm() {
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            primaryAdminName: "",
            primaryAdminEmail: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        const createOrganization = await fetch(`/api/super-admin/organizations`, {
            method: 'PUT',
            body: JSON.stringify({
                name: values.name,
                primaryAdminName: values.primaryAdminName,
                primaryAdminEmail: values.primaryAdminEmail,
            }),
        });
        // redirect('/pages/super-admin/organizations');
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="container space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Organization Name</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                                Please enter an organization name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="primaryAdminName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Primary Admin Name</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                                Please enter a primary admin name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="primaryAdminEmail"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Primary Admin Email</FormLabel>
                            <FormControl>
                                <Input placeholder="shadcn" {...field} />
                            </FormControl>
                            <FormDescription>
                                Please enter a primary admin email.
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