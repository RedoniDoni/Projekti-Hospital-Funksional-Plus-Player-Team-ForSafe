import { Formik, Field, Form } from "formik";
import { Button, Input, Select } from "antd";
import { createPlayer } from "../../../services/requests/player";
import { fetchAllTeams } from "../../../services/requests/team";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const CreatePlayer = () => {
  const navigate = useNavigate();
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const loadTeams = async () => {
      const response = await fetchAllTeams();
      setTeams(response.data);
    };
    loadTeams();
  }, []);

  return (
    <Formik
      initialValues={{
        name: "",
        number: "",
        teamId: "",
      }}
      onSubmit={async (values) => {
        const payload = {
          name: values.name,
          number: parseInt(values.number),
          team: { id: values.teamId }, // team ID merret direkt
        };
        await createPlayer(payload);
        navigate("/admin/player/show");
      }}
    >
      {({ setFieldValue, isSubmitting }) => (
        <Form>
          <Field name="name" as={Input} placeholder="Player Name" />
          <Field name="number" as={Input} type="number" placeholder="Number" />
          <Select
            placeholder="Select Team"
            onChange={(value) => setFieldValue("teamId", value)}
            style={{ width: "100%", marginTop: 8, marginBottom: 8 }}
          >
            {teams.map((team) => (
              <Select.Option key={team.id} value={team.id}>
                {team.TeamName} {/* Emri shfaqet këtu */}
              </Select.Option>
            ))}
          </Select>
          <Button type="primary" htmlType="submit" loading={isSubmitting}>
            Create Player
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CreatePlayer;
