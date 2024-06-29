import Brief from "@/components/blog/brief/brief";
import style from "./page.module.scss";

const fakeData = [
  {
    title: "chatGPT 国内镜像搭建教程(3.5/4)",
    date: "2023-06-28T00:00:00Z",
    views: 253,
    tags: ["工具", "人生"],
    category: "原创",
    abstract:
      "一个非常好用的开源项目:ChatGPT-Next-Web, 这个开源项目可以做到一键免费部署你的私人ChatGPT网页应用。",
    url: "chatGPT",
  },
  {
    title: "How to Build a Personal ChatGPT Web App",
    date: "2023-05-15T00:00:00Z",
    views: 150,
    tags: ["Tutorial", "Web"],
    category: "Guide",
    abstract:
      "A very useful open-source project: ChatGPT-Next-Web. This project allows you to deploy your personal ChatGPT web app for free with a single click.",
    url: "chatGPT",
  },
];

export default function Home() {
  return (
    <div className={style.page}>
      <h1 className={style.title}>Newest Blog</h1>
      <div className={style.briefCards}>
        {fakeData.map((data, index) => (
          <div key={index} className={style.briefCard}>
            <Brief
              title={data.title}
              date={new Date(data.date)}
              views={data.views}
              tags={data.tags}
              category={data.category}
              abstract={data.abstract}
              url={data.url}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
