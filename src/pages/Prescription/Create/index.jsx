import { useState, useMemo } from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Button, Grid } from "@mui/material";
import {
  ArrowRightAlt,
  LocalPharmacy,
  Medication,
  Person,
} from "@mui/icons-material";
import { Formik } from "formik";

import PageLayout from "../../../components/PageLayout";
import Stepper from "../../../components/Stepper";

import { Container } from "./styles";
import PatientForm from "../forms/PatientForm";
import PharmacologicalTherapy from "../forms/PharmacologicalTherapy";
import NonPharmacologicalTherapy from "../forms/NonPharmacologicalTherapy";
import useAxios from "../../../hooks/useAxios";
import { formatBody } from "../../../helpers/formatter";

const CreatePrescription = () => {
  const [activeStep, setActiveStep] = useState(0);

  const api = useAxios();

  const steps = useMemo(
    () => [
      {
        label: "Paciente",
        icon: <Person />,
      },
      {
        label: "Terapia Farmacológica",
        icon: <Medication />,
      },
      {
        label: "Terapia não Farmacológica",
        icon: <LocalPharmacy />,
      },
    ],
    []
  );

  const fieldsByStep = useMemo(
    () => ({
      0: ["patientId"],
      1: ["medicines", "aditionalInfos"],
      2: ["nonPharmacologicalTherapy"],
    }),
    []
  );

  const navigate = useNavigate();

  const isFirstStep = activeStep === 0;
  const isLastStep = activeStep === steps.length - 1;

  const handleNextStep = () => {
    const maxStep = steps.length - 1;

    setActiveStep((prev) => (prev >= maxStep ? maxStep : prev + 1));
  };

  const handlePrevStep = () => {
    setActiveStep((prev) => (prev <= 0 ? 0 : prev - 1));
  };

  const validationSchema = yup.object().shape({
    patientId: yup.number().integer().required("Paciente é obrigatório"),
    medicines: yup
      .array(
        yup.object().shape({
          medicineId: yup
            .number()
            .integer()
            .required("Fármaco é obrigatório")
            .typeError("Fármaco é obrigatório"),
          medicineName: yup.string(),
          concentration: yup.string().required("Concentração é obrigatório"),
          instructions: yup
            .string()
            .required(
              "Dose, frequência de administração do medicamento e duração do tratamento é obrigatório"
            ),
          administrationForm: yup
            .string()
            .oneOf(
              ["Uso oral", "Uso externo"],
              "Forma de administração só pode ser 'Uso oral' ou 'Uso externo'"
            )
            .required("Forma de administração é obrigatória"),
        })
      )
      .required("Fármacos são obrigatórios"),
    aditionalInfos: yup.string(),
    nonPharmacologicalTherapy: yup.string(),
  });

  const handleToggleSubmit = async (values) => {
    try {
      await api.post("/prescription/", formatBody(values));

      navigate("/prescricao");
    } catch {}
  };

  return (
    <PageLayout>
      <Container>
        <Stepper activeStep={activeStep} steps={steps} />
        <Formik
          initialValues={{
            patientId: null,
            medicines: [],
            aditionalInfos: "",
            nonPharmacologicalTherapy: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleToggleSubmit}
          validateOnMount
        >
          {({ handleSubmit, errors, isSubmitting }) => {
            const hasError = fieldsByStep[activeStep]
              .map((field) => !!errors[field])
              .some((error) => error);

            return (
              <Grid container spacing={2}>
                {activeStep === 0 && <PatientForm />}
                {activeStep === 1 && <PharmacologicalTherapy />}
                {activeStep === 2 && <NonPharmacologicalTherapy />}
                <Grid
                  item
                  xs={12}
                  display="flex"
                  flexDirection={["column", "row"]}
                  justifyContent="space-between"
                  gap={1}
                >
                  {!isFirstStep ? (
                    <Button variant="outlined" onClick={handlePrevStep}>
                      Voltar
                    </Button>
                  ) : (
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => navigate("/prescricao")}
                    >
                      Cancelar
                    </Button>
                  )}
                  <Button
                    disabled={hasError || isSubmitting}
                    endIcon={!isLastStep && <ArrowRightAlt />}
                    onClick={isLastStep ? handleSubmit : handleNextStep}
                  >
                    {isLastStep ? "Salvar" : "Continuar"}
                  </Button>
                </Grid>
              </Grid>
            );
          }}
        </Formik>
      </Container>
    </PageLayout>
  );
};

export default CreatePrescription;
