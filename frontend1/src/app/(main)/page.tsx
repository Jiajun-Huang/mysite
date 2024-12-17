import { BASE_URL } from "@/api/request";
import Brief from "@/components/blog/brief/brief";
import style from "./page.module.scss";

export default async function Home() {
  let blogData: Blog[];
  try {
    const data = await fetch(BASE_URL + "/api/blog/", {
      method: "GET",
      next: { revalidate: 60 },
    });
    blogData = await data.json();
  } catch (error) {
    console.error("Fetch Error:", error);
    blogData = [];
  }

  // ensure required fields are present

  return (
    <div className={style.page}>
      <h1 className={style.title}>Newest Blog</h1>
      <div className={style.briefCards}>
        {blogData.map((data, index) => {
          return (
            <div key={index} className={style.briefCard}>
              <Brief
                title={data.title || "Title"}
                date={new Date(data.created_at || new Date("undifined"))}
                views={data.views || 0}
                tags={data.tags || []}
                category={data.category || { name: "" }}
                abstract={data.description || "No description"}
                url={data.uri || "/blog/404"}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
