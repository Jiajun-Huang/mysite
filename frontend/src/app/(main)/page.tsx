import { BASE_URL } from "@/api/request";
import Brief from "@/components/blog/brief/brief";
import style from "./page.module.scss";

export default async function Home() {
  const data = await fetch(BASE_URL + "/api/blog", {
    method: "GET",
  });
  const fakeData: Blog[] = await data.json();

  // ensure required fields are present

  return (
    <div className={style.page}>
      <h1 className={style.title}>Newest Blog</h1>
      <div className={style.briefCards}>
        {fakeData.map((data, index) => {
          console.log(data.tags);
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
