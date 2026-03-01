// import { UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Dropdown, message } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../../provider/auth.tsx";
import Clock from "../NowTime";

const UserInfo: React.FC = () => {
  const navigateTo = useNavigate();
  const { userInfo, logout, getUserInfo } = useAuth();
  
  useEffect(() => {
    if (!userInfo) {
      getUserInfo();
    }
  }, [userInfo, getUserInfo]);

  const LogoutClick = () => {
    logout();
    message.success("Logged out successfully");
    navigateTo("/login");
  };

  const items: MenuProps["items"] = [
    {
      label: userInfo?.email || "No email",
      key: "0",
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      label: (
        <a href="#" onClick={LogoutClick}>
          Logout
        </a>
      ),
      key: "1",
    },
  ];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <div style={{ marginRight: "5px" }}>
        <Clock />
      </div>
      <Dropdown menu={{ items }} trigger={["click"]} arrow={true}>
        <Avatar
          style={{ backgroundColor: "#1890ff", cursor: "pointer" }}
          shape="square"
          size="large"
          gap={4}
          onClick={(e) => e?.preventDefault()}
        >
          {userInfo?.username?.charAt(0).toUpperCase() || "U"}
        </Avatar>
      </Dropdown>
    </div>
  );
};

export default UserInfo;
