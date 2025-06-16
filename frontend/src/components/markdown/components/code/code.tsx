"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark as CodeStyle } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Mermaid from "../mermaid/mermaid";

const MdCode = (props: any) => {
  const { node, children, className, ...rest } = props;
  const match = /language-(\w+)/.exec(className || "");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(String(children).replace(/\n$/, ""));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  if (className === "language-mermaid") {
    return <Mermaid>{children}</Mermaid>;
  }

  // Inline code
  if (!node.block) {
    return (
      <span className="text-xs">
        <SyntaxHighlighter
          {...rest}
          PreTag="span"
          language={match ? match[1] : ""}
          style={CodeStyle}
          className="inline bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm border border-gray-300 dark:border-gray-600"
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      </span>
    );
  }

  // Block code with enhanced features
  return (
    <div className="relative mb-4 rounded-md overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200">
      {/* Header with language and copy button */}
      <div className="flex justify-between items-center bg-gray-800 text-gray-300 px-4 py-2 text-xs font-mono border-b border-gray-700">
        <span className="uppercase tracking-wide">
          {match ? match[1] : "text"}
        </span>
        <button
          onClick={handleCopy}
          className={`bg-transparent border px-2 py-1 rounded text-xs cursor-pointer flex items-center gap-1 transition-all duration-200 ${
            copied
              ? "border-green-500 text-green-500"
              : "border-gray-600 text-gray-400 hover:border-gray-500 hover:text-gray-300"
          }`}
        >
          {copied ? (
            <>
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code content */}
      <div className="text-sm">
        <SyntaxHighlighter
          {...rest}
          PreTag="div"
          language={match ? match[1] : ""}
          style={CodeStyle}
          className="block-code"
          // showLineNumbers={true}
          // lineNumberStyle={{
          //   minWidth: "0.4rem",
          //   paddingRight: "1em",
          //   textAlign: "right",
          //   userSelect: "none",
          //   opacity: 1,
          //   // fontStyle: "normal",
          // }}
          customStyle={{
            margin: 0,
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            borderBottomLeftRadius: "6px",
            borderBottomRightRadius: "6px",
            fontStyle: "normal",
          }}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default MdCode;
