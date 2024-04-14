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

export default async function SingleLocationPage({ params }: { params: { locationId: string } }) {
    const xata = getXataClient();
    console.log("Location ID: ", params.locationId);
    const location = await xata.db.locations.filter({ id: params.locationId }).getFirst();

    return (
        <>
            <div className='container mx-auto py-10'>
                <BackButton />
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>{location?.name}</CardTitle>
                        <CardDescription>Location Details</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid w-full gap-4">
                            {/* Location Name */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="location_name">Name</Label>
                                <Input id="location_name" type="text" placeholder={location?.name ?? "Location name"} readOnly />
                            </div>
                            {/* Address */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="address">Address</Label>
                                <Input id="address" type="text" placeholder={location?.address ?? "Address"} readOnly />
                            </div>
                            {/* City */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="city">City</Label>
                                <Input id="city" type="text" placeholder={location?.city ?? "City"} readOnly />
                            </div>
                            {/* State */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="state">State</Label>
                                <Input id="state" type="text" placeholder={location?.state ?? "State"} readOnly />
                            </div>
                            {/* Country */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="country">Country</Label>
                                <Input id="country" type="text" placeholder={location?.country ?? "Country"} readOnly />
                            </div>
                            {/* Phone Number */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="location_phone_number">Phone Number</Label>
                                <Input id="location_phone_number" type="tel" placeholder={location?.phone_number ?? "Phone number"} readOnly />
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