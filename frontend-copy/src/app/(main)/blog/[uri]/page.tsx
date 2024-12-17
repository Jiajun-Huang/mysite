import { BASE_URL } from "@/api/request";
import MarkDown from "@/components/markdown/markdown";
import "katex/dist/katex.min.css";

interface Prop {
  params: {
    uri: string;
  };
}

export default async function BlogDetail({ params }: Prop) {
  const uri = params.uri;
  const response = await fetch(BASE_URL + "/api/blog/uri/" + uri, {
    method: "GET",
    next: { revalidate: 60 },
  });

  if (response.status === 404) {
    return <h1>404 Not Found</h1>;
  }

  let { created_at, likes, views, tags, category, files, ...data }: Data =
    await response.json();

  tags = tags || [];

  const id = data.id;
  const text = await fetch(BASE_URL + "/api/blog/file/" + id, {
    method: "GET",
    next: { revalidate: 60 },
  }).then((res) => res.text());

  return (
    <div>
      <h1>{data.title}</h1>
      <div>
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
  );
}
