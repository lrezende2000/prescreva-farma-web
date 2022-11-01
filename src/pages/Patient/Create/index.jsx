import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Person } from "@mui/icons-material";
import * as yup from "yup";

import PageLayout from "../../../components/PageLayout";
import Stepper from "../../../components/Stepper";

import { Container } from "./styles";
import useAxios from "../../../hooks/useAxios";
import { maskCpf, maskPhone, maskTel } from "../../../helpers/mask";
import { formatBody } from "../../../helpers/formatter";

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

  const handleChange = (e, setter) => {
    const { name, value } = e.target;

    setter(name, value);
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Email no formato errado")
      .required("Email é obrigatório"),
    name: yup
      .string()
      .max(100, "Nome precisa ter menos de 100 caracteres")
      .required("Nome é obrigatório"),
    birthDate: yup
      .date()
      .typeError("Data no formato errado")
      .required("Data de nascimento é obrigatória"),
    gender: yup
      .mixed()
      .oneOf(["WOMAN", "MEN", "OTHER"], "Gênero errado")
      .required("Gênero é obrigatório"),
    nacionality: yup
      .string()
      .max(30, "Nacionalidade precisa ter menos de 30 caracteres")
      .required("Nacionalidade é obrigatória"),
    tel: yup
      .string()
      .matches(/^\(\d{2}\)\d{4}-\d{4}$/, "Telefone no formato errado"),
    phone: yup
      .string()
      .matches(/^\(\d{2}\)\d{5}-\d{4}$/, "Celular no formato errado")
      .required("Celular é obrigatório"),
    cpf: yup
      .string()
      .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF no formato errado")
      .required("CPF é obrigatório"),
  });

  const handleToggleSubmit = async (values) => {
    try {
      await api.post(
        "/patient/",
        formatBody(values, { numberFields: ["tel", "phone", "cpf"] })
      );

      navigate("/patient");
    } catch {}
  };

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
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleToggleSubmit}
          >
            {({
              values,
              setFieldValue,
              errors,
              handleSubmit,
              isSubmitting,
              isValid,
            }) => (
              <>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Nome completo"
                    name="name"
                    error={!!errors.name}
                    helperText={errors.name}
                    value={values.name}
                    onChange={(e) => handleChange(e, setFieldValue)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="CPF"
                    name="cpf"
                    placeholder="999.999.999-99"
                    value={values.cpf}
                    error={!!errors.cpf}
                    helperText={errors.cpf}
                    onChange={(e) =>
                      setFieldValue(e.target.name, maskCpf(e.target.value))
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Email"
                    name="email"
                    error={!!errors.email}
                    helperText={errors.email}
                    onChange={(e) => handleChange(e, setFieldValue)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Data de nascimento"
                    type="date"
                    name="birthDate"
                    InputLabelProps={{ shrink: true }}
                    helperText={errors.birthDate}
                    error={!!errors.birthDate}
                    values={values.birthDate}
                    onChange={(e) => handleChange(e, setFieldValue)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth size="small" error={!!errors.gender}>
                    <InputLabel id="gender_label" htmlFor="gender">
                      Gênero
                    </InputLabel>
                    <Select
                      labelId="gender_label"
                      label="Gênero"
                      name="gender"
                      value={values.gender}
                      onChange={(e) => handleChange(e, setFieldValue)}
                    >
                      <MenuItem value="MEN">Masculino</MenuItem>
                      <MenuItem value="WOMAN">Feminino</MenuItem>
                      <MenuItem value="OTHER">Outro</MenuItem>
                    </Select>
                    {errors.gender && (
                      <FormHelperText>{errors.gender}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Nacionalidade"
                    name="nacionality"
                    value={values.nacionality}
                    error={!!errors.nacionality}
                    helperText={errors.nacionality}
                    onChange={(e) => handleChange(e, setFieldValue)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Celular"
                    name="phone"
                    value={values.phone}
                    error={!!errors.phone}
                    helperText={errors.phone}
                    onChange={(e) =>
                      setFieldValue(e.target.name, maskPhone(e.target.value))
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Telefone"
                    name="tel"
                    value={values.tel}
                    error={!!errors.tel}
                    helperText={errors.tel}
                    onChange={(e) =>
                      setFieldValue(e.target.name, maskTel(e.target.value))
                    }
                  />
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
                  <Button
                    disabled={isSubmitting || !isValid}
                    onClick={handleSubmit}
                  >
                    Salvar
                  </Button>
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
