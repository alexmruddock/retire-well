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

export default async function SingleStaffMemberPage({ params }: { params: { staffMemberId: string } }) {
    const xata = getXataClient();
    const staffMember = await xata.db.staff.filter({ id: params.staffMemberId }).getFirst();

    return (
        <>
            <div className='container mx-auto py-10'>
                <BackButton />
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>{staffMember?.name}</CardTitle>
                        <CardDescription>Staff Details</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid w-full gap-4">
                            {/* Name */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="staff_name">Name</Label>
                                <Input id="staff_name" type="text" placeholder={staffMember?.name ?? "Staff name"} readOnly />
                            </div>
                            {/* Email */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="staff_email">Email</Label>
                                <Input id="staff_email" type="email" placeholder={staffMember?.email ?? "Email"} readOnly />
                            </div>
                            {/* Phone Number */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="staff_phone_number">Phone Number</Label>
                                <Input id="staff_phone_number" type="tel" placeholder={staffMember?.phone_number ?? "Phone number"} readOnly />
                            </div>
                            {/* Role */}
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="role">Role</Label>
                                <Input id="role" type="text" placeholder={staffMember?.role ?? "Role"} readOnly />
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