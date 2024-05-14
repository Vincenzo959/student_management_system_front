import {
  Form,
  Flex,
  Table,
  Modal,
  Button,
  Input,
  Space,
  TableProps,
  Card,
  message,
} from "antd";
import FormItem from "antd/es/form/FormItem";
import { useEffect, useState } from "react";

interface Param {
  condition: Condition;
  page: QueryPage;
}
interface Condition {
  ifScore: number | null;
}
interface QueryPage {
  current: number;
  total: number;
  size: number;
}

export default function planAssess() {
  // 展示数据
  const [data, setData] = useState<DataType[]>();
  // 总数
  const [total, setTotal] = useState<number>();
  // 当前页码
  const [currentPage, setCurrentPage] = useState<QueryPage>({
    current: 1,
    total: 0,
    size: 5,
  });
  // 页面大小
  const [size, setSize] = useState<number>(5);
  //参数
  const [value, setValue] = useState<Condition>({
    ifScore: 0,
  });
  const [id, setId] = useState();
  const [datadtl, setDatadtl] = useState<number>();
  const [open, setOpen] = useState<boolean>(false);
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
      dataIndex: "stuId",
      key: "stuId",
    },
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "班级",
      dataIndex: "uclass",
      key: "uclass",
    },
    {
      title: "课程",
      dataIndex: "pclass",
      key: "pclass",
    },
    {
      title: "实习实践报告名称",
      dataIndex: "pclass",
      key: "pclass",
    },
    {
      title: "报告提交名字",
      dataIndex: "planName",
      key: "planName",
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
      width: 200,
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              location.href =
                "http://127.0.0.1:9000/student-plan/" + record.planUrl;
            }}
          >
            查看报告
          </a>
          <a
            onClick={() => {
              setDatadtl(record.id);
              setOpen(true);
            }}
          >
            打分
          </a>
        </Space>
      ),
    },
  ];

  const onCancel = () => {
    setOpen(false);
  };

  function fetchData(Param) {
    fetch("/api/teacher/plan/studentPushPlanInfo/select/API_006", {
      method: "POST",
      body: JSON.stringify(Param),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setData(
          res.data.list.map((item) => ({
            ...item,
            createTime: item.createTime.replace("T", " "),
          }))
        );
        setTotal(res.data.total);
      });
  }

  const handSubmit = async (value: any) => {
    value["planId"] = datadtl;
    fetch("/api/teacher/plan/studentPushPlanInfo/update/API_007", {
      method: "POST",
      body: JSON.stringify(value),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.code === 0) {
          message.success("评分成功");
        } else {
          message.error("评分失败");
        }
      });
  };

  useEffect(() => {
    currentPage["size"] = size;
    const Param: Param = {
      condition: value,
      page: currentPage,
    };
    fetchData(Param);
  }, [currentPage]);
  return (
    <>
      <Card>
        <p style={{ marginTop: "-10px", fontSize: "24px", fontWeight: "bold" }}>
          实习报告评定
        </p>
        <Table columns={columns} dataSource={data} />
        <Modal
          open={open}
          onCancel={onCancel}
          title="打分"
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
        >
          <Form id="myForm" onFinish={handSubmit}>
            <FormItem label="分数" name="score">
              <Input placeholder="请输入你的分数"></Input>
            </FormItem>
          </Form>
        </Modal>
      </Card>
    </>
  );
}
