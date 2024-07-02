"use server";
// https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations
import { revalidatePath } from "next/cache";
export const submitComment = async (
  content,
  path,
  token,
  blog,
  root,
  type,
  reply
) => {
  if (content) {
    const response = await fetch("http://localhost:3000/api/comment/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content, blog, root, type, reply }),
    });
  }

  revalidatePath(path);
};
