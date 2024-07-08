import Comment from "@/components/comment/comment";
import MarkDown from "@/components/markdown/markdown";
import Toc from "@/components/markdown/toc/toc";
import { printDate } from "@/util/util";
import { Metadata } from "next/types";
import style from "./page.module.scss";

interface Data extends Blog {
  text: string;
}

interface Prop {
  params: {
    uri: string;
  };
}
export async function generateMetadata({ params }: Prop): Promise<Metadata> {
  const uri = params.uri;
  const response = await fetch("http://localhost:3000/api/blog/uri/" + uri, {
    method: "GET",
  });

  if (response.status === 404) {
    return {
      title: "404 Not Found",
      description: "404 Not Found",
    };
  }
  let { title, description }: Data = await response.json();
  return {
    title: title || "404 Not Found",
    description: description || "404 Not Found",
  };
}

export default async function Index({ params }: Prop) {
  const uri = params.uri;
  const response = await fetch("http://localhost:3000/api/blog/uri/" + uri, {
    method: "GET",
  });

  if (response.status === 404) {
    return <h1>404 Not Found</h1>;
  }

  let { created_at, likes, views, tags, category, ...data }: Data =
    await response.json();

  tags = tags || [];
  const text = data.text;
  if (!data || !text) {
    return <h1>404 Not Found</h1>;
  }

  const dateStr = printDate(created_at || "");

  return (
    <div className={style.page}>
      <h1 className={style.title}>{data.title}</h1>
      <div className={style.infos}>
        <div>
          <span>{dateStr}</span>
          {/* <span>{likes} likes</span>
          <span>{views} views</span> */}
        </div>
        {/* <div>
          tags:{" "}
          {tags.map((tag, index) => (
            <span key={index} className={style.tag}>
              {tag.name}
            </span>
          ))}
          <span className={style.category}>{category?.name}</span>
        </div> */}
      </div>
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
      <h2>Comments</h2>
      <Comment placeholder="write a comment" blog={data.id} type={0}></Comment>
    </div>
  );
}
