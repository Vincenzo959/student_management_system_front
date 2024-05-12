import {
  Button,
  Card,
  Checkbox,
  Flex,
  Form,
  Input,
  Modal,
  Radio,
  Space,
  Table,
  TableProps,
} from "antd";
import { useState } from "react";

export default function PlanHistory() {
  const [responsive, setResponsive] = useState(false);
  const [data, setData] = useState<DataType[]>();
  const [datadtl, setDatadtl] = useState<DataType[]>();
  const [form] = Form.useForm();
  const [open, setOpen] = useState<boolean>(false);
  const [showTime, setShowTime] = useState("");
  type ColumnsType<T> = TableProps<T>["columns"];
  type DataType = {
    id: number;
    std_id: number;
    name: string;
    sclass: string;
    nclass: string;
    title: string;
    note: string;
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
      title: "班级",
      dataIndex: "sclass",
      key: "sclass",
    },
    {
      title: "实习实践报告名称",
      dataIndex: "pname",
      key: "pname",
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
      title: "备注",
      dataIndex: "note",
      key: "note",
      render: (_, record) => <a>查看详情</a>,
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
      width: 230,
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              setOpen(true);
              setDatadtl(data?.filter((item) => item.id === record.id));
            }}
          >
            查看报告
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
      std_id: 24346546,
      name: "彭于晏",
      sclass: "20大数据1",
      nclass: "大数据技术",
      title: "基于大数据进行数据分析1",
      score: 98,
      createTime: "2024-03-10",
      accessTime: "2024-03-11",
    },
    {
      id: 1234567,
      std_id: 24346546,
      name: "彭于晏",
      sclass: "20大数据1",
      nclass: "大数据技术",
      title: "基于大数据进行数据分析1",
      score: 98,
      createTime: "2024-03-10",
      accessTime: "2024-03-11",
    },
    {
      id: 1234567,
      std_id: 24346546,
      name: "彭于晏",
      sclass: "20大数据1",
      nclass: "大数据技术",
      title: "基于大数据进行数据分析1",
      score: 98,
      createTime: "2024-03-10",
      accessTime: "2024-03-11",
    },
    {
      id: 1234567,
      std_id: 24346546,
      name: "彭于晏",
      sclass: "20大数据1",
      nclass: "大数据技术",
      title: "基于大数据进行数据分析1",
      score: 98,
      createTime: "2024-03-10",
      accessTime: "2024-03-11",
    },
  ];
  const onCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Card>
        <p style={{ marginTop: "-10px", fontSize: "24px", fontWeight: "bold" }}>
          已提交实习报告
        </p>
        <Form>
          <Flex>
            <Form.Item
              label="实习实践报告名称"
              name="实习实践报告名称"
              rules={[{ required: false }]}
            >
              <Input disabled={false} />
            </Form.Item>
            <Form.Item
              label="课程"
              name="课程"
              rules={[{ required: false }]}
              style={{ marginLeft: "20px" }}
            >
              <Input disabled={false} />
            </Form.Item>
            <Form.Item
              label="标题"
              name="标题"
              rules={[{ required: false }]}
              style={{ marginLeft: "20px" }}
            >
              <Input disabled={false} />
            </Form.Item>
            <Form.Item
              label="是否评价"
              name="是否评价"
              rules={[{ required: false }]}
              style={{ marginLeft: "20px" }}
            >
              <Checkbox disabled={false} />
            </Form.Item>
          </Flex>
        </Form>
        <Table columns={columns} dataSource={dataSource} />
        <Modal
          open={open}
          onCancel={onCancel}
          title="实验报告"
          footer={[
            <Button
              form="myForm"
              key="submit"
              htmlType="submit"
              type="primary"
              onClick={onCancel}
            >
              确定
            </Button>,
          ]}
        ></Modal>
      </Card>
    </>
  );
}
