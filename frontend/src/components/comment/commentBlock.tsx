"use client";

import { printDate } from "@/util/util";
import { useState } from "react";
import Avatar from "../user/avatar";
import style from "./comment.module.scss";
import CommentInput from "./commentInput";

interface Props {
  comment: Comment;
  blog: number | null;
  type: number | null;
  parentComment: Comment | null;
  setRootState: (comment: Comment) => void;
}

export default function CommentBlock({
  comment,
  blog = null,
  type = null,
  parentComment = null,
  setRootState = null,
}: Props) {
  const [reply, setReply] = useState(false);
  const [commentState, setCommentState] = useState(comment);
  const { content, user, created_at, replies, id, root } = commentState;
  const rootId = root || id; // if root is null, use self as root
  setRootState = setRootState || setCommentState;

  const dateStr = printDate(created_at);
  return (
    <div className={style.commentBLock} id={`comment-${comment.id}`}>
      <Avatar user={user.id} width={50} height={50} />
      <div className={style.commentBody}>
        <p className={style.user}>
          {parentComment
            ? `${user.username} > ${parentComment.user.username}`
            : user.username}
        </p>
        <p className={style.content}>{content}</p>
        <div className={style.meta}>
          <span>{dateStr}</span>
          <span
            onClick={() => {
              setReply(!reply);
            }}
          >
            reply
          </span>
          {reply ? (
            <CommentInput
              placeholder={`reply to ${user.username}`}
              blog={blog}
              type={type}
              root={rootId} // root comment id
              reply={id} // reply to this comment
              avartar={false}
              onSubmit={() => {
                setReply(false);
                console.log(rootId);
                fetch(`/api/comment/get-comment?id=${rootId}`)
                  .then((res) => res.json())
                  .then((data) => {
                    setRootState(data);
                  });
              }}
            />
          ) : null}
        </div>
        <div>
          {replies?.map((reply) => {
            let replyTo = null;
            if (reply.reply != reply.root) {
              replyTo = replies.find((r) => r.id === reply.reply);

              if (!replyTo) {
                console.error("reply to comment not found");
              }
            }
            return (
              <div key={reply.id}>
                <CommentBlock
                  comment={reply}
                  blog={blog}
                  type={type}
                  parentComment={replyTo}
                  setRootState={setCommentState}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
