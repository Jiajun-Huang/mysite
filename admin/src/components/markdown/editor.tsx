import { Input } from "antd";
import React from "react";
import MarkDown from "./markdown"; // The Markdown renderer component

interface MarkdownEditorProps {
  text: string;
  setText: (text: string) => void;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ text, setText }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "70vh",
      }}
    >
      <Input.TextArea
        rows={12}
        value={text}
        onChange={handleInputChange}
        placeholder="Type your Markdown here..."
        style={{
          width: "50%",

          resize: "none",
          border: "none",
          borderRight: "1px solid #333", // Single dividing line
          borderRadius: 0,
          padding: "16px",
          fontFamily: "monospace",
        }}
      />
      <div
        style={{
          width: "50%",

          padding: "16px",
          overflowY: "scroll",
        }}
      >
        <MarkDown>
          {text || "Start with second level heading (##)"}
        </MarkDown>
      </div>
    </div>
  );
};

export default MarkdownEditor;
