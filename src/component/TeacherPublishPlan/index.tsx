import React from "react";
import { Badge, Card, Descriptions, Flex, Form, Input, Carousel } from "antd";
import type { DescriptionsProps } from "antd";

const items: DescriptionsProps["items"] = [
  {
    key: "1",
    label: "实习实践名称",
    children: "计算机网络课程设计",
  },
  {
    key: "2",
    label: "指导老师",
    children: "卓佳伟",
  },
  {
    key: "3",
    label: "班级",
    children: "20大数据1、2",
  },
  {
    key: "4",
    label: "课程名称",
    children: "毕业设计",
  },
  {
    key: "5",
    label: "实习地点",
    children: "计算机实验楼4号",
  },
  {
    key: "6",
    label: "人数",
    children: "72",
  },
  {
    key: "7",
    label: "目前课程状态",
    children: <Badge status="processing" text="在学习期内" />,
    span: 3,
  },

  {
    key: "8",
    label: "实习实践开始时间",
    children: "2024-03-14 18:00:00",
    span: 2,
  },
  {
    key: "9",
    label: "实习实践结束时间",
    children: "2024-04-14 18:00:00",
    span: 2,
  },
  {
    key: "10",
    label: "实习所需技术",
    children: "Java、SpringBoot、MyBatis-plus",
  },
  {
    key: "11",
    label: "实习主要内容",
    children: (
      <>
        学习如何使用SpringBoot、React
        <br />
        学习如何进行前后端交互
        <br />
        学习如何搭建项目环境
      </>
    ),
  },
  {
    key: "12",
    label: "备注",
    children: <>无</>,
  },
];
const onChange = (currentSlide: number) => {
  console.log(currentSlide);
};
const App: React.FC = () => (
  <>
    <Card>
      <p style={{ marginTop: "-10px", fontSize: "24px", fontWeight: "bold" }}>
        发布的实习报告
      </p>
      <Form>
        <Flex>
          <Form.Item
            label="实习实践名称"
            name="实习实践名称"
            rules={[{ required: false }]}
            style={{ marginTop: "-4px" }}
          >
            <Input disabled={false} />
          </Form.Item>
          <Form.Item
            label="课程名称"
            name="课程名称"
            rules={[{ required: false }]}
            style={{ marginTop: "-4px", marginLeft: "20px" }}
          >
            <Input disabled={false} />
          </Form.Item>
          <Form.Item
            label="教师名称"
            name="教师名称"
            rules={[{ required: false }]}
            style={{ marginTop: "-4px", marginLeft: "20px" }}
          >
            <Input disabled={false} />
          </Form.Item>
        </Flex>
      </Form>
      <Card style={{ background: "rgba(200, 200, 200, 0.2)" }}>
        <Carousel afterChange={onChange}>
          <div>
            <Descriptions title="查询结果1" bordered items={items} />
          </div>
          <div>
            <Descriptions title="查询结果2" bordered items={items} />
          </div>
          <div>
            <Descriptions title="查询结果3" bordered items={items} />
          </div>
          <div>
            <Descriptions title="查询结果4" bordered items={items} />
          </div>
        </Carousel>
      </Card>
    </Card>
  </>
);

export default App;
