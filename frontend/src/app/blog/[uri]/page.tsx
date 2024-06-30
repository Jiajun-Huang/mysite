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
  const tags = data.tags || [];
  const text = data.text;
  if (!data || !text) {
    return <h1>404 Not Found</h1>;
  }
  return (
    <div>
      <h1 className={style.title}>{data.title}</h1>
      <div className={style.info}>
        <span>
          created at{" "}
          {new Date(data.created_at || "invalid").toLocaleDateString()}
        </span>
        <span>{data.category?.name}</span>
        <span>
          {tags.map((tag, index) => {
            const tagName = tag.name || "tag";
            return <span key={index}>{tagName }</span>;
          })}{" "}
        </span>
      </div>
      <span>{data.description}</span>

      <span>{data.likes} likes</span>
      <span>{data.views} views</span>
      <br />
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
