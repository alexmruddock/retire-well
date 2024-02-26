import { getXataClient } from "@/xata";
import { redirect } from "next/navigation";

const xata = getXataClient();

export async function checkUserExists(email: string, userId: string) {
    
    const userData = await xata.db.users.filter({
      user_id: userId
    }).getMany();

    // if already exists, redirect to the residents page
    if (userData.length === 1) {
      redirect("/pages/admin/residents");
    } 
    // if not, begin the user creation flow
    else {
      const user_id = userId;
      if (!user_id) {
        return;
      }

      // check if the user is the primary admin
      const organizationData = await xata.db.organizations.filter({
        primary_admin_email: email
      }).getMany()

      // check if the user is invited
      const invitedData = await xata.db.invited.filter({
        email: email
      }).getMany()
      
      // if primary admin, create the user record and redirect to the residents page
      if (organizationData.length === 1) {
        const organizationId = organizationData[0].id;
        const newRecord = { user_id, organizationId };
        await xata.db.users.create(newRecord);
        redirect("/pages/admin/residents");
      } 
      // if not primary admin but invite, create the user record and redirect to the residents page
      else if (invitedData.length === 1) {
        const organizationId = invitedData[0].organization?.id;
        const newRecord = { user_id, organizationId };
        await xata.db.users.create(newRecord);
        redirect("/pages/admin/residents");
      } 
      // if not primary or invited, redirect to the sign-up page
      else {
        redirect("/");
      }
    }
  }