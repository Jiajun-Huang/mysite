import { getItemType, menuClick, MenuItem } from "@/types/mainMenu";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

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
  getItem("Blog", "/blog", <UserOutlined />, [
    getItem("Create", "/blog/create"),
    getItem("Edit", "/blog/:id"),
    getItem("List", "/blog"),
  ]),
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
