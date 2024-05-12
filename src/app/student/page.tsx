"use client";
import {
  TeamOutlined,
  FileTextOutlined,
  DesktopOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Layout, Menu, MenuProps, Modal } from "antd";
import { getItem, handerField } from "@/utils";
import StudentDatashow from "../../component/StudentDatashow";
import PlanSubmit from "../../component/PlanSubmit";
import PersonalCenter from "../../component/PersonalCenter";
import PlanHistoryStudent from "../../component/PlanHistoryStudent";
import TeacherPublishPlan from "../../component/TeacherPublishPlan";

import { QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";

const queryClient = new QueryClient();
const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];
const items: MenuItem[] = [
  getItem("数据总览", "1", <DesktopOutlined />),
  getItem("教师已发布的实习报告", "2", <DesktopOutlined />),
  getItem("实习报告提交", "3", <FileTextOutlined />),
  getItem("已提交实习报告", "4", <FileTextOutlined />),
  getItem("个人中心", "5", <TeamOutlined />),
];

export default function student() {
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

  const [key, setKey] = useState<"1" | "2" | "3" | "4" | "5">("3");
  const menu_item = ({ key }: { key: string }) => {
    if (key != "1" && key != "2" && key != "3" && key != "4" && key != "5") {
      return;
    }
    setKey(key);
  };
  const enum_content = {
    "1": <StudentDatashow />,
    "2": <TeacherPublishPlan />,
    "3": <PlanSubmit prop={user} />,
    "4": <PlanHistoryStudent />,
    "5": <PersonalCenter />,
  };

  const onCancel = () => {
    setOpen(false);
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
    </QueryClientProvider>
  );
}
