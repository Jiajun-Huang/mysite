"use client";

import { Button } from "@heroui/button";
import { useContext } from "react";

import SignInButton from "../auth/signInButton";
import Avatar from "../user/userAvartar";

import { UserContext } from "@/components/auth/context";
import { submitComment } from "@/api/action";

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
      action={async (formdata: FormData) => {
        const content = formdata.get("inputField") as string;

        await submitComment({
          content: content ?? "",
          path: window.location.pathname,
          token: localStorage.getItem("token") ?? "",
          blog,
          root,
          type,
          reply,
        });
        console.log("submit");
        onSubmit();
      }}
      className="flex flex-col py-2.5"
    >
      <div className="flex items-center mb-2.5">
        {avartar && user ? (
          <Avatar height={50} user={user.pk} width={50} />
        ) : null}
        <textarea
          className="flex-1 ml-2.5 p-2.5 border border-gray-300 rounded-md text-base resize-none"
          disabled={user == null}
          name="inputField"
          placeholder={user ? placeholder : "Please log in to comment"}
        />
      </div>
      <div className="flex justify-end mt-2.5">
        {user == null ? (
          <SignInButton />
        ) : (
          <Button color="primary" type="submit">
            Submit
          </Button>
        )}
      </div>
    </form>
  );
}
