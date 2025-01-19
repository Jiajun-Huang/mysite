import { Input } from "antd";
import React, { useState } from "react";
import MarkDown from "./markdown"; // The Markdown renderer component

interface MarkdownEditorProps {
  name: string; // The name for the Form.Item
  label: string; // The label for the Form.Item
  initialValue?: string; // Initial value for the Markdown editor
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  name,
  label,
  initialValue = "",
}) => {
  const [markdownText, setMarkdownText] = useState(initialValue);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdownText(e.target.value);
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
        value={markdownText}
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
          {markdownText || "Your rendered Markdown will appear here."}
        </MarkDown>
      </div>
    </div>
  );
};

export default MarkdownEditor;
