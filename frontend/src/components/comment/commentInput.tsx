"use client";

import { submitComment } from "@/api/action";
import { useContext } from "react";
import Avatar from "../user/avatar";
import { UserContext } from "../user/state";
import style from "./comment.module.scss";
interface Props {
  placeholder: string;
  blog: number | null;
  root: number | null;
  reply: number | null;
  avartar?: boolean;
  type: number | null;
  onSubmit: () => void;
}

export default function CommentInput({
  placeholder,
  blog,
  root,
  type,
  reply,
  avartar = true,
  onSubmit,
}: Props) {
  const { user } = useContext(UserContext);

  return (
    <form
      className={style.inputBlock}
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
      <div className={style.buttonRow}>
        {avartar && user ? (
          <Avatar user={user.pk} width={50} height={50} />
        ) : null}
        <textarea
          name="inputField"
          placeholder={user ? placeholder : "Please log in to comment"}
          className={style.input}
          disabled={user == null}
        />
      </div>
      <div className={style.buttonRow}>
        <button type="submit" className={style.button} disabled={user == null}>
          submit
        </button>
      </div>
    </form>
  );
}
