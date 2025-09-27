import React from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { createLecturer } from "../../../services/requests/ligjeruesi";

const CreateLecturer = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    await createLecturer(values);
    navigate("/admin/lecturer/show");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Add Lecturer</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="lecturerName"
          label="Lecturer Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="departament"
          label="Department"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, type: "email" }]}
        >
          <Input />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </Form>
    </div>
  );
};

export default CreateLecturer;
