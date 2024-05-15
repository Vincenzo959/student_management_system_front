"use client";
import type { RadioChangeEvent } from "antd";
import {
  Button,
  Form,
  Input,
  Layout,
  Menu,
  MenuProps,
  Modal,
  Radio,
} from "antd";
import { QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";

const queryClient = new QueryClient();
const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

export default function register() {
  const [form] = Form.useForm();
  const [type, setType] = useState<number>(0);

  const change = (e: RadioChangeEvent) => {
    setType(e.target.value);
  };

  const handSubmit = async (value: any) => {
    console.log(value);
    value["userType"] = "admin";
    const result = fetch("/api/login/sysUserLogin/insert/API_002", {
      method: "POST",
      body: JSON.stringify(value),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(({ result }) => {
        if (result === "账号已存在！") window.alert("账号已存在！");
        else {
          window.alert("注册成功！");
          location.href = "/login";
        }
      });
  };
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <title>用户注册</title>
        <h2
          style={{ color: "white", position: "absolute", marginLeft: "300px" }}
        >
          {/*欢迎用户：{user.name}*/}
        </h2>
        <Header style={{ color: "white", fontSize: "20px" }}>
          学生企业实践管理系统
        </Header>
      </Layout>
      <h1 style={{ display: "flex", justifyContent: "center" }}>用户注册</h1>
      <Form
        form={form}
        name="register"
        onFinish={handSubmit}
        style={{ maxWidth: 1400 }}
        scrollToFirstError
      >
        <Form.Item
          name="type"
          label="注册账号类型"
          rules={[
            {
              required: true,
              message: "请选择注册账号类型（管理员、学生）",
            },
          ]}
        >
          <Radio.Group value={type} onChange={change}>
            <Radio.Button value={0}>学生</Radio.Button>
            <Radio.Button value={1}>管理员</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="userName" label="名字">
          <Input />
        </Form.Item>
        <Form.Item
          name="telephoneNumber"
          label="账号（电话号码）"
          rules={[
            {
              required: true,
              message: "请输入你的账号",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="密码"
          rules={[
            {
              required: true,
              message: "请输入你的密码",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="确认密码"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "请再次输入你的密码",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("两次密码输入的不一致"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item name="sex" label="性别">
          <Input />
        </Form.Item>
        <Form.Item name="age" label="年龄">
          <Input />
        </Form.Item>
        <Form.Item name="stdId" label="学号/工号">
          <Input />
        </Form.Item>
        <Form.Item name="major" label="专业">
          <Input />
        </Form.Item>
        <Form.Item name="grade" label="年级">
          <Input />
        </Form.Item>
        <Form.Item name="aclass" label="班级">
          <Input />
        </Form.Item>
        <Form.Item name="email" label="邮箱">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            注册
          </Button>
        </Form.Item>
      </Form>
    </QueryClientProvider>
  );
}
