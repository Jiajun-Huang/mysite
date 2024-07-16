import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark as CodeStyle } from "react-syntax-highlighter/dist/cjs/styles/prism";

const MdCode = (props: any) => {
  const { node, children, className, ...rest } = props;
  const match = /language-(\w+)/.exec(className || "");
  if (match) {
    return (
      <SyntaxHighlighter
        {...rest}
        PreTag="div"
        language={match[1]}
        style={CodeStyle}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    );
  } else {
    return (
      <code {...rest}>
        {children}
      </code>
    );
  }
};

export default MdCode;
