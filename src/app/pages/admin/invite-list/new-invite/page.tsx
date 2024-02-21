import { InviteForm } from "./form"

type Props = {}

export default function NewInvitePage({ }: Props) {
    // a form that takes an email, a name, and a role
    // a submit button that sends a POST request to /api/invites
    // if the request is successful, show a success message
    // if the request fails, show an error message

    return (
        <div>
            <h1>New Invite</h1>
            <InviteForm />
        </div>
    )
}