import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Table } from "antd";
import { useNavigate } from "react-router-dom";
import {
  fetchAllTeams,
  deleteTeam,
  updateTeam,
} from "../../../services/requests/team";

const ShowTeam = () => {
  const [teams, setTeams] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    loadTeams();
  }, []);

  const loadTeams = async () => {
    const response = await fetchAllTeams();
    setTeams(response.data);
  };

  const handleEdit = (team) => {
    setSelectedTeam(team);
    form.setFieldsValue({
      TeamName: team.TeamName, // <-- ndryshuar
    });
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this team?",
      onOk: async () => {
        await deleteTeam(id);
        loadTeams();
      },
    });
  };

  const handleUpdate = async () => {
    const values = await form.validateFields();
    const payload = {
      id: selectedTeam.id,
      TeamName: values.TeamName, // <-- ndryshuar
    };
    await updateTeam(payload);
    setIsModalVisible(false);
    loadTeams();
  };

  const columns = [
    {
      title: "Team Name",
      dataIndex: "TeamName",
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
      <h2>Teams</h2>
      <Button
        type="primary"
        onClick={() => navigate("/admin/team/add")}
        style={{ marginBottom: 16 }}
      >
        Add Team
      </Button>
      <Table columns={columns} dataSource={teams} rowKey="id" />

      <Modal
        title="Edit Team"
        visible={isModalVisible}
        onOk={handleUpdate}
        onCancel={() => setIsModalVisible(false)}
        okText="Save"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="TeamName" // <-- ndryshuar
            label="Team Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ShowTeam;
