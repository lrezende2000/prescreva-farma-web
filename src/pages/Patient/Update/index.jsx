import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";

import useAxios from "../../../hooks/useAxios";
import { formatBody } from "../../../helpers/formatter";

import PageLayout from "../../../components/PageLayout";
import PatientForm from "../components/PatientForm";

import { Container } from "./styles";
import { Box, CircularProgress } from "@mui/material";
import { maskCpf, maskPhone, maskTel } from "../../../helpers/mask";

const UpdatePatient = () => {
  const [laoding, setLoading] = useState(true);
  const [patient, setPatient] = useState();

  const navigate = useNavigate();

  const { id } = useParams();

  const api = useAxios();

  const handleToggleSubmit = async (values) => {
    try {
      await api.put(
        `/patient/${id}`,
        formatBody(values, { numberFields: ["tel", "phone", "cpf"] })
      );

      navigate("/pacientes");
    } catch {}
  };

  useEffect(() => {
    if (!id) {
      navigate("/pacientes");
    }

    api
      .get(`/patient/${id}`)
      .then(({ data }) => setPatient(data.patient))
      .catch(() => navigate("/pacientes"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <PageLayout>
      <Container>
        {laoding || !patient ? (
          <Box display="flex" alignItems="center" justifyContent="center">
            <CircularProgress size={20} />
          </Box>
        ) : (
          <PatientForm
            initialValues={{
              name: patient?.name,
              email: patient?.email,
              cpf: maskCpf(patient?.cpf),
              birthDate: moment.utc(patient?.birthDate).format("YYYY-MM-DD"),
              gender: patient?.gender,
              nacionality: patient?.nacionality,
              phone: maskPhone(patient?.phone),
              tel: maskTel(patient?.tel),
            }}
            handleToggleSubmit={handleToggleSubmit}
          />
        )}
      </Container>
    </PageLayout>
  );
};

export default UpdatePatient;
