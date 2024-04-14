// "use server";

// import { revalidatePath } from 'next/cache';

// export default async function revalidate(req, res) {
//   const { path } = req.query;
//   const revalidated = await revalidatePath(path);
//   res.status(200).json({ revalidated });
// }