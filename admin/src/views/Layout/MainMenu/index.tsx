import { menuClick, MenuItem, getItemType } from "@/types/mainMenu";
import React, { useState, useEffect } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { useNavigate, useLocation } from "react-router-dom";

const getItem: getItemType = function getItem(
  label,
  key,
  icon,
  children,
  type
) {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
};

const items: MenuItem[] = [
  getItem("Home", "/home", <HomeOutlined />),
  getItem("About", "/about", <PieChartOutlined />),
  getItem("Page", "/page", <DesktopOutlined />),
  getItem("User", "/user", <UserOutlined />, [
    getItem("Menu", "/user/menu"),
    getItem("User-02", "/user/user-02"),
    getItem("User-03", "/user/user-03"),
  ]),
  getItem("Team", "/team", <TeamOutlined />, [
    getItem("Team-01", "/team/team-01"),
    getItem("Team-02", "/team/team-02"),
  ]),
  getItem("Files", "/files", <FileOutlined />),
];

const rootSubmenuKeys = ["/user", "/team"];
const MainMenu: React.FC = () => {
  const navigateTo = useNavigate();
  const currentRoute = useLocation();

  const firstOpenKeys = currentRoute.pathname.match(/^\/[\w-]+/)![0];
  const [openKeys, setOpenKeys] = useState([firstOpenKeys]);
  // 定义状态current（当前菜单）
  const [current, setCurrent] = useState(currentRoute.pathname);

  useEffect(() => {
    setCurrent(currentRoute.pathname);
  }, [currentRoute]);

  const menuClick: menuClick = (e) => {
    navigateTo(e.key);
  };
  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <Menu
      theme="dark"
      defaultSelectedKeys={[currentRoute.pathname]}
      selectedKeys={[current]} // 当前选的 key 这里是处理页面回退高亮
      mode="inline"
      items={items}
      onClick={menuClick}
      openKeys={openKeys}
      onOpenChange={onOpenChange}
    />
  );
};

export default MainMenu;
