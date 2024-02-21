import { getXataClient } from "@/xata";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function Home() {
  const { userId } = auth();
  const xata = getXataClient();

  async function checkUserExists() {
    const userData = await xata.db.users.filter({
      user_id: userId
    }).getMany();

    if (userData.length === 1) {
      redirect("/pages/admin/residents");
    } else {
      const user_id = userId;
      if (!user_id) {
        return;
      }
      const newRecord = { user_id };
      await xata.db.users.create(newRecord);
      redirect("/pages/admin/residents");
    }
  }

  if (userId) {
    checkUserExists();
  } else {
    redirect("/");
  }

  return (
    <main className="flex h-screen flex-col items-center justify-center gap-5">
      <h1>Home Page</h1>
    </main>
  );
}