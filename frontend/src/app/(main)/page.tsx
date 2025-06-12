import { BASE_URL } from "@/api/request";
import BlogCard from "@/components/blogCard";
import { Blog } from "@/types/";

export const revalidate = 60;

export default async function Home() {
  let blogData: Blog[];

  try {
    const data = await fetch(BASE_URL + "/api/blog/", {
      method: "GET",
      next: { revalidate: 60 },
    });
    blogData = await data.json();
    blogData.sort(
      (a, b) =>
        new Date(b.created_at ?? 0).getTime() -
        new Date(a.created_at ?? 0).getTime()
    );
  } catch (error) {
    blogData = [];
    console.error(error);
  }
  console.log(BASE_URL);
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-6">
      {blogData.map((data, index) => {
        return (
          <div key={index} className="w-full max-w-4xl">
            <BlogCard data={data} />
          </div>
        );
      })}
    </section>
  );
}
