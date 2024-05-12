"use client";
import {
  TeamOutlined,
  FileTextOutlined,
  DesktopOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Layout, Menu, MenuProps, Modal } from "antd";
import { getItem, handerField } from "@/utils";
import AdminDatashow from "../../component/AdminDatashow";
import PlanPublic from "../../component/PlanPublic";
import PlanHistoryAdmin from "../../component/PlanHistoryAdmin";
import PlanAssess from "../../component/PlanAssess";
import PersonnelManagement from "../../component/PersonnelManagement";
import PersonalCenter from "../../component/PersonalCenter";
import PlanList from "@/component/PlanList";

import { QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";

const queryClient = new QueryClient();
const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];
const items: MenuItem[] = [
  getItem("数据总览", "1", <DesktopOutlined />),
  getItem("实习实践计划发布", "2", <FileTextOutlined />),
  getItem("实习实践计划管理", "3", <FileTextOutlined />),
  getItem("实习报告评定", "4", <FileTextOutlined />),
  getItem("已评实习报告", "5", <FileTextOutlined />),
  getItem("学生管理", "6", <TeamOutlined />),
  getItem("个人中心", "7", <TeamOutlined />),
];

export default function admin() {
  const local = localStorage.getItem("user");
  const [form] = Form.useForm();
  const [open, setOpen] = useState<boolean>(false);
  // if (!local) {
  //     location.href = "/login";
  //     return;
  // }

  const user = JSON.parse(local);

  // if (user.userType === user) {
  //     location.href = "/login";
  //     return;
  // }

  const [key, setKey] = useState<"1" | "2" | "3" | "4" | "5" | "6" | "7">("2");
  const menu_item = ({ key }: { key: string }) => {
    if (
      key != "1" &&
      key != "2" &&
      key != "3" &&
      key != "4" &&
      key != "5" &&
      key != "6" &&
      key != "7"
    ) {
      return;
    }
    setKey(key);
  };
  const enum_content = {
    "1": <AdminDatashow />,
    "2": <PlanPublic prop={user} />,
    "3": <PlanList />,
    "4": <PlanAssess />,
    "5": <PlanHistoryAdmin />,
    "6": <PersonnelManagement />,
    "7": <PersonalCenter />,
  };

  const onCancel = () => {
    setOpen(false);
  };

  const handSubmit = async (value: any) => {
    value["userType"] = "admin";
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
    <QueryClientProvider client={queryClient}>
      <Layout>
        <title>学生企业实践管理系统</title>
        <h2
          style={{ color: "white", position: "absolute", marginLeft: "300px" }}
        >
          {/*欢迎用户：{user.name}*/}
        </h2>
        <Header style={{ color: "white", fontSize: "20px" }}>
          学生企业实践管理系统
          <Button
            className="ml-auto justify-end"
            type="primary"
            style={{
              marginLeft: "1100px",
              marginTop: "15px",
              position: "absolute",
            }}
            onClick={() => {
              localStorage.removeItem("user");
              location.href = "/login";
            }}
          >
            退出系统
          </Button>
        </Header>
        <Layout>
          <Sider theme="light">
            <Menu
              defaultSelectedKeys={["1"]}
              mode="inline"
              items={items}
              onClick={menu_item}
            />
          </Sider>
          <Content>{handerField(enum_content, key)} </Content>
        </Layout>
      </Layout>
      <Modal
        open={open}
        onCancel={onCancel}
        title="管理员注册"
        footer={[
          <Button form="myForm" key="submit" htmlType="submit" type="primary">
            确定
          </Button>,
        ]}
      >
        <Form id="myForm" form={form} onFinish={handSubmit}>
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
    </QueryClientProvider>
  );
}
