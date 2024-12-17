"use server";

import { BASE_URL } from "@/src/api/request";

// https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations
import { revalidatePath } from "next/cache";

type SubmitCommentType = {
  content: string;
  path: string;
  token: string;
  blog: number | null;
  root: number | null;
  type: number | null;
  reply: number | null;
};

export const submitComment = async ({
  content,
  path,
  token,
  blog,
  root,
  type,
  reply,
}: SubmitCommentType) => {
  if (content) {
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
