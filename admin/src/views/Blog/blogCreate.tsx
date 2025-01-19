import { SaveOutlined, UploadOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Col, Form, Input, Row, Select, Space } from "antd";
import { useState } from "react";
import { fetchCategories, fetchTags } from "../../apis/blog";
import MarkdownEditor from "../../components/markdown/editor";

const { TextArea } = Input;

const BlogCreate = () => {
  // query the tag and category
  const tagQuery = useQuery({
    queryKey: ["users"],
    queryFn: fetchTags,
  });
  
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const categoryQuery = useQuery({
    queryKey: ["posts"],
    queryFn: fetchCategories,
  });

  if (tagQuery.isLoading || categoryQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (tagQuery.isError || categoryQuery.isError) {
    return <div>Error...</div>;
  }


  const onSaveAsDraft = async (values) => {
    setIsSubmitting(true);
    try {
      const mdContent = values.content;
      const mdFile = new File([mdContent], `${values.titleEn}.md`, {
        type: "text/markdown",
      });

      const formData = new FormData();
      formData.append("files", mdFile);
      formData.append("titleZh", values.titleZh);
      formData.append("titleEn", values.titleEn);
      formData.append("category", values.category);
      formData.append("tags", JSON.stringify(values.tags));
      formData.append("content", mdContent);

      const response = await fetch("/api/blog", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to save markdown");
      }

      message.success("Successfully saved as draft!");
    } catch (err) {
      message.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onPublish = async (values) => {
    setIsSubmitting(true);
    try {
      const mdContent = values.content;
      const mdFile = new File([mdContent], `${values.titleEn}.md`, {
        type: "text/markdown",
      });

      const formData = new FormData();
      formData.append("files", mdFile);
      formData.append("titleZh", values.titleZh);
      formData.append("titleEn", values.titleEn);
      formData.append("category", values.category);
      formData.append("tags", JSON.stringify(values.tags));
      formData.append("content", mdContent);
      formData.append("status", "published");

      const response = await fetch("/api/blog", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to publish markdown");
      }

      message.success("Successfully published!");
    } catch (err) {
      message.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Form form={form} layout="horizontal" onFinish={onSaveAsDraft}>
        <Row justify="space-between">
          <Col span={12}>
            <Form.Item
              name="titleZh"
              label="Title"
              rules={[{ required: true, message: "Please enter the title!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="url"
              label="URL"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              rules={[{ required: true, message: "Please enter the URL " }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row justify="space-between">
          <Col span={8}>
            <Form.Item
              name="category"
              label="Category"
              rules={[
                { required: true, message: "Please choose the category" },
              ]}
            >
              <Select>
                <Select.Option value="javascript">
                  JavaScript 常见问题
                </Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="tags"
              label="Tags"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
            >
              <Select
                mode="tags"
                style={{ width: "100%" }}
                placeholder="添加标签"
                defaultValue={["JavaScript", "模块化"]}
              >
                <Select.Option value="javascript">JavaScript</Select.Option>
                <Select.Option value="模块化">模块化</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Created at"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
            >
              <Input disabled defaultValue={new Date().toLocaleString()} />
            </Form.Item>
          </Col>
        </Row>

        <MarkdownEditor name="content" label="内容" />

        <Form.Item wrapperCol={{ span: 24 }}>
          <Space style={{ float: "right" }}>
            <Button
              icon={<SaveOutlined />}
              onClick={() => form.submit()}
              loading={isSubmitting}
            >
              存为草稿
            </Button>
            <Button
              type="primary"
              icon={<UploadOutlined />}
              onClick={() => onPublish(form.getFieldsValue())}
              loading={isSubmitting}
            >
              更新文章
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BlogCreate;
