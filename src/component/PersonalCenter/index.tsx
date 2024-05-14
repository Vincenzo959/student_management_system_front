import {
  Button,
  Card,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Mentions,
  Select,
  TreeSelect,
  message,
} from "antd";
import { useEffect, useState } from "react";

export default function abc({ prop }) {
  const [data, setData] = useState();

  function getData() {
    console.log(prop);
    console.log(prop.id);
    fetch("/api/userCrud/sysUserInfo/select/API_004/" + prop.id, {
      method: "Post",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      });
  }
  function updateData(value: any) {
    value["id"] = prop.id;
    value["type"] = prop.type;
    // 学生更新数据-0， 老师更新数据-1
    if (prop.type === 0) {
      fetch("/api/userCrud/sysStudentInfo/update/API_002", {
        method: "POST",
        body: JSON.stringify(value),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.code === 0) {
            message.success("更新成功");
            window.location.reload;
          }
        });
    } else {
      fetch("/api/userCrud/sysTeacherInfo/update/API_003", {
        method: "POST",
        body: JSON.stringify(value),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.code === 0) {
            message.success("更新成功");
            window.location.reload;
          }
        });
    }
  }

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {data && (
        <Card>
          <p
            style={{ marginTop: "-10px", fontSize: "24px", fontWeight: "bold" }}
          >
            用户信息修改
          </p>
          <Form
            id="userInfoForm"
            onFinish={updateData}
            style={{ maxWidth: 600 }}
          >
            <Form.Item
              label="姓名"
              name="userName"
              rules={[{ required: false }]}
            >
              <Input disabled={true} placeholder={data?.userName} />
            </Form.Item>
            <Form.Item label="专业" name="major" rules={[{ required: false }]}>
              <Input disabled={false} placeholder={data?.major} />
            </Form.Item>
            <Form.Item label="年级" name="grade" rules={[{ required: false }]}>
              <Input disabled={false} placeholder={data?.grade} />
            </Form.Item>
            <Form.Item label="班级" name="uclass" rules={[{ required: false }]}>
              <Input disabled={false} placeholder={data?.uclass} />
            </Form.Item>
            <Form.Item label="年龄" name="age" rules={[{ required: false }]}>
              <Input disabled={false} placeholder={data?.age} />
            </Form.Item>
            <Form.Item label="性别" name="sex" rules={[{ required: false }]}>
              <Input disabled={false} placeholder={data?.sex} />
            </Form.Item>
            <Form.Item
              label="手机号"
              name="telephoneNumber"
              rules={[{ required: false }]}
            >
              <Input disabled={false} placeholder={data?.telephoneNumber} />
            </Form.Item>
            <Form.Item label="邮箱" name="email" rules={[{ required: false }]}>
              <Input disabled={false} placeholder={data?.email} />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginLeft: "100px" }}
              >
                确认修改
              </Button>
            </Form.Item>
          </Form>
        </Card>
      )}
    </>
  );
}
