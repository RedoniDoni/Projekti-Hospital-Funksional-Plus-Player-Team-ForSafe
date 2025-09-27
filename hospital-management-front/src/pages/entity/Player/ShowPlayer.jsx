import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Select, Table } from "antd";
import { useNavigate } from "react-router-dom";
import {
  fetchAllPlayers,
  deletePlayer,
  updatePlayer,
} from "../../../services/requests/player";
import { fetchAllTeams } from "../../../services/requests/team";

const ShowPlayer = () => {
  const [players, setPlayers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    loadPlayers();
    loadTeams();
  }, []);

  const loadPlayers = async () => {
    const response = await fetchAllPlayers();
    setPlayers(response.data);
  };

  const loadTeams = async () => {
    const response = await fetchAllTeams();
    setTeams(response.data);
  };

  const handleEdit = (player) => {
    setSelectedPlayer(player);
    form.setFieldsValue({
      name: player.name,
      number: player.number,
      teamId: player.team?.id,
    });
    setIsModalVisible(true);
  };

  const handleDelete = async (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this player?",
      onOk: async () => {
        await deletePlayer(id);
        loadPlayers();
      },
    });
  };

  const handleUpdate = async () => {
    const values = await form.validateFields();
    const payload = {
      name: values.name,
      number: values.number,
      team: { id: values.teamId },
    };
    await updatePlayer(selectedPlayer.id, payload);
    setIsModalVisible(false);
    loadPlayers();
  };

  const columns = [
    {
      title: "Player Name",
      dataIndex: "name",
    },
    {
      title: "Number",
      dataIndex: "number",
    },
    {
      title: "Team",
      render: (_, record) => record.team?.TeamName || "N/A",
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
      <h2>Players</h2>
      <Button
        type="primary"
        onClick={() => navigate("/admin/player/add")}
        style={{ marginBottom: 16 }}
      >
        Add Player
      </Button>
      <Table columns={columns} dataSource={players} rowKey="id" />

      <Modal
        title="Edit Player"
        visible={isModalVisible}
        onOk={handleUpdate}
        onCancel={() => setIsModalVisible(false)}
        okText="Save"
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Player Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="number" label="Number" rules={[{ required: true }]}>
            <Input type="number" />
          </Form.Item>
          <Form.Item name="teamId" label="Team" rules={[{ required: true }]}>
            <Select placeholder="Select a team">
              {teams.map((team) => (
                <Select.Option key={team.id} value={team.id}>
                  {team.TeamName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ShowPlayer;
