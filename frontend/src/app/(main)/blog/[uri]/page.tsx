import { BASE_URL } from "@/api/request";
import Comment from "@/components/comment/comment";
import MarkDown from "@/components/markdown/markdown";
import Toc from "@/components/markdown/toc/toc";
import { printDate } from "@/util/util";
import { Divider } from "@nextui-org/divider";
import "katex/dist/katex.min.css";

interface Prop {
  params: {
    uri: string;
  };
}

export default async function BlogDetail({ params }: Prop) {
  const { uri } = await params;
  const response = await fetch(BASE_URL + "/api/blog/uri/" + uri, {
    method: "GET",
    next: { revalidate: 60 },
  });

  if (response.status === 404) {
    return <h1>404 Not Found</h1>;
  }

  let { created_at, likes, views, tags, category, files, ...data } =
    await response.json();

  tags = tags || [];

  const id = data.id;
  const text = await fetch(BASE_URL + "/api/blog/file/" + id, {
    method: "GET",
    next: { revalidate: 60 },
  }).then((res) => res.text());

  const dateStr = printDate(created_at);
  return (
    <div>
      <h1 className="text-4xl font-bold mb-7">{data.title}</h1>
      <div className="flex gap-x-4 flex-col text-default-400">
        <div>Created at: {dateStr}</div>
        {/* <div className="flex gap-x-4">
          <span>{likes} likes</span>
          <span>{views} views</span>
        </div> */}
        <div>Category : {category.name}</div>
        <div className="flex gap-x-1">
          <span>Tags:</span>
          {tags.map((tag, index) => (
            <span size="sm" key={index}>
              {tag.name}
            </span>
          ))}
        </div>
      </div>

      <Divider className="my-4" />
      <div className="flex gap-x-16">
        <div id="content" className="w-3/4">
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
        <div className="w-1/4 ">
          <div className="sticky top-36">
            <Toc queryId="content" />
          </div>
        </div>
      </div>
      <Comment placeholder="write a comment" blog={data.id} type={0}></Comment>
    </div>
  );
}
