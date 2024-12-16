import { BASE_URL } from "@/api/request";
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
  const response = await fetch(BASE_URL + "/api/blog/uri/" + uri, {
    method: "GET",
    next: { revalidate: 3600 },
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
  const response = await fetch(BASE_URL + "/api/blog/uri/" + uri, {
    method: "GET",
  });
  if (response.status === 404) {
    return <h1>404 Not Found</h1>;
  }

  // console.log(await response.text());

  let { created_at, likes, views, tags, category, files, ...data }: Data =
    await response.json();

  tags = tags || [];

  const id = data.id;
  const text = await fetch(BASE_URL + "/api/blog/file/" + id, {
    method: "GET",
    next: { revalidate: 60 },
  }).then((res) => res.text());
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
            <MarkDown
              urlTransform={(url, key, node) => {
                if (key === "src" && node.tagName === "img") {
                  const newUrl =
                    BASE_URL +
                    "/api/blog/image/" +
                    uri +
                    "?" +
                    new URLSearchParams({ url }).toString();
                  return newUrl;
                }
              }}
            >
              {text}
            </MarkDown>
          </div>
        </div>
        <input
          type="checkbox"
          id={style.sidebarActive}
          style={{ display: "none" }}
        />

        <label htmlFor={style.sidebarActive} className={style.toogleCheckbox}>
          &#9776;
        </label>
        <div className={style.tocContainer}>
          <label id={style.overlay} htmlFor={style.sidebarActive}></label>
          <div className={style.toc}>
            <Toc />
          </div>
        </div>
      </div>
      <h2>Comments</h2>
      <Comment placeholder="write a comment" blog={data.id} type={0}></Comment>
    </div>
  );
}
