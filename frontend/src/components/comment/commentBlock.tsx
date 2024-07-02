"use client";

import Image from "next/image";
import style from "./comment.module.scss";

export default function CommentBlock({ comment }) {
  const { content, user, created_at, replies } = comment;
  return (
    <div className={style.commentBLock}>
      <Image src="/example.jpg" alt="avatar" width={50} height={50} />
      <div className={style.commentBody}>
        <p className={style.user}>{user.username}</p>
        <p className={style.content}>{content}</p>
        <div className={style.meta}>
          <span>{new Date(created_at).toLocaleDateString()}</span>
          <span>reply</span>
        </div>
        <div>
          {replies?.map((reply) => {
            const replier = reply.user;
            const replied = user;
            reply.user.username = `${replier.username} > ${replied.username}`;
            return (
              <div key={reply.id}>
                <CommentBlock key={reply.id} comment={reply} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
