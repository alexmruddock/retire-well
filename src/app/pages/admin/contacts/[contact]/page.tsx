import React from 'react'
import { getXataClient } from '@/xata'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/app/components/ui/card"
import { Label } from '@/app/components/ui/label';
import { Input } from '@/app/components/ui/input';
import { Button } from '@/app/components/ui/button';
import BackButton from '@/app/components/BackButton';

export default async function SingleContactPage({ params }: { params: { contactId: string } }) {
    const xata = getXataClient();
    const contact = await xata.db.contacts.filter({ id: params.contactId }).getFirst();

    return (
        <>
        <div className='container mx-auto py-10'>
            <BackButton />
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>{contact?.name}</CardTitle>
                    <CardDescription>Details</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full gap-4">
                            {/* Name Field */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" type="text" placeholder={contact?.name ?? "Contact name"} />
                            </div>
                            {/* Email Field */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder={contact?.email ?? "Contact email"} />
                            </div>
                            {/* Phone Number Field */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="phone_number">Phone Number</Label>
                                <Input id="phone_number" type="tel" placeholder={contact?.phone_number ?? "Contact phone number"} />
                            </div>
                            {/* Relationship Field */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="relationship">Relationship</Label>
                                <Input id="relationship" type="text" placeholder={contact?.relationship ?? "Contact relationship"} />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <Button>Change</Button>
                </CardFooter>
            </Card>
            </div>
        </>
    )
}