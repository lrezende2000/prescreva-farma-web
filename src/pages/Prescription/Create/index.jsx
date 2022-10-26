import { useState, useMemo } from "react";
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

const CreatePrescription = () => {
  const [activeStep, setActiveStep] = useState(0);

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
        >
          {({ handleSubmit }) => (
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
                  endIcon={!isLastStep && <ArrowRightAlt />}
                  onClick={isLastStep ? () => {} : handleNextStep}
                >
                  {isLastStep ? "Salvar" : "Continuar"}
                </Button>
              </Grid>
            </Grid>
          )}
        </Formik>
      </Container>
    </PageLayout>
  );
};

export default CreatePrescription;
