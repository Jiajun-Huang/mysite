import Comments from "@/components/comment/comment";

export default function CommentsPage() {
  return (
    <div>
      <Comments blog={null} placeholder={"Enter something"} type={1} />
    </div>
  );
}
