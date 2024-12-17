"use client";

import { Comment } from "@/types/";
import { useCallback, useEffect, useState } from "react";
import CommentBlock from "./commentBlock";
import CommentInput from "./commentInput";

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
        placeholder={placeholder}
        blog={blog}
        root={null}
        type={type}
        reply={null}
        avartar={true}
        onSubmit={fetchComments}
      />
      {commentss.map((comment: Comment) => (
        <CommentBlock
          key={comment.id}
          comment={comment}
          blog={blog}
          type={type}
          parentComment={null}
          setRootState={null}
        />
      ))}
    </div>
  );
}
