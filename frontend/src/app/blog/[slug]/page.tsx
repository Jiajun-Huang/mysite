import MarkDown from "@/components/markdown/markdown";
import Toc from "@/components/markdown/toc/toc";
import fs from "fs";
import style from "./page.module.scss";

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
