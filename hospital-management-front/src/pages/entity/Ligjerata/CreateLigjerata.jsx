import { Formik, Field, Form } from "formik";
import { Button, Input, Select } from "antd";
import { createLecture } from "../../../services/requests/ligjerata";
import { fetchAllLecturers } from "../../../services/requests/ligjeruesi";

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const CreateLigjerata = () => {
  const navigate = useNavigate();
  const [lecturers, setLecturers] = useState([]);

  useEffect(() => {
    const loadLecturers = async () => {
      const response = await fetchAllLecturers();
      setLecturers(response.data);
    };
    loadLecturers();
  }, []);

  return (
    <Formik
      initialValues={{
        LectureName: "",
        ligjeruesiId: "",
      }}
      onSubmit={async (values) => {
        const payload = {
          LectureName: values.LectureName,
          ligjeruesi: { id: values.ligjeruesiId }, // dërgo si objekt
        };
        await createLecture(payload);
        navigate("/admin/ligjerata/show");
      }}
    >
      {({ setFieldValue, isSubmitting }) => (
        <Form>
          <Field name="LectureName" as={Input} placeholder="Lecture Name" />
          <Select placeholder="Select Lecturer" onChange={(value) => setFieldValue("ligjeruesiId", value)}>
            {lecturers.map((lecturer) => (
              <Select.Option key={lecturer.id} value={lecturer.id}>
                {lecturer.lecturerName}
              </Select.Option>
            ))}
          </Select>
          <Button type="primary" htmlType="submit" loading={isSubmitting}>
            Create Lecture
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CreateLigjerata;
