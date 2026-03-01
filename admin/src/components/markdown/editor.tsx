import { Input } from "antd";
import React, { useDeferredValue, useEffect, useState } from "react";
import { UrlTransform } from "react-markdown";
import MarkDown from "./markdown"; // The Markdown renderer component

interface MarkdownEditorProps {
  text: string;
  setText: (text: string) => void;
  urlTransform?: UrlTransform;
  syncDelayMs?: number;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  text,
  setText,
  urlTransform,
  syncDelayMs = 150,
}) => {
  const [draftText, setDraftText] = useState(text);
  const deferredText = useDeferredValue(draftText);

  useEffect(() => {
    setDraftText(text);
  }, [text]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (draftText !== text) {
        setText(draftText);
      }
    }, syncDelayMs);

    return () => {
      window.clearTimeout(timer);
    };
  }, [draftText, setText, syncDelayMs, text]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDraftText(e.target.value);
  };

  const flushDraftToParent = () => {
    if (draftText !== text) {
      setText(draftText);
    }
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
        value={draftText}
        onChange={handleInputChange}
        onBlur={flushDraftToParent}
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
        <MarkDown urlTransform={urlTransform}>
          {deferredText || "Start with second level heading (##)"}
        </MarkDown>
      </div>
    </div>
  );
};

export default MarkdownEditor;
