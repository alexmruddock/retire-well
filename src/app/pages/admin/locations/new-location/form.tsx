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
import { redirect, useRouter } from 'next/navigation';
import { auth, useUser } from '@clerk/nextjs';

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    address: z.string().min(2, {}),
    city: z.string().min(2, {}),
    state: z.string().min(2, {}),
    country: z.string().min(2, {}),
    phoneNumber: z.string().min(2, {}),
    capacity: z.string().transform((v) => Number(v)||0),
})

export function LocationForm() {

    const { user } = useUser();
    const userId = user?.id;

    if (!userId) {
        redirect('/');
    }

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            address: "",
            city: "",
            state: "",
            country: "",
            phoneNumber: "",
            capacity: 0
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const createNewLocation = await fetch(`/api/admin/locations`, {
            method: 'PUT',
            body: JSON.stringify({
                name: values.name,
                address: values.address,
                city: values.city,
                state: values.state,
                country: values.country,
                phoneNumber: values.phoneNumber,
                capacity: values.capacity,
                userId: userId,
            }),
        });
        router.push('/pages/admin/locations');
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="container space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="ACME Assisted Living Community" {...field} />
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
                    name="address"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                                <Input placeholder="123 Main St" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is the address of the location.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                                <Input placeholder="San Francisco" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is the city of the location.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>State</FormLabel>
                            <FormControl>
                                <Input placeholder="CA" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is the state of the location.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                                <Input placeholder="USA" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is the country of the location.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                                <Input placeholder="123-456-7890" {...field} />
                            </FormControl>
                            <FormDescription>
                                This is the phone number of the location.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="capacity"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Capacity</FormLabel>
                            <FormControl>
                                <Input type="number" min={0} {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                This is the capacity of the location.
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