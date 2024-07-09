"use client";

import { BASE_URL } from "@/api/request";
import { useEffect, useState } from "react";
import CommentBlock from "./commentBlock";
import CommentInput from "./commentInput";

export default function Comments({ placeholder, type, blog }) {
  const [commentss, setComments] = useState<Comment[]>([]);
  async function fetchComments() {
    const searchParams = new URLSearchParams();
    if (blog) {
      searchParams.set("blog", blog);
      searchParams.set("type", type);
    } else {
      searchParams.set("type", type);
    }

    const params = searchParams.toString();
    console.log(BASE_URL);
    const response = await fetch("/api/comment/get-comments?" + params);
    const data = await response.json();
    setComments(data);
  }
  useEffect(() => {
    fetchComments();
  }, []);

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
        />
      ))}
    </div>
  );
}
