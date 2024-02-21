"use client";

import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
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
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            name: "",
            role: "Admin",
        },
    })

    function onSubmit(values: any) {
        console.log(values)
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
                                <Input placeholder="shadcn" {...field} />
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
                                <Input placeholder="shadcn" {...field} />
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