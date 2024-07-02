import Comments from "@/components/comment/comment";

export default async function CommentsPage() {
  const response = await fetch(
    "http://localhost:3000/api/comment/get-comments?type=1"
  );
  const data = await response.json();

  return (
    <div
      style={{
        padding: "1rem 10rem",
      }}
    >
      <Comments placeholder={"Enter something"} type={1} blog={null} />
    </div>
  );
}
