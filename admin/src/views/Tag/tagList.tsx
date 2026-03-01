import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, Modal, Space, Table, message } from "antd";
import { useState } from "react";
import { createTag, deleteTag, fetchTags, updateTag } from "../../apis/blog";

interface Tag {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

const TagList = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const [form] = Form.useForm();

  const { data: tags, isLoading } = useQuery<Tag[]>({
    queryKey: ["tags"],
    queryFn: fetchTags,
  });

  const createMutation = useMutation({
    mutationFn: createTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      message.success("Tag created successfully");
      handleCloseModal();
    },
    onError: () => {
      message.error("Failed to create tag");
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, name }: { id: number; name: string }) =>
      updateTag(id, name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      message.success("Tag updated successfully");
      handleCloseModal();
    },
    onError: () => {
      message.error("Failed to update tag");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTag,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tags"] });
      message.success("Tag deleted successfully");
    },
    onError: () => {
      message.error("Failed to delete tag");
    },
  });

  const handleCreate = () => {
    setEditingTag(null);
    form.resetFields();
    setIsModalOpen(true);
  };

  const handleEdit = (tag: Tag) => {
    setEditingTag(tag);
    form.setFieldsValue({ name: tag.name });
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: "Are you sure you want to delete this tag?",
      content: "This action cannot be undone.",
      okText: "Delete",
      okType: "danger",
      onOk: () => {
        deleteMutation.mutate(id);
      },
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTag(null);
    form.resetFields();
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editingTag) {
        updateMutation.mutate({ id: editingTag.id, name: values.name });
      } else {
        createMutation.mutate(values.name);
      }
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: "Updated At",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: "Actions",
      key: "actions",
      width: 150,
      render: (_: unknown, record: Tag) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
          Create Tag
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={tags}
        loading={isLoading}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={editingTag ? "Edit Tag" : "Create Tag"}
        open={isModalOpen}
        onCancel={handleCloseModal}
        onOk={handleSubmit}
        confirmLoading={createMutation.isPending || updateMutation.isPending}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Tag Name"
            name="name"
            rules={[
              { required: true, message: "Please enter tag name" },
              { max: 50, message: "Tag name cannot exceed 50 characters" },
            ]}
          >
            <Input placeholder="Enter tag name" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TagList;
