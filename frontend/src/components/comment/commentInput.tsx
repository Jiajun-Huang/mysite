"use client";

import { submitComment } from "@/api/action";
import Image from "next/image";
import { useRouter } from "next/navigation";
import style from "./comment.module.scss";
interface Props {
  placeholder: string;
  blog: number | null;
  root: number | null;
  reply: number | null;
  type: string;
  onSubmit: () => void;
}

export default function CommentInput({
  placeholder,
  blog,
  root,
  type,
  reply,
  onSubmit,
}: Props) {
  const router = useRouter();
  return (
    <div className={style.inputBlock}>
      <Image src="/example.jpg" alt="user" width="50" height="50" />
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
          onSubmit();
        }}
      >
        <textarea
          name="inputField"
          placeholder={placeholder}
          className={style.input}
        />
        <button type="submit" className={style.button}>
          submit
        </button>
      </form>
    </div>
  );
}
