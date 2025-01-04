import React, { useState } from "react";
import { Layout, theme } from "antd";
import { Outlet } from "react-router-dom";
import MainMenu from "@/views/Layout/MainMenu";
import MainBreadcrumbs from "@/views/Layout/MainBreadcrumbs";
import UserInfo from "@/views/Layout/UserInfo";
import logo from "@/assets/react.svg";

const { Header, Content, Footer, Sider } = Layout;

const View: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* 左边侧边栏 */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          className="demo-logo-vertical"
          style={{
            height: "60px",
            // padding: "20px",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={logo} alt="" sizes="" style={{ height: "30px" }} />
        </div>
        {/* 菜单栏 */}
        <MainMenu />
      </Sider>
      {/* 右边内容 */}
      <Layout>
        {/* 右边顶部 */}
        <Header
          style={{
            padding: "0 40px",
            background: colorBgContainer,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* 顶部面包屑导航 */}
          <MainBreadcrumbs />
          {/* 个人信息和退出登录 */}
          <UserInfo />
        </Header>
        {/* 右边主体内容 */}
        <Content
          style={{ margin: "16px 16px 0 16px", background: colorBgContainer }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
            }}
          >
            {/* Bill is a cat. */}
            <Outlet />
          </div>
        </Content>
        {/* 右边底部 */}
        <Footer style={{ textAlign: "center", padding: 0, lineHeight: "48px" }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default View;
