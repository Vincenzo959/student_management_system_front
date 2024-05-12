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
} from "antd";

export default function abc() {
  return (
    <>
      <Card>
        <p style={{ marginTop: "-10px", fontSize: "24px", fontWeight: "bold" }}>
          用户信息修改
        </p>
        <Form style={{ maxWidth: 600 }}>
          <Form.Item label="姓名" name="姓名" rules={[{ required: false }]}>
            <Input disabled={true} />
          </Form.Item>
          <Form.Item label="专业" name="专业" rules={[{ required: false }]}>
            <Input disabled={true} />
          </Form.Item>
          <Form.Item label="年级" name="年级" rules={[{ required: false }]}>
            <Input disabled={true} />
          </Form.Item>
          <Form.Item label="班级" name="班级" rules={[{ required: false }]}>
            <Input disabled={true} />
          </Form.Item>
          <Form.Item label="年龄" name="年龄" rules={[{ required: false }]}>
            <Input disabled={false} />
          </Form.Item>
          <Form.Item label="性别" name="性别" rules={[{ required: false }]}>
            <Input disabled={false} />
          </Form.Item>
          <Form.Item label="手机号" name="手机号" rules={[{ required: false }]}>
            <Input disabled={false} />
          </Form.Item>
          <Form.Item label="邮箱" name="邮箱" rules={[{ required: false }]}>
            <Input disabled={false} />
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
    </>
  );
}
