"use server";

import { BASE_URL } from "@/api/request";

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
    console.log(content, path, token, blog, root, type, reply);
    const response = await fetch(BASE_URL + "/api/comment/", {
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
