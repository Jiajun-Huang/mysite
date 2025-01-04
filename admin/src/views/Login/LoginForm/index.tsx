import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import styles from "./index.module.scss";
import { localStorageSetItem } from "@/utils/localStorage";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";

const formData = {
  username: "admin",
  password: "123456",
};

const App: React.FC = () => {
  const navigateTo = useNavigate();
  const { loginFormBox, loginFormButton, formTitle } = styles;
  const [loadings, setLoadings] = useState<boolean[]>([]);

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
    localStorageSetItem("userInfo", values);
    const arg = Object.entries(values).reduce(
      (pre, cur, index, array) => (
        (pre += `${cur[0]}=${cur[1]}${index === array.length - 1 ? "" : "&"}`),
        pre
      ),
      ""
    );
    const token = window.btoa(arg);
    // let encodedData = window.btoa("Hello, world"); // 编码
    // let decodedData = window.atob(encodedData);  // 解码
    console.log(token);

    Cookie.set("token", token); // 模拟 token
    Cookie.set("userInfo", arg);

    setLoadings([true]);

    setTimeout(() => {
      navigateTo("/");
    }, 3000);
  };

  return (
    <div className={`${loginFormBox} global-center`}>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <h1 className={`${formTitle} global-center`}>卢照天</h1>
        <h1 className={`${formTitle} global-center`}>
          个人练习 React 后台管理系统
        </h1>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "请填写账号！" }]}
          initialValue={formData.username}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="账号"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "请填写密码！" }]}
          initialValue={formData.password}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="密码"
          />
        </Form.Item>
        <Form.Item>
          <div
            className="global-center"
            style={{ justifyContent: "space-between" }}
          >
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>记住账号密码</Checkbox>
            </Form.Item>

            <a className="login-form-forgot" href="">
              忘记密码？
            </a>
          </div>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={loginFormButton}
            loading={loadings[0]}
          >
            登录
          </Button>

          {/* <span style={{ float: 'right' }}>
          Or <a href="">register now!</a>
          </span> */}
        </Form.Item>
      </Form>
    </div>
  );
};

export default App;
