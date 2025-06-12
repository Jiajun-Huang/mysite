import { useQuery } from "@tanstack/react-query";
import { Space, Table, Tag } from "antd";
import { useNavigate } from "react-router";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

interface BlogPost {
  id: number;
  title: string;
  created_at: string;
  category: { name: string };
  tags: { name: string }[];
}

const columns = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Create Date",
    dataIndex: "created_at",
    key: "created_at",
    render: (date) => new Date(date).toLocaleDateString(),
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    render: (category) => <Tag>{category.name}</Tag>,
  },
  {
    title: "Tags",
    key: "tags",
    dataIndex: "tags",
    render: (tags, _) => (
      <>
        {tags.map((tag) => {
          console.log(tag, _);
          return <Tag key={tag}>{tag.name.toUpperCase()}</Tag>;
        })}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <a onClick={() => handleEdit(record.id)}>Edit</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

export default function BlogList() {
  const navigate = useNavigate();

  const handleEdit = (id: number) => {
    navigate(`/blog/edit/${id}`);
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["blog"],
    queryFn: async () => {
      const response = await fetch("api/blog/");
      return await response.json();
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log(data);

  return <Table<DataType> columns={columns} dataSource={data} />;
}
