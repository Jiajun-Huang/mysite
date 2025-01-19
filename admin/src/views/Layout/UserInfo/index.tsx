// import { UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Dropdown } from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../../provider/auth.tsx";
import Clock from "../NowTime";

const UserInfo: React.FC = () => {
  const navigateTo = useNavigate();
  const { userInfo, logout, getUserInfo } = useAuth();
  useEffect(() => {
    console.log("userInfo", userInfo);
    if (!userInfo) {
      getUserInfo();
    }
  }, [userInfo, getUserInfo]);

  const LogoutClick = () => {
    logout();
    navigateTo("/login");
  };

  const items: MenuProps["items"] = [
    {
      label: (
        <a href="#" onClick={LogoutClick}>
          退出登录
        </a>
      ),
      key: "3",
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
          style={{ backgroundColor: "#00a2ae", cursor: "pointer" }}
          shape="square"
          size="large"
          gap={4}
          onClick={(e) => e?.preventDefault()}
        >
          {userInfo?.username}
        </Avatar>
      </Dropdown>
    </div>
  );
};

export default UserInfo;
