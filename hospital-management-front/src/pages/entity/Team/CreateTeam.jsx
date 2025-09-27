import { Formik, Field, Form } from "formik";
import { Button, Input } from "antd";
import { createTeam } from "../../../services/requests/team";
import { useNavigate } from "react-router-dom";

const CreateTeam = () => {
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{ TeamName: "" }} // <-- ndryshuar këtu
      onSubmit={async (values) => {
        await createTeam(values); // dërgon { TeamName: "..." }
        navigate("/admin/team/show");
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <Field name="TeamName" as={Input} placeholder="Team Name" /> {/* <-- ndryshuar këtu */}
          <Button type="primary" htmlType="submit" loading={isSubmitting}>
            Create Team
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CreateTeam;
