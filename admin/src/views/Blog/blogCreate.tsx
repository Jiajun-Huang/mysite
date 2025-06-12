import { SaveOutlined, UploadOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Col, Form, Input, message, Row, Select, Space } from "antd";
import { useState } from "react";
import { fetchCategories, fetchTags } from "../../apis/blog";
import MarkdownEditor from "../../components/markdown/editor";
import { useAuth } from "../../provider/auth";

const { TextArea } = Input;

const BlogCreate = () => {
  // query the tag and category
  const tagQuery = useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
  });

  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { accessToken } = useAuth();
  const [mdText, setMdText] = useState("");

  const categoryQuery = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  if (tagQuery.isLoading || categoryQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (tagQuery.isError || categoryQuery.isError) {
    return <div>Error...</div>;
  }

  const handlePost = async (values, status) => {
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
      formData.append("tags", values.tags);
      formData.append("uri", values.uri);
      console.log(values);
      const response = await fetch("/api/blog/", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(
          status === "draft" ? "Failed to save draft" : "Failed to publish post"
        );
      }

      message.success(
        status === "draft"
          ? "Successfully saved as draft!"
          : "Successfully published!"
      );
    } catch (err) {
      message.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Form
        form={form}
        layout="horizontal"
        onFinish={(values) => handlePost(values, "draft")}
      >
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
                {categoryQuery.data.map((category) => (
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
                mode="tags"
                style={{ width: "100%" }}
                placeholder="添加标签"
              >
                {tagQuery.data.map((tag) => (
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
              onClick={() => handlePost(form.getFieldsValue(true), "published")}
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
