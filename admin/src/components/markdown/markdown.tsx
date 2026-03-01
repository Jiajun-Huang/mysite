import ReactMarkdown, { UrlTransform } from "react-markdown";

import MdCode from "./components/code/code";
import MdImage from "./components/image/image";
import { rehypePlugins, remarkPlugins } from "./config";
import "./markdown.css";

interface Props {
  children: string;
  urlTransform?: UrlTransform;
}

const MarkDown = ({ children, urlTransform }: Props) => {
  if (!children) {
    return <div />;
  }

  return (
    <div className="markdown">
      <ReactMarkdown
        components={{
          code: MdCode,
          img: MdImage,
        }}
        rehypePlugins={rehypePlugins}
        remarkPlugins={remarkPlugins}
        urlTransform={urlTransform}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
};

export default MarkDown;
//https://github.com/kevinzunigacuellar/remark-code-title
//https://github.com/zestedesavoir/zmarkdown/tree/HEAD/packages/remark-iframes#readme
//https://github.com/remarkjs/react-markdown/issues/622
