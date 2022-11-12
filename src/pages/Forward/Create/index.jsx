import { useState, useMemo } from "react";
import * as yup from "yup";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Formik } from "formik";
import { Button, Grid } from "@mui/material";
import { ArrowRightAlt, Preview, Reply } from "@mui/icons-material";

import PageLayout from "../../../components/PageLayout";
import Stepper from "../../../components/Stepper";
import ForwardForm from "../components/forms/ForwardForm";

import { Container } from "./styles";
import { formatBody } from "../../../helpers/formatter";
import useAxios from "../../../hooks/useAxios";
import { toast } from "react-toastify";
import PreviewForward from "../components/PreviewForward";

const CreateForward = () => {
  const [activeStep, setActiveStep] = useState(0);

  const navigate = useNavigate();

  const api = useAxios();

  const [searchParams] = useSearchParams();

  const steps = useMemo(
    () => [
      {
        label: "Encaminhamento",
        icon: <Reply />,
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
      0: ["patientId", "medicalExperience", "forwardReason"],
      1: [""],
    }),
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

  const validationSchema = yup.object().shape({
    patientId: yup
      .number()
      .integer()
      .required("Paciente é obrigatório")
      .typeError("Paciente é obrigatório"),
    medicalExperience: yup
      .string()
      .required("Espacialidade é obrigatória")
      .typeError("Espacialidade é obrigatória"),
    forwardReason: yup
      .string()
      .required("Motivo de encaminhamento é obrigatório"),
    showFooter: yup.boolean(),
  });

  const handleToggleSubmit = async (values) => {
    try {
      const { data } = await api.post("/forward/", formatBody(values));

      toast.success(data.message);
      navigate("/encaminhamentos", { state: { openAvaliation: true } });
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <PageLayout>
      <Container>
        <Stepper steps={steps} activeStep={activeStep} />
        <Formik
          initialValues={{
            patientId: searchParams.get("patientId")
              ? parseInt(searchParams.get("patientId"))
              : null,
            medicalExperience: "",
            forwardReason: "",
            showFooter: false,
          }}
          validationSchema={validationSchema}
          onSubmit={handleToggleSubmit}
          validateOnMount
        >
          {({ handleSubmit, isSubmitting, errors, values }) => {
            const hasError = fieldsByStep[activeStep]
              .map((field) => !!errors[field])
              .some((error) => error);

            return (
              <Grid container>
                {activeStep === 0 && <ForwardForm />}
                {activeStep === 1 && <PreviewForward values={values} />}
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

export default CreateForward;
