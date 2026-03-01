import { getItemType, menuClick, MenuItem } from "@/types/mainMenu";
import {
  AppstoreOutlined,
  FileTextOutlined,
  HomeOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

const getItem: getItemType = function getItem(
  label,
  key,
  icon,
  children,
  type,
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
  getItem("Blog", "/blog", <FileTextOutlined />, [
    getItem("List", "/blog/list"),
    getItem("Create", "/blog/create"),
  ]),
  getItem("Tags", "/tag", <TagsOutlined />, [
    getItem("Manage Tags", "/tag/list"),
  ]),
  getItem("Categories", "/category", <AppstoreOutlined />, [
    getItem("Manage Categories", "/category/list"),
  ]),
];

const rootSubmenuKeys = ["/blog", "/tag", "/category"];
const MainMenu: React.FC = () => {
  const navigateTo = useNavigate();
  const currentRoute = useLocation();

  const firstOpenKeys = currentRoute.pathname.match(/^\/[\w-]+/)![0];
  const [openKeys, setOpenKeys] = useState([firstOpenKeys]);

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
