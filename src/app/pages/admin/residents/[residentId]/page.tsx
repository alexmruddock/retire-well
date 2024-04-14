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

export default async function SingleResidentPage({ params }: { params: { residentId: string } }) {
    const xata = getXataClient();
    const resident = await xata.db.residents.filter({ id: params.residentId }).getFirst();

    return (
        <>
            <div className='container mx-auto py-10'>
                <BackButton />
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>{resident?.name}</CardTitle>
                        <CardDescription>Resident Details</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid w-full gap-4">
                            {/* Name */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="resident_name">Name</Label>
                                <Input id="resident_name" type="text" placeholder={resident?.name ?? "Resident name"} readOnly />
                            </div>
                            {/* Date of Birth */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="dob">Date of Birth</Label>
                                <Input id="dob" type="date" placeholder={resident?.date_of_birth?.toString() ?? "Date of Birth"} readOnly />
                            </div>
                            {/* Room Number */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="room_number">Room Number</Label>
                                <Input id="room_number" type="text" placeholder={resident?.room_number ?? "Room number"} readOnly />
                            </div>
                            {/* Health Information */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="health_info">Health Information</Label>
                                <Input id="health_info" type="text" placeholder={resident?.health_information?.toString() ?? "Health information"} readOnly />
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline">Cancel</Button>
                        <Button>Save</Button>
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}