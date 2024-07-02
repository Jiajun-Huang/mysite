export default function CommentBlock({ comment }) {
  const { content, user, created_at, replies } = comment;
  return (
    <div>
      <p>{user.username}</p>
      <p>{content}</p>
      <p>{created_at}</p>
      <button>reply</button>
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
        <hr />
      </div>
    </div>
  );
}
