import MarkDown from "@/components/markdown/markdown";
import Toc from "@/components/markdown/toc/toc";
import fs from "fs";
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
  },
  {
    title: "How to Build a Personal ChatGPT Web App",
    date: "2023-05-15T00:00:00Z",
    views: 150,
    tags: ["Tutorial", "Web"],
    category: "Guide",
    abstract:
      "A very useful open-source project: ChatGPT-Next-Web. This project allows you to deploy your personal ChatGPT web app for free with a single click.",
  },
];

export default async function BlogDetail() {
  const text = await fs.readFileSync(
    "C://Users//80419//project//mysite//frontend//src//app//blog//[slug]//example",
    "utf8"
  );

  return (
    <div>
      <h1 className={style.title}>Newest Blog</h1>
      <div className={style.layout}>
        <div className={style.content}>
          <div className={style.page}>
            <MarkDown>{text}</MarkDown>
          </div>
        </div>
        <div className={style.toc}>
          <Toc />
        </div>
      </div>
    </div>
  );
}
