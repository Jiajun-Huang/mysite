import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../../provider/auth";
import styles from "./index.module.scss";

const App: React.FC = () => {
  const navigateTo = useNavigate();
  const { loginFormBox, loginFormButton, formTitle } = styles;
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const onFinish = async (values: any) => {
    setLoading(true);

    try {
      const success = await login(values.username, values.password);
      if (success) {
        message.success("Login successful! Redirecting...");
        setTimeout(() => {
          navigateTo("/home");
        }, 500);
      } else {
        message.error("Invalid username or password");
        setLoading(false);
      }
    } catch (error) {
      message.error("An error occurred during login");
      setLoading(false);
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
        <h1 className={`${formTitle} global-center`}>Admin Portal</h1>
        <p style={{ textAlign: "center", color: "#666", marginBottom: "24px" }}>
          Sign in to your account
        </p>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please enter your username" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
            size="large"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
            size="large"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className={loginFormButton}
            loading={loading}
            size="large"
          >
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default App;
