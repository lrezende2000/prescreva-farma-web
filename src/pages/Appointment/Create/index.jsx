import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import moment from "moment";
import { Button, Grid, TextField } from "@mui/material";
import { CalendarMonth } from "@mui/icons-material";

import PageLayout from "../../../components/PageLayout";
import Stepper from "../../../components/Stepper";

import { Container } from "./styles";
import PatientAutocomplete from "../../../components/PatientAutocomplete";
import { Formik } from "formik";
import { useMemo } from "react";
import useAxios from "../../../hooks/useAxios";
import { formatBody } from "../../../helpers/formatter";

const CreateAppointment = () => {
  const navigate = useNavigate();

  const activeStep = 0;

  const fieldsByStep = useMemo(
    () => ({
      0: ["date", "start", "end", "patientId"],
    }),
    []
  );

  const api = useAxios();

  const validationSchema = yup.object().shape({
    date: yup
      .date()
      .min(
        moment().startOf("date").toDate(),
        "Data da consulta deve ser depois da data atual"
      )
      .typeError("Data no formato errado")
      .required("Data é obrigatória"),
    start: yup.string().required("Horário inicial é obrigatório"),
    end: yup
      .string()
      .test(
        "is-after",
        "Horário final precisa ser maior que horário inicial",
        (value, context) => {
          if (context.parent.start && context.parent.date) {
            const day = moment(context.parent.date).format("YYYY-MM-DD");
            const start = moment(`${day} ${context.parent.start}`);

            return moment(`${day} ${value}`).isAfter(start);
          }

          return true;
        }
      )
      .required("Horário final é obrigatório"),
    patientId: yup.number().integer().required("Paciente é obrigatório"),
  });

  const handleToggleSubmit = async (values) => {
    try {
      const body = {
        ...values,
        start: `${values.date}T${values.start}:00`,
        end: `${values.date}T${values.end}:00`,
      };

      delete body.date;

      await api.post("/appointment/", formatBody(body));

      navigate("/consultas");
    } catch (err) {}
  };

  return (
    <PageLayout>
      <Formik
        initialValues={{ patientId: null, date: "", start: "", end: "" }}
        validationSchema={validationSchema}
        onSubmit={handleToggleSubmit}
      >
        {({
          values,
          errors,
          setFieldValue,
          touched,
          setFieldTouched,
          isSubmitting,
          handleSubmit,
        }) => {
          const hasError = fieldsByStep[activeStep]
            .map((field) => !!errors[field])
            .some((error) => error);

          return (
            <Container>
              <Stepper
                steps={[{ label: "Agendamento", icon: <CalendarMonth /> }]}
              />
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <PatientAutocomplete
                    onChange={(patient) =>
                      setFieldValue("patientId", patient?.id)
                    }
                    onFocus={() => setFieldTouched("patientId", true)}
                    isError={touched.patientId && !!errors.patientId}
                    error={touched.patientId && errors.patientId}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Data da consulta"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={values.date}
                    onChange={(e) => setFieldValue("date", e.target.value)}
                    onFocus={() => setFieldTouched("date", true)}
                    error={touched.date && !!errors.date}
                    helperText={touched.date && errors.date}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Horário inicial"
                    type="time"
                    InputLabelProps={{ shrink: true }}
                    value={values.start}
                    onChange={(e) => setFieldValue("start", e.target.value)}
                    onFocus={() => setFieldTouched("start", true)}
                    error={touched.start && !!errors.start}
                    helperText={touched.start && errors.start}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Horário de término"
                    type="time"
                    InputLabelProps={{ shrink: true }}
                    value={values.end}
                    onChange={(e) => setFieldValue("end", e.target.value)}
                    onFocus={() => setFieldTouched("end", true)}
                    error={touched.end && !!errors.end}
                    helperText={touched.end && errors.end}
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
                    onClick={() => navigate("/consultas")}
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
              </Grid>
            </Container>
          );
        }}
      </Formik>
    </PageLayout>
  );
};

export default CreateAppointment;
