"use client";
import {
  AlipayCircleOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from "@ant-design/icons";
import {
  LoginFormPage,
  ProConfigProvider,
  ProFormCheckbox,
  ProFormText,
  setAlpha,
} from "@ant-design/pro-components";
import { Button, Form, Space, Tabs, Modal, theme, Input, message } from "antd";
import type { CSSProperties } from "react";
import { useState } from "react";

type DataType = {
  id: number;
  account: string;
  pswd: string;
};
export default () => {
  const { token } = theme.useToken();
  const [loginType, setLoginType] = useState("account");
  const [form] = Form.useForm();
  const [data, setData] = useState<DataType>();
  const [open, setOpen] = useState<boolean>();

  const iconStyles: CSSProperties = {
    marginInlineStart: "16px",
    color: setAlpha(token.colorTextBase, 0.2),
    fontSize: "24px",
    verticalAlign: "middle",
    cursor: "pointer",
  };

  const handSubmit = async (value: any) => {
    const result = fetch("/api/login/sysUserLogin/select/API_001", {
      method: "Post",
      body: JSON.stringify(value),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.code === 0) {
          if (result.data.password === value["password"]) {
            if (result.data.type == 0) {
              message.success("登入成功");
              localStorage.setItem("user", JSON.stringify(result.data));
              location.href = "/student";
            } else {
              message.success("登入成功");
              localStorage.setItem("user", JSON.stringify(result.data));
              location.href = "/admin";
            }
          }
        } else {
          window.alert("账号或密码错误，请重新登入！");
        }
      });
  };

  const onCancel = () => {
    setOpen(false);
  };

  const submit = async (value: any) => {
    value["userType"] = "user";
    const result = fetch("/api/login/registration", {
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
          setOpen(false);
          window.alert("注册成功！");
        }
      });
  };
  return (
    <div
      style={{
        backgroundColor: "white",
        height: "97vh",
      }}
    >
      <ProConfigProvider hashed={false}>
        <title>登入</title>

        <LoginFormPage
          form={form}
          onFinish={handSubmit}
          backgroundImageUrl="login_bg.png"
          title="学生企业实践管理系统"
          actions={
            <Space>
              其他登录方式
              <AlipayCircleOutlined style={iconStyles} />
              <TaobaoCircleOutlined style={iconStyles} />
              <WeiboCircleOutlined style={iconStyles} />
            </Space>
          }
        >
          <Tabs
            centered
            activeKey={loginType}
            onChange={(activeKey) => setLoginType("account")}
          >
            <Tabs.TabPane key={"account"} tab={"用户登录"} />
          </Tabs>

          {loginType === "account" && (
            <>
              <ProFormText
                name="telephoneNumber"
                fieldProps={{
                  size: "large",
                  prefix: <UserOutlined className={"prefixIcon"} />,
                }}
                placeholder={"用户名: admin or user"}
                rules={[
                  {
                    required: true,
                    message: "请输入用户名!",
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                placeholder={"密码: ant.design"}
                rules={[
                  {
                    required: true,
                    message: "请输入密码！",
                  },
                ]}
              />
            </>
          )}
          <div
            style={{
              marginBlockEnd: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              自动登录
            </ProFormCheckbox>
            <a
              style={{
                float: "right",
              }}
            >
              忘记密码
            </a>
          </div>
          <Button
            size="large"
            type="primary"
            style={{
              width: 326,
              position: "relative",
            }}
            onClick={() => {
              location.href = "/register";
            }}
          >
            注册
          </Button>
          <hr />
        </LoginFormPage>
      </ProConfigProvider>
      <Modal
        open={open}
        onCancel={onCancel}
        title="用户注册"
        footer={[
          <Button form="myForm" key="submit" htmlType="submit" type="primary">
            确定
          </Button>,
        ]}
      >
        <Form id="myForm" form={form} onFinish={submit}>
          <Form.Item label="账号" name="account">
            <Input placeholder="2062160029" />
          </Form.Item>
          <Form.Item label="密码" name="pswd">
            <Input placeholder="123456" />
          </Form.Item>
          <Form.Item label="姓名" name="name">
            <Input placeholder="卓佳伟" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
