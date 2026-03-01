import { UploadOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
  Spin,
} from "antd";
import { useCallback, useEffect, useState } from "react";
import { UrlTransform } from "react-markdown";
import { useNavigate, useParams } from "react-router";
import {
  fetchBlog,
  fetchBlogMarkdown,
  fetchCategories,
  fetchTags,
  updateBlog,
} from "../../apis/blog";
import MarkdownEditor from "../../components/markdown/editor";
import { useAuth } from "../../provider/auth";

const { TextArea } = Input;

interface SelectOptionItem {
  id: number;
  name: string;
}

interface BlogEditFormValues {
  title: string;
  description: string;
  category: number;
  tags: number[];
  uri: string;
}

const BlogEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { accessToken } = useAuth();
  const [mdText, setMdText] = useState("");

  // Fetch tags and categories
  const tagQuery = useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
  });

  const categoryQuery = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  // Fetch blog data
  const blogQuery = useQuery({
    queryKey: ["blog", id],
    queryFn: () => fetchBlog(id!),
    enabled: !!id,
  });

  // Fetch blog markdown content
  const markdownQuery = useQuery({
    queryKey: ["blogMarkdown", id],
    queryFn: () => fetchBlogMarkdown(id!),
    enabled: !!id,
  });

  // Populate form when blog data is loaded
  useEffect(() => {
    if (blogQuery.data) {
      form.setFieldsValue({
        title: blogQuery.data.title,
        description: blogQuery.data.description,
        uri: blogQuery.data.uri,
        category: blogQuery.data.category,
        tags: blogQuery.data.tags,
      });
    }
  }, [blogQuery.data, form]);

  // Set markdown text when loaded
  useEffect(() => {
    if (markdownQuery.data) {
      setMdText(markdownQuery.data);
    }
  }, [markdownQuery.data]);

  const markdownImageTransform = useCallback<UrlTransform>(
    (url, key, node) => {
      if (key === "src" && node.tagName === "img") {
        const blogUri = blogQuery.data?.uri;
        if (!blogUri) {
          return url;
        }

        if (
          /^https?:\/\//i.test(url) ||
          url.startsWith("data:") ||
          url.startsWith("blob:") ||
          url.startsWith("/api/blog/image/")
        ) {
          return url;
        }

        const normalizedUrl = url.split(/[?#]/)[0].replace(/^\.\//, "");
        return `/api/blog/image/${blogUri}?${new URLSearchParams({
          url: normalizedUrl,
        }).toString()}`;
      }

      return url;
    },
    [blogQuery.data?.uri],
  );

  if (
    tagQuery.isLoading ||
    categoryQuery.isLoading ||
    blogQuery.isLoading ||
    markdownQuery.isLoading
  ) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", padding: "50px" }}
      >
        <Spin size="large" />
      </div>
    );
  }

  if (
    tagQuery.isError ||
    categoryQuery.isError ||
    blogQuery.isError ||
    markdownQuery.isError
  ) {
    return <div>Error loading data...</div>;
  }

  const handleUpdate = async (values: BlogEditFormValues) => {
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
      formData.append("category", String(values.category));
      formData.append("tags", values.tags.join(","));
      formData.append("uri", values.uri);

      await updateBlog(id!, formData, accessToken!);
      message.success("Blog updated successfully!");
      navigate("/blog/list");
    } catch (err: unknown) {
      const messageText =
        err instanceof Error ? err.message : "Failed to update blog";
      message.error(messageText);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Blog</h2>
      <Form form={form} layout="horizontal" onFinish={handleUpdate}>
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
                {categoryQuery.data.map((category: SelectOptionItem) => (
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
                {tagQuery.data.map((tag: SelectOptionItem) => (
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
          <MarkdownEditor
            text={mdText}
            setText={setMdText}
            urlTransform={markdownImageTransform}
          />
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
              Update Blog
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BlogEdit;
