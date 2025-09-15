"use client";

import { useState } from "react";

import CommentInput from "./commentInput";

import Avatar from "@/components/user/userAvartar";
import { Comment } from "@/types/";
import { printDate } from "@/util/util";

type Props = {
  comment: Comment;
  blog: number | null;
  type: number | null;
  parentComment: Comment | null;
  setRootState: ((comment: Comment) => void) | null;
};

export default function CommentBlock({
  comment,
  blog = null,
  type = null,
  parentComment = null,
  setRootState = (comment: Comment) => {},
}: Props) {
  const [reply, setReply] = useState(false);
  const [commentState, setCommentState] = useState(comment);
  const { content, user, created_at, replies, id, root } = commentState;
  const rootId = root || id; // if root is null, use self as root

  setRootState = setRootState || setCommentState;

  const dateStr = printDate(created_at);

  return (
    <div className="flex space-x-2 mb-4" id={`comment-${comment.id}`}>
      <Avatar height={50} user={user.id} width={50} />
      <div className="flex-1">
        <p className="font-semibold">
          {parentComment
            ? `${user.username} > ${parentComment.user.username}`
            : user.username}
        </p>
        <p className="my-2">{content}</p>
        <div className="text-sm text-default-400">
          <span>{dateStr}</span>
          <span
            className="cursor-pointer ml-2 hover:text-primary"
            onClick={() => {
              setReply(!reply);
            }}
          >
            reply
          </span>
          {reply ? (
            <CommentInput
              avartar={false}
              blog={blog}
              placeholder={`reply to ${user.username}`}
              reply={id} // reply to this comment
              root={rootId} // root comment id
              type={type}
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
        <div className="mt-4">
          {replies?.map((reply) => {
            let replyTo = null;

            if (reply.reply !== reply.root) {
              // if the comment is a reply to another comment (not the root comment)
              replyTo = replies.find((r) => r.id === reply.reply); // find the comment under which this comment is replied

              if (!replyTo) {
                console.error("reply to comment not found"); // if not found, log error
              }
            }

            return (
              <div key={reply.id}>
                <CommentBlock
                  blog={blog}
                  comment={reply}
                  parentComment={replyTo || null}
                  setRootState={setCommentState}
                  type={type}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
