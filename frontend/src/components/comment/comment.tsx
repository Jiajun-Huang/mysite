import CommentBlock from "./commentBlock";
import CommentInput from "./commentInput";

interface Comment {
  id: number;
  content: string;
  user: string;
}

export default function Comments({ comments, type, blog }) {
  return (
    <div>
      <CommentInput
        placeholder="write a comment"
        blog={blog}
        root={null}
        type={type}
        reply={null}
      />
      {comments.map((comment: Comment) => (
        <CommentBlock key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
