import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Select, Table } from "antd";
import { useNavigate } from "react-router-dom";
import {
  fetchAllLectures,
  deleteLecture,
  updateLecture,
} from "../../../services/requests/ligjerata";
import { fetchAllLecturers } from "../../../services/requests/ligjeruesi";

const ShowLecture = () => {
  const [lectures, setLectures] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    loadLectures();
    loadLecturers();
  }, []);

  const loadLectures = async () => {
    const response = await fetchAllLectures();
    setLectures(response.data);
  };

  const loadLecturers = async () => {
    const response = await fetchAllLecturers();
    setLecturers(response.data);
  };

  const handleEdit = (lecture) => {
    setSelectedLecture(lecture);
    form.setFieldsValue({
      lectureName: lecture.lectureName,
      ligjeruesiId: lecture.ligjeruesi?.id,
    });
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this lecture?",
      onOk: async () => {
        await deleteLecture(id);
        loadLectures();
      },
    });
  };

  const handleUpdate = async () => {
    const values = await form.validateFields();
    const payload = {
        id: selectedLecture.id, // <-- KY ËSHTË I DOMOSDOSHËM
        lectureName: values.lectureName,
        ligjeruesi: { id: values.ligjeruesiId },
      };
      await updateLecture(payload);// nuk i kalon më ID-n veçmas
    setIsModalVisible(false);
    loadLectures();
  };

  const columns = [
    {
      title: "Lecture Name",
      dataIndex: "lectureName",
    },
    {
      title: "Lecturer",
      render: (_, record) => record.ligjeruesi?.lecturerName || "N/A",
    },
    {
      title: "Actions",
      render: (_, record) => (
        <>
          <Button onClick={() => handleEdit(record)} style={{ marginRight: 8 }}>
            Edit
          </Button>
          <Button danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h2>Lectures</h2>
      <Button
        type="primary"
        onClick={() => navigate("/admin/ligjerata/add")}
        style={{ marginBottom: 16 }}
      >
        Add Lecture
      </Button>
      <Table columns={columns} dataSource={lectures} rowKey="id" />

      <Modal
        title="Edit Lecture"
        visible={isModalVisible}
        onOk={handleUpdate}
        onCancel={() => setIsModalVisible(false)}
        okText="Save"
      >
        <Form form={form} layout="vertical">
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
        </Form>
      </Modal>
    </div>
  );
};

export default ShowLecture;
