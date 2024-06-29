import ReactMarkdown from "react-markdown";
import MdCode from "./code/code";
import { rehypePlugins, remarkPlugins } from "./config";
import style from "./markdown.module.scss";
interface Props {
  children: string;
  urlTransform?: (url: string) => string;
}

const MarkDown = ({ children, urlTransform, ...otherProps }: Props) => {
  if (!children) {
    return <div className="Markdown"></div>;
  }

  return (
    <div className={style.markdown} id="blog-body">
      <ReactMarkdown
        remarkPlugins={remarkPlugins}
        rehypePlugins={rehypePlugins}
        urlTransform={urlTransform}
        components={{
          code: MdCode,
        }}
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
