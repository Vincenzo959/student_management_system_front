import { Card, Flex, Tooltip } from "antd";
import { ProCard, StatisticCard } from "@ant-design/pro-components";
import RcResizeObserver from "rc-resize-observer";
import React, { useEffect, useRef, useState } from "react";
import { Alert, Button, Form, Input, Modal, Space, Table, message } from "antd";
import type { GetProp, TableProps } from "antd";
import { Util } from "@/utils";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
const { Divider } = StatisticCard;

const adata = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
const data01 = [
  { name: "Group A", value: 97, color: "green" },
  { name: "Group B", value: 3, color: "red" },
];
export default function studentDatashow() {
  const [responsive, setResponsive] = useState(false);
  const [data, setData] = useState<DataType[]>();
  const [datadtl, setDatadtl] = useState<DataType[]>();
  const [form] = Form.useForm();
  const [open, setOpen] = useState<boolean>(false);
  const [showTime, setShowTime] = useState("");
  const [tof, setTof] = useState(true);
  type ColumnsType<T> = TableProps<T>["columns"];
  type DataType = {
    id: number;
    nclass: string;
    title: string;
    score: string;
    createTime: string;
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "编号",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "课程",
      dataIndex: "nclass",
      key: "nclass",
    },
    {
      title: "标题",
      dataIndex: "title",
      key: "title",
    },

    {
      title: "分数",
      dataIndex: "score",
      key: "score",
    },
    {
      title: "提交时间",
      dataIndex: "createTime",
      key: "createTime",
    },
    {
      title: "操作",
      key: "action",
      fixed: "right",
      width: 150,
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              setOpen(true);
              setDatadtl(data?.filter((item) => item.id === record.id));
            }}
          >
            查看详情
          </a>
          <a
            onClick={() => {
              const flag = window.confirm("确定要删除吗？");
              if (flag) {
                const result = fetch("/api/login/updateInfo", {
                  method: "POST",
                  body: JSON.stringify({ isDeleted: "1", id: record.id }),
                  headers: {
                    "content-type": "application/json",
                  },
                });
                setData(data?.filter((item) => item.id !== record.id));
                window.alert("删除成功！");
              }
            }}
          >
            下载
          </a>
        </Space>
      ),
    },
  ];
  const dataSource = [
    {
      id: 1234567,
      nclass: "大数据技术",
      title: "基于大数据进行数据分析1",
      score: "98",
      createTime: "2024-03-10",
    },
    {
      id: 1234567,
      nclass: "大数据技术",
      title: "基于大数据进行数据分析1",
      score: "98",
      createTime: "2024-03-10",
    },
    {
      id: 1234567,
      nclass: "大数据技术",
      title: "基于大数据进行数据分析1",
      score: "98",
      createTime: "2024-03-10",
    },
    {
      id: 1234567,
      nclass: "大数据技术",
      title: "基于大数据进行数据分析1",
      score: "98",
      createTime: "2024-03-10",
    },
  ];
  const onCancel = () => {
    setOpen(false);
  };

  const handSubmit = async (value: any) => {
    // axios方法
    // const result = await updateByWeatherInfo(value);

    //fetch方法
    value["id"] = datadtl?.at(0)!.id;
    const result = fetch("/api/login/updateInfo", {
      method: "POST",
      body: JSON.stringify(value),
      headers: {
        "content-type": "application/json",
      },
    }).then((res) => res.json());
    setOpen(false);
    window.alert("修改成功！");
  };

  // const fetchData = () => {
  //     if (user.userType === "super")
  //         fetch("/api/login/queryUserList", { method: "GET" })
  //             .then((res) => res.json())
  //             .then(({ result }) => {
  //                 setData(result);
  //             });
  // };
  // useEffect(() => {
  //     fetchData();
  // }, []);

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
              title: "全部实习报告",
              tip: "全部实习报告",
              value: 10,
            }}
          />
          <Divider />
          <StatisticCard
            statistic={{
              title: "未提交",
              value: 5,
              status: "default",
            }}
          />
          <StatisticCard
            statistic={{
              title: "已提交",
              value: 3,
              status: "processing",
            }}
          />
          <StatisticCard
            statistic={{
              title: "已打分",
              value: "2",
              status: "success",
            }}
          />
          <StatisticCard
            statistic={{
              title: "被打回",
              value: 0,
              status: "error",
            }}
          />
        </StatisticCard.Group>
        <Flex>
          <Flex style={{ marginTop: "0px", marginLeft: "-30px" }} vertical>
            <Card style={{ marginLeft: "6px" }}>
              <p style={{ fontSize: "16px", marginLeft: "30px" }}>
                近七次报告分数
              </p>
              <LineChart
                width={730}
                height={250}
                data={adata}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
              </LineChart>
            </Card>
          </Flex>
          <Card style={{ marginLeft: "-4px", width: "540px", height: "356px" }}>
            <p style={{ fontSize: "16px", marginLeft: "30px" }}>合格率</p>
            <PieChart width={500} height={340} style={{ marginTop: "-70px" }}>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={data01}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              />
              <Tooltip />
            </PieChart>
          </Card>
        </Flex>
        <Alert
          message="未提交的实习报告："
          description="当前暂时没有未提交的报告哦！"
          type="success"
          style={{ display: tof ? "" : "none" }}
        />
        <Alert
          message="未提交的实习报告："
          description="当前暂时没有未提交的报告哦！"
          type="error"
          style={{ display: tof ? "none" : "" }}
        />
      </ProCard>
    </>
  );
}
