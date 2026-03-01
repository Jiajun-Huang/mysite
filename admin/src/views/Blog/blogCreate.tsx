import { UploadOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Col, Form, Input, message, Row, Select, Space } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router";
import { fetchCategories, fetchTags } from "../../apis/blog";
import MarkdownEditor from "../../components/markdown/editor";
import { useAuth } from "../../provider/auth";

const { TextArea } = Input;

const BlogCreate = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { accessToken } = useAuth();
  const [mdText, setMdText] = useState("");

  // Query tags and categories
  const tagQuery = useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
  });

  const categoryQuery = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  if (tagQuery.isLoading || categoryQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (tagQuery.isError || categoryQuery.isError) {
    return <div>Error loading data...</div>;
  }

  const handlePost = async (values: any) => {
    setIsSubmitting(true);
    try {
      const mdContent = mdText;
      const mdFile = new File([mdContent], `${values.title}.md`, {
        type: "text/markdown",
      });

      const formData = new FormData();
      formData.append("files", mdFile);
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("category", values.category);
      formData.append(
        "tags",
        Array.isArray(values.tags) ? values.tags.join(",") : values.tags,
      );
      formData.append("uri", values.uri);

      const response = await fetch("/api/blog/", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to create blog post");
      }

      message.success("Blog created successfully!");
      navigate("/blog/list");
    } catch (err: any) {
      message.error(err.message || "Failed to create blog");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Create New Blog</h2>
      <Form form={form} layout="horizontal" onFinish={handlePost}>
        <Row justify="space-between">
          <Col span={12}>
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: "Please enter the title!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="uri"
              label="URL"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
              rules={[{ required: true, message: "Please enter the URL!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row justify="space-between">
          <Col span={12}>
            <Form.Item
              name="category"
              label="Category"
              rules={[
                { required: true, message: "Please choose the category" },
              ]}
            >
              <Select>
                {categoryQuery.data.map((category: any) => (
                  <Select.Option key={category.id} value={category.id}>
                    {category.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="tags"
              label="Tags"
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 18 }}
            >
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="Select tags"
              >
                {tagQuery.data.map((tag: any) => (
                  <Select.Option key={tag.id} value={tag.id}>
                    {tag.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: "Please add a description!" }]}
            >
              <TextArea rows={3} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item wrapperCol={{ span: 24 }}>
          <MarkdownEditor text={mdText} setText={setMdText} />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }}>
          <Space style={{ float: "right" }}>
            <Button onClick={() => navigate("/blog/list")}>Cancel</Button>
            <Button
              type="primary"
              icon={<UploadOutlined />}
              htmlType="submit"
              loading={isSubmitting}
            >
              Create Blog
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BlogCreate;
