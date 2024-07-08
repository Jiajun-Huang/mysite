import Comments from "@/components/comment/comment";

export default function CommentsPage() {
  
  console.log("commentsPage");

  return (
    <div
      style={{
        // padding: "1rem 10rem",
      }}
    >
      <Comments placeholder={"Enter something"} type={1} blog={null} />
    </div>
  );
}
