import { Col, Form, Input, Row } from "antd";
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
    <Form.Item
      name={name}
      label={label}
      initialValue={initialValue}
      rules={[{ required: true, message: "This field is required!" }]}
    >
      <Row gutter={16}>
        {/* Input Area */}
        <Col span={12}>
          <Input.TextArea
            rows={12}
            value={markdownText}
            onChange={handleInputChange}
            placeholder="Type your Markdown here..."
            style={{ height: "100%", resize: "none" }}
          />
        </Col>
        {/* Rendered Markdown Preview */}
        <Col span={12}>
          <div
            className="markdown-preview"
            style={{
              border: "1px solid #d9d9d9",
              padding: "8px",
              height: "100%",
              overflowY: "auto",
            }}
          >
            <MarkDown>
              {markdownText || "Your rendered Markdown will appear here."}
            </MarkDown>
          </div>
        </Col>
      </Row>
    </Form.Item>
  );
};

export default MarkdownEditor;
