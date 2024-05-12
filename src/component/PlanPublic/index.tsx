import type { ProFormInstance } from "@ant-design/pro-components";
import {
  ProForm,
  ProFormDateRangePicker,
  ProFormDigit,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";
import { Card, TreeSelect, message } from "antd";

export default ({ prop }) => {
  return (
    <Card>
      <p style={{ marginTop: "-10px", fontSize: "24px", fontWeight: "bold" }}>
        实习实践计划发布
      </p>
      <ProForm<{
        name: string;
        company?: string;
        useMode?: string;
      }>
        onFinish={async (values) => {
          console.log(values);
          fetch("/api/teacher/plan/teacherPushPlanInfo/insert/API_005", {
            method: "POST",
            body: JSON.stringify(values),
            headers: {
              "content-type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((res) => {
              if (res.code !== 0) {
                message.error(res.data);
              } else {
                message.success("提交成功");
              }
            });
        }}
        params={{ id: "100" }}
        formKey="base-form-use-demo"
        dateFormatter={(value, valueType) => {
          console.log("---->", value, valueType);
          return value.format("YYYY/MM/DD HH:mm:ss");
        }}
        autoFocusFirstInput
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="name"
            required
            dependencies={[["contract", "name"]]}
            label="实习实践名称"
            tooltip="最长为 24 位"
            placeholder="实习实践名称"
            rules={[{ required: true, message: "这是必填项" }]}
          />
          <ProFormText
            width="md"
            name="guideTeacherString"
            required
            label="指导老师"
            placeholder="请输入指导老师名称"
          />
          <ProFormText
            width="md"
            name="pclass"
            required
            label="课程名称"
            placeholder="请输入实习地点"
          />
          <ProFormDigit name="count" label="人数" width="xs" />
          <ProFormText
            width="md"
            name="address"
            required
            label="实习地点"
            placeholder="请输入实习地点"
          />
          <ProFormText
            width="sm"
            name="ugrade"
            required
            label="年级"
            placeholder="请输入年级"
          />
          <ProFormText
            width="md"
            name="umajor"
            required
            label="专业"
            placeholder="请输入专业"
          />
          <ProFormText
            width="sm"
            name="uclass"
            required
            label="班级"
            placeholder="请输入班级"
          />

          <ProFormText width="md" name="techo" label="实习所需技术" />

          <ProFormDateRangePicker
            width="md"
            name={["contract", "createTime"]}
            required
            label="实习实践时间段"
          />
        </ProForm.Group>
        <ProFormTextArea
          colProps={{ span: 24 }}
          name="content"
          label="实习主要内容"
        />
        <ProFormTextArea colProps={{ span: 24 }} name="remark" label="备注" />
      </ProForm>
    </Card>
  );
};
