import { useState, useMemo } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Grid } from "@mui/material";
import {
  ArrowRightAlt,
  LocalPharmacy,
  Medication,
  Person,
  Preview,
} from "@mui/icons-material";

import useAxios from "../../../hooks/useAxios";
import { formatBody } from "../../../helpers/formatter";

import PageLayout from "../../../components/PageLayout";
import Stepper from "../../../components/Stepper";
import PatientForm from "../components/forms/PatientForm";
import PharmacologicalTherapy from "../components/forms/PharmacologicalTherapy";
import NonPharmacologicalTherapy from "../components/forms/NonPharmacologicalTherapy";
import PreviewPrescription from "../components/PreviewPrescription";

import { Container } from "./styles";

const CreatePrescription = () => {
  const [activeStep, setActiveStep] = useState(0);

  const api = useAxios();

  const [searchParams] = useSearchParams();

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
      {
        label: "Pré-visualizar",
        icon: <Preview />,
      },
    ],
    []
  );

  const fieldsByStep = useMemo(
    () => ({
      0: ["patientId"],
      1: ["medicines", "aditionalInfos"],
      2: ["nonPharmacologicalTherapy"],
      3: [""],
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
    patientId: yup
      .number()
      .integer()
      .required("Paciente é obrigatório")
      .typeError("Paciente é obrigatório"),
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
              ["Uso Interno", "Uso Externo"],
              "Forma de administração só pode ser 'Uso Interno' ou 'Uso Externo'"
            )
            .required("Forma de administração é obrigatória"),
        })
      )
      .min(1)
      .required("Fármacos são obrigatórios"),
    aditionalInfos: yup.string(),
    nonPharmacologicalTherapy: yup.string(),
  });

  const handleToggleSubmit = async (values) => {
    try {
      const { data } = await api.post("/prescription/", formatBody(values));

      toast.success(data.message);
      navigate("/prescricao", { state: { openAvaliation: true } });
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <PageLayout>
      <Container>
        <Stepper activeStep={activeStep} steps={steps} />
        <Formik
          initialValues={{
            patientId: searchParams.get("patientId")
              ? parseInt(searchParams.get("patientId"))
              : null,
            medicines: [],
            aditionalInfos: "",
            nonPharmacologicalTherapy: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleToggleSubmit}
          validateOnMount
        >
          {({ handleSubmit, errors, isSubmitting, values }) => {
            const hasError = fieldsByStep[activeStep]
              .map((field) => !!errors[field])
              .some((error) => error);

            return (
              <Grid container spacing={2}>
                {activeStep === 0 && <PatientForm />}
                {activeStep === 1 && <PharmacologicalTherapy />}
                {activeStep === 2 && <NonPharmacologicalTherapy />}
                {activeStep === 3 && <PreviewPrescription values={values} />}
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
