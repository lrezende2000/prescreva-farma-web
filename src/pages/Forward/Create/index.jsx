import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { Button, Grid } from "@mui/material";
import { ArrowRightAlt, Reply } from "@mui/icons-material";

import PageLayout from "../../../components/PageLayout";
import Stepper from "../../../components/Stepper";
import ForwardForm from "../forms/ForwardForm";

import { Container } from "./styles";

const CreateForward = () => {
  const [activeStep, setActiveStep] = useState(0);

  const navigate = useNavigate();

  const steps = useMemo(
    () => [
      {
        label: "Encaminhamento",
        icon: <Reply />,
      },
    ],
    []
  );

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
        <Stepper steps={steps} />
        <Formik
          initialValues={{
            patientId: null,
            medicalExperience: "",
            forwardReason: "",
          }}
        >
          {() => (
            <Grid container>
              {activeStep === 0 && <ForwardForm />}
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
                    onClick={() => navigate("/encaminhamentos")}
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

export default CreateForward;
