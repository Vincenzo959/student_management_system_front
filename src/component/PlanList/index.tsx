import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Flex,
  Form,
  Input,
  Modal,
  Space,
  Table,
  message,
} from "antd";
import type { GetProp, TableProps } from "antd";

export default function PlanList() {
  const [data, setData] = useState<DataType[]>();
  const [datadtl, setDatadtl] = useState<DataType[]>();
  const [form] = Form.useForm();
  const [open, setOpen] = useState<boolean>(false);
  type ColumnsType<T> = TableProps<T>["columns"];
  type DataType = {
    id: string;
    std_id: number;
    account: string;
    pswd: string;
    name: string;
    major: string;
    grade: string;
    sclass: string;
    condition: string;
    createTime: string;
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "年级",
      dataIndex: "grade",
      key: "grade",
    },
    {
      title: "专业",
      dataIndex: "major",
      key: "major",
    },
    {
      title: "班级",
      dataIndex: "uclass",
      key: "uclass",
    },
    {
      title: "人数",
      dataIndex: "student_num",
      key: "student_num",
    },
    {
      title: "地点",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "指导教师",
      dataIndex: "guider",
      key: "guider",
    },
    {
      title: "实习内容",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "开始时间",
      dataIndex: "begin",
      key: "begin",
    },
    {
      title: "结束时间",
      dataIndex: "end",
      key: "end",
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
            编辑
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
            删除
          </a>
        </Space>
      ),
    },
  ];
  const dataSource = [
    {
      id: 1234567,
      std_id: "1",
      name: "大数据课程设计",
      grade: "2020级",
      major: "大数据",
      uclass: "1班",
      student_num: "72",
      address: "计算机实验室3",
      guider: "卓佳伟",
      content: "学会如何设计程序",
      begin: "2024-03-10",
      end: "2024-05-10",
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

  return (
    <Card>
      <p style={{ marginTop: "-10px", fontSize: "24px", fontWeight: "bold" }}>
        实习实践计划管理
      </p>
      <Form>
        <Flex>
          <Form.Item
            label="实习实践名称"
            name="名称"
            rules={[{ required: false }]}
          >
            <Input disabled={false} />
          </Form.Item>
          <Form.Item
            label="课程名称"
            name="课程名称"
            rules={[{ required: false }]}
            style={{ marginLeft: "20px" }}
          >
            <Input disabled={false} />
          </Form.Item>
        </Flex>
      </Form>
      <Table columns={columns} dataSource={dataSource} />
      <Modal
        open={open}
        onCancel={onCancel}
        title="用户数据编辑"
        footer={[
          <Button form="myForm" key="submit" htmlType="submit" type="primary">
            确定
          </Button>,
        ]}
      >
        <Form id="myForm" form={form} onFinish={handSubmit}>
          <Form.Item label="账号" name="account">
            {/*<Input placeholder={datadtl?.at(0)?.account} disabled={true} />*/}
          </Form.Item>
          <Form.Item label="密码" name="pswd">
            {/*<Input placeholder={datadtl?.at(0)?.pswd} disabled={false} />*/}
          </Form.Item>
          <Form.Item label="名字" name="name">
            {/*<Input placeholder={datadtl?.at(0)?.name} disabled={false} />*/}
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
}
