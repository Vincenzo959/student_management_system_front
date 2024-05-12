import { Alert, Card, Flex, Form, Input } from "antd";
import { ProCard, StatisticCard } from "@ant-design/pro-components";
import RcResizeObserver from "rc-resize-observer";
import React, { useEffect, useRef, useState } from "react";
import { Util } from "@/utils";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const { Divider } = StatisticCard;

interface DataItem {
  name: string;
  提交人数: number;
  合格人数: number;
  不合格人数: number;
}

const data: DataItem[] = [
  {
    name: "20大数据1",
    提交人数: 40,
    合格人数: 24,
    不合格人数: 16,
  },
  {
    name: "20大数据2",
    提交人数: 30,
    合格人数: 13,
    不合格人数: 17,
  },
  {
    name: "20大数据3",
    提交人数: 34,
    合格人数: 30,
    不合格人数: 4,
  },
  {
    name: "20大数据4",
    提交人数: 27,
    合格人数: 26,
    不合格人数: 1,
  },
];
const data1: DataItem[] = [
  {
    name: "大数据技术测试",
    提交人数: 40,
    合格人数: 24,
    不合格人数: 16,
  },
  {
    name: "计算机组成原理",
    提交人数: 30,
    合格人数: 13,
    不合格人数: 17,
  },
];

export default function adminDataShow() {
  const [showTime, setShowTime] = useState("");
  const [tof, setTof] = useState(true);

  useEffect(() => {
    setInterval(() => {
      const sysTime = Util.formateDate(new Date().getTime());
      setShowTime(sysTime);
    }, 1000);
  }, []);
  return (
    <>
      <ProCard title="数据概览" extra={showTime} headerBordered bordered>
        <StatisticCard.Group>
          <StatisticCard
            statistic={{
              title: "全部实习报告（次）",
              tip: "目前为止发布了多少次实习报告",
              value: 10,
            }}
          />
          <StatisticCard
            statistic={{
              title: "全部实习报告（份）",
              tip: "应收到的全部实习报告",
              value: 10,
            }}
          />
          <Divider />
          <StatisticCard
            statistic={{
              title: "未提交学生数",
              value: 5,
              status: "default",
            }}
          />
          <StatisticCard
            statistic={{
              title: "已提交学生数",
              value: 3,
              status: "processing",
            }}
          />
          <StatisticCard
            statistic={{
              title: "未打分报告数",
              value: "2",
              status: "success",
            }}
          />
          <StatisticCard
            statistic={{
              title: "已打分报告数",
              value: 0,
              status: "error",
            }}
          />
        </StatisticCard.Group>
        <Flex>
          <Card style={{ marginLeft: "-24px", width: "800px" }}>
            <p style={{ fontSize: "16px", marginLeft: "30px" }}>学生提交情况</p>
            <Form
              style={{
                position: "absolute",
                marginLeft: "300px",
                marginTop: "-50px",
              }}
            >
              <Form.Item
                label="报告名称"
                name="报告名称"
                rules={[{ required: false }]}
              >
                <Input disabled={false} />
              </Form.Item>
            </Form>
            <ResponsiveContainer
              width="100%"
              height={200}
              style={{ marginTop: "10px", marginLeft: "-40px" }}
            >
              <BarChart
                width={500}
                height={300}
                data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="提交人数"
                  fill="#8884d8"
                  shape={<Rectangle fill="pink" stroke="blue" />}
                />
                <Bar
                  dataKey="合格人数"
                  fill="#82ca9d"
                  shape={<Rectangle fill="gold" stroke="purple" />}
                />
                <Bar
                  dataKey="不合格人数"
                  fill="#82ca9d"
                  shape={<Rectangle fill="blue" stroke="red" />}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
          <Card style={{ marginLeft: "-24px", width: "800px" }}>
            <p style={{ fontSize: "16px", marginLeft: "30px" }}>报告提交情况</p>
            <Form
              style={{
                position: "absolute",
                marginLeft: "300px",
                marginTop: "-50px",
              }}
            >
              <Form.Item label="班级" name="班级" rules={[{ required: false }]}>
                <Input disabled={false} />
              </Form.Item>
            </Form>
            <ResponsiveContainer
              width="100%"
              height={200}
              style={{ marginTop: "10px", marginLeft: "-40px" }}
            >
              <BarChart
                width={500}
                height={300}
                data={data1}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="提交人数"
                  fill="#8884d8"
                  shape={<Rectangle fill="pink" stroke="blue" />}
                />
                <Bar
                  dataKey="合格人数"
                  fill="#82ca9d"
                  shape={<Rectangle fill="gold" stroke="purple" />}
                />
                <Bar
                  dataKey="不合格人数"
                  fill="#82ca9d"
                  shape={<Rectangle fill="blue" stroke="red" />}
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Flex>
        <Alert
          message="未评分的实习报告："
          description="当前暂时没有未评分的报告哦！"
          type="success"
          style={{ display: tof ? "" : "none" }}
        />
        <Alert
          message="未评分的实习报告："
          description="当前暂时没有未评分的报告哦！"
          type="error"
          style={{ display: tof ? "none" : "" }}
        />
      </ProCard>
    </>
  );
}
