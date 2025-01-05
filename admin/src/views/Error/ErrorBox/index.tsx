import { ApiTwoTone } from "@ant-design/icons";
import { Button, Space } from "antd";
import { useNavigate } from "react-router";
import { notFound } from "../../../types/error";
import styled from "./index.module.scss";
const NotFound: notFound = (props) => {
  const { notFoundBox, text } = styled;
  const navigateTo = useNavigate();
  const toHomeClick = () => {
    navigateTo("/");
  };
  return (
    <div className={notFoundBox}>
      <div className={text}>
        <h1 style={{ fontSize: "36px", marginBottom: "20px" }}>
          {props.h1Text}
        </h1>
        <Space>
          <ApiTwoTone /> 啊哦～页面消失了哦～
        </Space>
        <p>不如去首页瞧一瞧</p>
        <p>
          <Button onClick={toHomeClick} type="link">
            点这里哦～
          </Button>
        </p>
      </div>
    </div>
  );
};
export default NotFound;
