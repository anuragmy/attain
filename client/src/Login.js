import React from "react";
import { Form, Input, Button, Typography } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { signIn } from "./store/actions";
const { Title } = Typography;

const Login = () => {
  const dispatch = useDispatch();
  const [isSignIn, setSignIn] = useState(true);

  const onFinish = async (values) => {
    const data = {
      email: values.email,
      password: values.password,
    };

    dispatch(signIn({ data, signIn: isSignIn }));
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div style={{ marginTop: "10%" }}>
      <Title level={2}>{isSignIn ? "Login" : "Sign Up"}</Title>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input type={"email"} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
        <h4>
          {isSignIn ? "Not have an account ?" : "Already have an account ?"}
        </h4>
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => setSignIn(!isSignIn)}
        >
          {isSignIn ? "Sign up" : "Sign in"}
        </span>
      </Form>
    </div>
  );
};
export default Login;
