import { memo, useMemo } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
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

import { maskCpf, maskPhone, maskTel } from "../../../helpers/mask";
import { validateCpf } from "../../../helpers/validate";

import Stepper from "../../../components/Stepper";

const PatientForm = ({ handleToggleSubmit, initialValues }) => {
  const navigate = useNavigate();
  const activeStep = 0;

  const fieldsByStep = useMemo(
    () => ({
      0: [
        "email",
        "name",
        "birthDate",
        "gender",
        "nacionality",
        "tel",
        "phone",
        "cpf",
      ],
    }),
    []
  );

  const validationSchema = yup.object().shape({
    email: yup.string().email("Email no formato errado"),
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
      .test({
        name: "is-valid-cpf",
        message: "CPF inválido",
        test: (value) => validateCpf(value),
      })
      .required("CPF é obrigatório"),
  });

  const handleChange = (e, setter) => {
    const { name, value } = e.target;

    setter(name, value);
  };

  const handleFocus = (e, setter, name) => {
    if (!e.target.name) {
      return setter(name, true);
    }

    setter(e.target.name, true);
  };

  return (
    <>
      <Stepper
        activeStep={activeStep}
        steps={[
          {
            label: "Dados Pessoais",
            icon: <Person />,
          },
        ]}
      />
      <Grid container spacing={2}>
        <Formik
          validateOnMount
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
            touched,
            setFieldTouched,
          }) => {
            const hasError = fieldsByStep[activeStep]
              .map((field) => !!errors[field])
              .some((error) => error);

            return (
              <>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Nome completo"
                    name="name"
                    value={values.name}
                    onChange={(e) => handleChange(e, setFieldValue)}
                    onFocus={(e) => handleFocus(e, setFieldTouched)}
                    error={touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="CPF"
                    name="cpf"
                    placeholder="999.999.999-99"
                    value={values.cpf}
                    onChange={(e) =>
                      setFieldValue(e.target.name, maskCpf(e.target.value))
                    }
                    onFocus={(e) => handleFocus(e, setFieldTouched)}
                    error={touched.cpf && !!errors.cpf}
                    helperText={touched.cpf && errors.cpf}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Email"
                    name="email"
                    value={values.email}
                    onChange={(e) => handleChange(e, setFieldValue)}
                    onFocus={(e) => handleFocus(e, setFieldTouched)}
                    error={touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Data de nascimento"
                    type="date"
                    name="birthDate"
                    InputLabelProps={{ shrink: true }}
                    value={values.birthDate}
                    onChange={(e) => handleChange(e, setFieldValue)}
                    onFocus={(e) => handleFocus(e, setFieldTouched)}
                    error={touched.birthDate && !!errors.birthDate}
                    helperText={touched.birthDate && errors.birthDate}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl
                    fullWidth
                    size="small"
                    error={touched.gender && !!errors.gender}
                  >
                    <InputLabel id="gender_label" htmlFor="gender">
                      Gênero
                    </InputLabel>
                    <Select
                      labelId="gender_label"
                      label="Gênero"
                      name="gender"
                      value={values.gender}
                      onChange={(e) => handleChange(e, setFieldValue)}
                      onFocus={(e) => handleFocus(e, setFieldTouched, "gender")}
                    >
                      <MenuItem value="MEN">Masculino</MenuItem>
                      <MenuItem value="WOMAN">Feminino</MenuItem>
                      <MenuItem value="OTHER">Outro</MenuItem>
                    </Select>
                    {touched.gender && !!errors.gender && (
                      <FormHelperText>{errors.gender}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Nacionalidade"
                    name="nacionality"
                    value={values.nacionality}
                    onChange={(e) => handleChange(e, setFieldValue)}
                    onFocus={(e) => handleFocus(e, setFieldTouched)}
                    error={touched.nacionality && !!errors.nacionality}
                    helperText={touched.nacionality && errors.nacionality}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Celular"
                    name="phone"
                    placeholder="(99)99999-9999"
                    value={values.phone}
                    onChange={(e) =>
                      setFieldValue(e.target.name, maskPhone(e.target.value))
                    }
                    onFocus={(e) => handleFocus(e, setFieldTouched)}
                    error={touched.phone && !!errors.phone}
                    helperText={touched.phone && errors.phone}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Telefone"
                    name="tel"
                    placeholder="(99)9999-9999"
                    value={values.tel}
                    onChange={(e) =>
                      setFieldValue(e.target.name, maskTel(e.target.value))
                    }
                    onFocus={(e) => handleFocus(e, setFieldTouched)}
                    error={touched.tel && !!errors.tel}
                    helperText={touched.tel && errors.tel}
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
                    disabled={isSubmitting || hasError}
                    onClick={handleSubmit}
                  >
                    Salvar
                  </Button>
                </Grid>
              </>
            );
          }}
        </Formik>
      </Grid>
    </>
  );
};

export default memo(PatientForm);
