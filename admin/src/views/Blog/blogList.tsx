import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message, Popconfirm, Space, Table, Tag } from "antd";
import { useNavigate } from "react-router";
import { deleteBlog } from "../../apis/blog";

interface BlogPost {
  id: number;
  title: string;
  created_at: string;
  category: { name: string };
  tags: { name: string }[];
}

export default function BlogList() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleEdit = (id: number) => {
    navigate(`/blog/edit/${id}`);
  };

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteBlog(id),
    onSuccess: () => {
      message.success("Blog deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["blog"] });
    },
    onError: () => {
      message.error("Failed to delete blog");
    },
  });

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id.toString());
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: "Create Date",
      dataIndex: "created_at",
      key: "created_at",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category: any) => <Tag>{category.name}</Tag>,
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (tags: any[]) => (
        <>
          {tags.map((tag) => {
            return <Tag key={tag.name}>{tag.name.toUpperCase()}</Tag>;
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: BlogPost) => (
        <Space size="middle">
          <a onClick={() => handleEdit(record.id)}>Edit</a>
          <Popconfirm
            title="Are you sure to delete this blog?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <a style={{ color: "red" }}>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const { data, isLoading, error } = useQuery({
    queryKey: ["blog"],
    queryFn: async () => {
      const response = await fetch("/api/blog/");
      return await response.json();
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {(error as Error).message}</div>;
  }

  return <Table<BlogPost> columns={columns} dataSource={data} rowKey="id" />;
}
