"use client";

import { useCallback, useEffect, useState } from "react";

import CommentBlock from "./commentBlock";
import CommentInput from "./commentInput";

import { Comment } from "@/types/";

type Prop = {
  placeholder: string;
  type: number;
  blog: number | null;
};

export default function Comments({ placeholder, type, blog }: Prop) {
  const [commentss, setComments] = useState<Comment[]>([]);
  const fetchComments = useCallback(async () => {
    const searchParams = new URLSearchParams();

    if (blog) {
      searchParams.set("blog", blog.toString());
      searchParams.set("type", type.toString());
    } else {
      searchParams.set("type", type.toString());
    }

    const params = searchParams.toString();
    const response = await fetch("/api/comment/get-comments?" + params);
    const data = await response.json();

    setComments(data);
  }, [blog, type]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return (
    <div>
      <CommentInput
        avartar={true}
        blog={blog}
        placeholder={placeholder}
        reply={null}
        root={null}
        type={type}
        onSubmit={fetchComments}
      />
      {commentss.map((comment: Comment) => (
        <CommentBlock
          key={comment.id}
          blog={blog}
          comment={comment}
          parentComment={null}
          setRootState={null}
          type={type}
        />
      ))}
    </div>
  );
}
