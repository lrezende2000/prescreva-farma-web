import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { Button, Grid, TextField } from "@mui/material";
import { Person } from "@mui/icons-material";

import PageLayout from "../../../components/PageLayout";
import Stepper from "../../../components/Stepper";

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

  return (
    <PageLayout>
      <Container>
        <Stepper
          steps={[
            {
              label: "Dados Pessoais",
              icon: <Person />,
            },
          ]}
        />
        <Grid container spacing={2}>
          <Formik initialValues={initialValues}>
            {({}) => (
              <>
                <Grid item xs={12} md={6}>
                  <TextField label="Nome completo" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField label="Email" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField label="CPF" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Data de nascimento"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField label="Celular" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField label="Telefone" />
                </Grid>
                <Grid
                  item
                  xs={12}
                  display="flex"
                  flexDirection={["column", "row"]}
                  justifyContent="space-between"
                  gap={1}
                >
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => navigate("/pacientes")}
                  >
                    Cancelar
                  </Button>
                  <Button>Salvar</Button>
                </Grid>
              </>
            )}
          </Formik>
        </Grid>
      </Container>
    </PageLayout>
  );
};

export default CreatePatient;
