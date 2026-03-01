import {
  AppstoreOutlined,
  EyeOutlined,
  FileTextOutlined,
  LikeOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Card, Col, Row, Spin, Statistic, Table } from "antd";
import { useNavigate } from "react-router";
import { fetchDashboardStats } from "../../apis/blog";
import styled from "./index.module.scss";

export const Home = () => {
  const { homeBox } = styled;
  const navigate = useNavigate();

  const { data: stats, isLoading } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: fetchDashboardStats,
  });

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
      </div>
    );
  }

  const recentBlogsColumns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text: string, record: any) => (
        <a onClick={() => navigate(`/blog/edit/${record.id}`)}>{text}</a>
      ),
    },
    {
      title: "Views",
      dataIndex: "views",
      key: "views",
      width: 100,
    },
    {
      title: "Likes",
      dataIndex: "likes",
      key: "likes",
      width: 100,
    },
    {
      title: "Created",
      dataIndex: "created_at",
      key: "created_at",
      width: 200,
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
  ];

  return (
    <div className={homeBox}>
      <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
        <Col span={8}>
          <Card hoverable>
            <Statistic
              title="Total Blogs"
              value={stats?.totalBlogs || 0}
              prefix={<FileTextOutlined />}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card hoverable>
            <Statistic
              title="Total Tags"
              value={stats?.totalTags || 0}
              prefix={<TagsOutlined />}
              valueStyle={{ color: "#1890ff" }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card hoverable>
            <Statistic
              title="Total Categories"
              value={stats?.totalCategories || 0}
              prefix={<AppstoreOutlined />}
              valueStyle={{ color: "#cf1322" }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: "20px" }}>
        <Col span={12}>
          <Card hoverable>
            <Statistic
              title="Total Views"
              value={stats?.totalViews || 0}
              prefix={<EyeOutlined />}
              valueStyle={{ color: "#722ed1" }}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card hoverable>
            <Statistic
              title="Total Likes"
              value={stats?.totalLikes || 0}
              prefix={<LikeOutlined />}
              valueStyle={{ color: "#eb2f96" }}
            />
          </Card>
        </Col>
      </Row>

      <Card title="Recent Blogs" style={{ marginBottom: "20px" }}>
        <Table
          columns={recentBlogsColumns}
          dataSource={stats?.recentBlogs || []}
          rowKey="id"
          pagination={false}
        />
      </Card>
    </div>
  );
};

export default Home;
