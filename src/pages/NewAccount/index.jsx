import { useState } from "react";
import { Formik } from "formik";
import { Button } from "@mui/material";
import {
  Person,
  AddLocation,
  MedicalInformation,
  ArrowRightAlt,
} from "@mui/icons-material";

import { api } from "../../services/api";
import { formartBody } from "../../helpers/formatter";

import PageLayout from "../../components/PageLayout";
import Stepper from "../../components/Stepper";
import PersonalDetails from "./steps/PersonalDetails";
import ProfessionalDetails from "./steps/ProfessionalDetails";
import ProfessionalAddress from "./steps/ProfessionalAddress";

import {
  ButtonsContainer,
  Container,
  FormContainer,
  FormWrapper,
} from "./styles";

const steps = [
  {
    label: "Dados Pessoais",
    icon: <Person />,
  },
  {
    label: "Dados profissionais",
    icon: <MedicalInformation />,
  },
  {
    label: "Endereço profissional",
    icon: <AddLocation />,
  },
];

const NewAccount = () => {
  const [activeStep, setActiveStep] = useState(0);

  const isFirstStep = activeStep === 0;
  const isLastStep = activeStep === steps.length - 1;

  const handleNextStep = () => {
    const maxStep = steps.length - 1;

    setActiveStep((prev) => (prev >= maxStep ? maxStep : prev + 1));
  };

  const handlePrevStep = () => {
    setActiveStep((prev) => (prev <= 0 ? 0 : prev - 1));
  };

  const handleSubmit = async (values) => {
    const body = formartBody(values, {
      numberFields: ["phone", "tel", "cep", "cpf"],
    });

    await api.post("/signup", body);
  };

  return (
    <PageLayout>
      <Container>
        <FormWrapper>
          <FormContainer>
            <Stepper steps={steps} activeStep={activeStep} />
            <Formik
              initialValues={{
                name: "",
                birthDate: "",
                cpf: "",
                nacionality: "",
                gender: "",
                phone: "",
                tel: "",
                crf: "",
                crfState: "",
                email: "",
                password: "",
                passwordConfirmation: "",
                street: "",
                cep: "",
                number: "",
                district: "",
                complement: "",
                state: "",
                city: "",
              }}
              onSubmit={handleSubmit}
            >
              {({ handleSubmit }) => (
                <>
                  {activeStep === 0 && <PersonalDetails />}
                  {activeStep === 1 && <ProfessionalDetails />}
                  {activeStep === 2 && <ProfessionalAddress />}
                  <ButtonsContainer>
                    {!isFirstStep ? (
                      <Button variant="outlined" onClick={handlePrevStep}>
                        Voltar
                      </Button>
                    ) : (
                      <div />
                    )}
                    <Button
                      endIcon={!isLastStep && <ArrowRightAlt />}
                      onClick={isLastStep ? handleSubmit : handleNextStep}
                    >
                      {isLastStep ? "Concluir" : "Continuar"}
                    </Button>
                  </ButtonsContainer>
                </>
              )}
            </Formik>
          </FormContainer>
        </FormWrapper>
      </Container>
    </PageLayout>
  );
};

export default NewAccount;
