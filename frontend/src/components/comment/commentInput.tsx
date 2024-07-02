"use client";

import { submitComment } from "@/api/action";

interface Props {
  placeholder: string;
  blog: number | null;
  root: number | null;
  reply: number | null;
  type: string;
}

export default function CommentInput({
  placeholder,
  blog,
  root,
  type,
  reply,
}: Props) {
  return (
    <form
      action={async (formdata: FormData) => {
        const content = formdata.get("inputField");
        await submitComment(
          content,
          window.location.pathname,
          localStorage.getItem("token"),
          blog,
          root,
          type,
          reply
        );
      }}
    >
      <input name="inputField" type="text" placeholder={placeholder} />
      <button type="submit">submit</button>
    </form>
  );
}
