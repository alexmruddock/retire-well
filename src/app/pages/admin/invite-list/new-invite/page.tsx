import { getXataClient } from "@/xata";
import { InviteForm } from "./form"
import * as z from 'zod'
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import BackButton from "@/app/components/BackButton";

type Props = {}

const formSchema = z.object({
    email: z.string({
        required_error: "Please select a role."
    }).email(),
    name: z.string().min(2, {
        message: "Name must be at least 2 characters.",
    }),
    role: z.enum(['Admin', 'Staff', 'Resident', 'Family']),
})

export default function NewInvitePage({ }: Props) {
    const { userId } = auth();

    if (!userId) {
        redirect('/')
    }

    return (
        <>
            <div>
                <div className="font-bold text-xl text-center py-5">
                    <h1>New Invite</h1>
                </div>
                <div className="container mx-auto">
                    <div className="py-5">
                        <BackButton />
                    </div>
                    <div className="w-50">
                        <InviteForm />
                    </div>
                </div>
            </div>
        </>
    )
}