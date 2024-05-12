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

export default function personnelManagement() {
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
      title: "学号",
      dataIndex: "std_id",
      key: "std_id",
    },
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "专业",
      dataIndex: "major",
      key: "major",
    },
    {
      title: "年级",
      dataIndex: "grade",
      key: "grade",
    },
    {
      title: "班级",
      dataIndex: "sclass",
      key: "sclass",
    },
    {
      title: "实习情况",
      dataIndex: "condition",
      key: "condition",
      render: (_, record) => <a>查看详情</a>,
    },
    {
      title: "创建时间",
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
      name: "胡彦斌",
      major: "大数据",
      grade: "2020级",
      sclass: "一班",
      condition: "",
      createTime: "2024-03-10",
    },
    {
      id: 7654321,
      std_id: "2",
      name: "吴彦祖",
      major: "计算机科学",
      grade: "2020级",
      sclass: "二班",
      condition: "",
      createTime: "2024-03-7",
    },
    {
      id: 981234,
      std_id: "3",
      name: "彭于晏",
      major: "电子信息科学",
      grade: "2019级",
      sclass: "四班",
      condition: "",
      createTime: "2024-03-01",
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
        学生管理
      </p>
      <Form>
        <Flex>
          <Form.Item label="年级" name="年级" rules={[{ required: false }]}>
            <Input disabled={false} />
          </Form.Item>
          <Form.Item
            label="专业"
            name="专业"
            rules={[{ required: false }]}
            style={{ marginLeft: "20px" }}
          >
            <Input disabled={false} />
          </Form.Item>
          <Form.Item
            label="班级"
            name="班级"
            rules={[{ required: false }]}
            style={{ marginLeft: "20px" }}
          >
            <Input disabled={false} />
          </Form.Item>
          <Form.Item
            label="学号"
            name="学号"
            rules={[{ required: false }]}
            style={{ marginLeft: "20px" }}
          >
            <Input disabled={false} />
          </Form.Item>
          <Form.Item
            label="姓名"
            name="姓名"
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
