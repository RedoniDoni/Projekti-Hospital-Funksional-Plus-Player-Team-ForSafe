import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { createLecture } from "../../../services/requests/ligjerata";
import { fetchAllLecturers } from "../../../services/requests/ligjeruesi";

const CreateLecture = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [lecturers, setLecturers] = useState([]);

  useEffect(() => {
    const loadLecturers = async () => {
      const response = await fetchAllLecturers();
      setLecturers(response.data);
    };
    loadLecturers();
  }, []);

  const onFinish = async (values) => {
    await createLecture(values);
    navigate("/admin/lecture/show");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Add Lecture</h2>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="lectureName"
          label="Lecture Name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="ligjeruesiId"
          label="Lecturer"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select a lecturer">
            {lecturers.map((lecturer) => (
              <Select.Option key={lecturer.id} value={lecturer.id}>
                {lecturer.lecturerName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </Form>
    </div>
  );
};

export default CreateLecture;
