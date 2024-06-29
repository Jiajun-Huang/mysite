import MarkDown from "@/components/markdown/markdown";
import Toc from "@/components/markdown/toc/toc";
import style from "./page.module.scss";

interface Data extends Blog {
  text: string;
}

interface Prop {
  params: {
    uri: string;
  };
}

export default async function BlogDetail({ params }: Prop) {
  const uri = params.uri;
  const response = await fetch("http://localhost:3000/api/blog/uri/" + uri, {
    method: "GET",
  });

  if (response.status === 404) {
    return <h1>404 Not Found</h1>;
  }

  const data: Data = await response.json();
  const text = data.text;
  if (!data || !text) {
    return <h1>404 Not Found</h1>;
  }
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
