import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb } from "antd";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import routes from "../../../router";
import { setBreadcrumbItems } from "../../../utils/pages/breadcrumbItems";

const MainBreadcrumbs = () => {
  const location = useLocation();
  // 初识默认值 如果是空数组 TS 会报错
  let breadcrumbItems = [
    {
      title: (
        <>
          <HomeOutlined />
          <span style={{ marginLeft: "10px" }}>Home</span>
        </>
      ),
      href: "/",
    },
  ];
  const [secondBreadcrumb, setSecondBreadcrumb] = useState(breadcrumbItems);

  useEffect(() => {
    const path = location;
    const { children } =
      routes.find((item) => item.name === "menuRoutes") ?? {};

    const arr = setBreadcrumbItems(children!, path);

    setSecondBreadcrumb(arr!);
  }, [location]);

  return <Breadcrumb items={secondBreadcrumb}></Breadcrumb>;
};

export default MainBreadcrumbs;
