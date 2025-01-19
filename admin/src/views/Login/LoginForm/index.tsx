import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../../provider/auth";
import styles from "./index.module.scss";

const App: React.FC = () => {
  const navigateTo = useNavigate();
  const { loginFormBox, loginFormButton, formTitle } = styles;
  const [loadings, setLoadings] = useState<boolean[]>([]);
  const { login } = useAuth(); // Use the login hook from the provider

  const onFinish = async (values: any) => {
    console.log("Received values of form: ", values);
    setLoadings([true]);

    const success = await login(values.username, values.password);
    if (success) {
      setTimeout(() => {
        navigateTo("/");
      }, 3000);
    } else {
      setLoadings([false]);
      console.error("Login failed");
    }
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
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="账号"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "请填写密码！" }]}
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
        </Form.Item>
      </Form>
    </div>
  );
};

export default App;
