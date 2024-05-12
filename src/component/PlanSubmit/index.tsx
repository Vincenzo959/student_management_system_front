import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Alert, Button, Card, Flex, Form, Input, message, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";

const { Dragger } = Upload;

const props: UploadProps = {
  name: "file",
  multiple: true,
  action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

export default ({ prop }) => {
  const publicPlan = async (value: any) => {
    value["userId"] = prop.id;
    fetch("/api/student/plan/studentPushPlanInfo/insert/API_004", {
      method: "POST",
      body: JSON.stringify(value),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        res.code === 0
          ? message.success("提交成功")
          : message.error("提交失败");
      });
  };
  return (
    <>
      <Card>
        <p style={{ marginTop: "-10px", fontSize: "24px", fontWeight: "bold" }}>
          实习报告提交
        </p>
        <Form id="public" onFinish={publicPlan}>
          <Flex>
            <Form.Item label="课程" name="pclass" rules={[{ required: false }]}>
              <Input disabled={false} />
            </Form.Item>
            <Form.Item
              label="标题"
              name="planName"
              rules={[{ required: false }]}
              style={{ marginLeft: "20px" }}
            >
              <Input disabled={false} />
            </Form.Item>
            <Form.Item
              label="备注"
              name="remark"
              rules={[{ required: false }]}
              style={{ marginLeft: "20px" }}
            >
              <TextArea disabled={false} />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                style={{ marginLeft: "85px" }}
              >
                发布
              </Button>
            </Form.Item>
          </Flex>
        </Form>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">点击或拖动上传文件</p>
          <p className="ant-upload-hint">
            支持单次或批量上传，格式为doc、docx。
          </p>
        </Dragger>
        <Alert
          style={{ marginTop: "10px", maxWidth: 600, whiteSpace: "pre" }}
          message="温馨提示："
          description={
            "1、文件上传格式为：doc、docx；\n2、文件命名格式为：班级_姓名_标题，如：20大数据1_卓佳伟_XXX实验报告；\n3、单次上传文件最大不超过100M；\n4、请勿抄袭，系统会不定时进行检查，如若雷同，则判0分；"
          }
          type="success"
        />
      </Card>
      ;
    </>
  );
};
