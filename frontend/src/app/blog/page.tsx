import Brief from "@/components/blog/brief/brief";
import style from "./page.module.scss";
interface Data {
  id: number;
  title: string;
  discription: string;
  created_at: string;
  views: number;
  likes: number;
  uri: string;
  tags: string[];
  category: string;

  // other fields
  [key: string]: any;
}

export default async function Home() {
  const data = await fetch("http://localhost:3000/api/blog", {
    method: "GET",
  });
  const fakeData: any[] = await data.json();

  return (
    <div className={style.page}>
      <h1 className={style.title}>Newest Blog</h1>
      <div className={style.briefCards}>
        {fakeData.map((data, index) => {
          console.log(data.tags);
          return (
            <div key={index} className={style.briefCard}>
              <Brief
                title={data.title}
                date={new Date(data.created_at)}
                views={data.views}
                tags={data.tags}
                category={data.category.name}
                abstract={data.discription}
                url={data.uri}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
