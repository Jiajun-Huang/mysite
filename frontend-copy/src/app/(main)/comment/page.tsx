import Comments from "@/components/comment/comment";

export default function CommentsPage() {
  return (
    <div>
      <Comments placeholder={"Enter something"} type={1} blog={null} />
    </div>
  );
}
