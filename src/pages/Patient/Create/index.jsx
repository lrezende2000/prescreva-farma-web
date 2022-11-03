import { useNavigate } from "react-router-dom";

import useAxios from "../../../hooks/useAxios";
import { formatBody } from "../../../helpers/formatter";

import PageLayout from "../../../components/PageLayout";
import PatientForm from "../components/PatientForm";

import { Container } from "./styles";

const initialValues = {
  name: "",
  email: "",
  cpf: "",
  birthDate: "",
  gender: "",
  nacionality: "",
  phone: "",
  tel: "",
};

const CreatePatient = () => {
  const navigate = useNavigate();

  const api = useAxios();

  const handleToggleSubmit = async (values) => {
    try {
      await api.post(
        "/patient/",
        formatBody(values, { numberFields: ["tel", "phone", "cpf"] })
      );

      navigate("/pacientes");
    } catch {}
  };

  return (
    <PageLayout>
      <Container>
        <PatientForm
          handleToggleSubmit={handleToggleSubmit}
          initialValues={initialValues}
        />
      </Container>
    </PageLayout>
  );
};

export default CreatePatient;
