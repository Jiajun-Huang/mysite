import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark as CodeStyle } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Mermaid from "../mermaid/mermaid";

const MdCode = (props: any) => {
  const { node, children, className, ...rest } = props;
  const match = /language-(\w+)/.exec(className || "");
  console.log(props);
  if (className === "language-mermaid") {
    return <Mermaid>{children}</Mermaid>;
  } else {
    return (
      <span style={{ fontSize: "0.8rem" }}>
        <SyntaxHighlighter
          {...rest}
          PreTag={children == "inline code" ? "span" : "div"}
          language={match ? match[1] : ""}
          style={CodeStyle}
          className={children == "inline code" ? "inline" : "block-code"}
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
