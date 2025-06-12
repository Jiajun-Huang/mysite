import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark as CodeStyle } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Mermaid from "../mermaid/mermaid";

const MdCode = (props: any) => {
  const { node, children, className, ...rest } = props;
  const match = /language-(\w+)/.exec(className || "");
  // console.log(props);
  if (className === "language-mermaid") {
    return <Mermaid>{children}</Mermaid>;
  } else {
    return (
      <span style={{ fontSize: "0.8rem" }}>
        <SyntaxHighlighter
          {...rest}
          PreTag={node.block ? "div" : "span"}
          language={match ? match[1] : ""}
          style={CodeStyle}
          className={node.block ? "block-code" : "inline"}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      </span>
    );
  }
  // } else {
  //   return (
  //     <pre>
  //       <span style={{ fontSize: "0.8rem" }}>
  //         <code {...rest} className={className}>
  //           {children}
  //         </code>
  //       </span>
  //     </pre>
  //   );
};

export default MdCode;
