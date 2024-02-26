import { LocationForm } from "./form"
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import BackButton from "@/app/components/BackButton";

type Props = {}

export default function NewLocationPage({ }: Props) {
    const { userId } = auth();

    if (!userId) {
        redirect('/')
    }

    return (
        <>
            <div>
                <div className="font-bold text-xl text-center py-5">
                    <h1>New Location</h1>
                </div>
                <div className="container mx-auto">
                    <div className="py-5">
                        <BackButton />
                    </div>
                    <div className="w-50">
                        <LocationForm />
                    </div>
                </div>
            </div>
        </>
    )
}