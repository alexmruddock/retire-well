import { getXataClient } from "@/xata";
import { auth, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function Home() {
  const { userId } = auth();
  const user = await currentUser();
  const email = user?.emailAddresses[0].emailAddress;
  const xata = getXataClient();

  if (userId && email) {
    console.log("UserId: ", userId, "and Email: ", email)
    console.log("");
    checkUserExists(email, userId)
  };

  async function checkUserExists(email: string, userId: string) {

    // check if the user already exists
    const userData = await xata.db.users.filter({
      user_id: userId
    }).getMany();

    console.log("User Data: ", userData);
    console.log("");

    // if already exists, redirect to the residents page
    if (userData.length === 1) {
      console.log("User exists. Here is their data: ", userData[0]);
      console.log("");
      // revalidatePath('/pages');
      // redirect("/pages/admin/residents");
    }
    // if not, begin the user creation flow
    else {
      const user_id = userId;
      
      // check if the user is the primary admin
      const organizationData = await xata.db.organizations.filter({
        primary_admin_email: email
      }).getMany()
      console.log("Organization Data: ", organizationData);
      console.log("");

      // check if the user is invited
      const invitedData = await xata.db.invited.filter({
        email: email
      }).getMany()
      console.log("Invited Data: ", invitedData);
      console.log("");

      // if primary admin, create the user record and redirect to the residents page
      if (organizationData.length === 1 && invitedData.length === 0) {
        const organization = organizationData[0].id;
        const name = organizationData[0].primary_admin_name;
        const email = organizationData[0].primary_admin_email;
        const role = "Admin"
        // create new user record
        const newRecord = { user_id, organization, role };
        await xata.db.users.create(newRecord);
        // retrieve new user record
        const userData = await xata.db.users.filter({
          user_id: userId
        }).getMany();
        console.log("New user created from Organization data: ", userData);
        console.log("");
        // create new staff record
        const user = userData[0].id;
        console.log("User ID: ", user);
        await xata.db.staff.create({ user, organization, name, email, role });
        // redirect to the residents page
        redirect("/pages/admin/residents");
      }
      // if not primary admin but invited, create the user record and redirect to the residents page
      else if (invitedData.length === 1 && invitedData[0].status === "Invited") {
        const organization = invitedData[0].organization?.id;
        const role = invitedData[0].role;
        const name = invitedData[0].name;
        const newRecord = { user_id, organization, role };
        await xata.db.users.create(newRecord);
        // retrieve new user record
        const userData = await xata.db.users.filter({
          user_id: userId
        }).getMany();
        console.log("New user created from Invite List data: ", userData);
        // create new staff record
        const user = userData[0].id;
        await xata.db.staff.create({ user, organization, name, email, role });
        await xata.db.invited.update(invitedData[0].id, { status: "Accepted" });
        // redirect("/pages/admin/residents");
      }
      // if not primary or invited, redirect to the sign-up page
      else {
        redirect("/sign-up");
      }
      // revalidatePath('/pages/admin/residents');
      // redirect("/pages/admin/residents");
    }
  }

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-5">
      <h1>Home Page</h1>
    </main>
  );
}