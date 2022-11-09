import { useMemo, useState } from "react";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { Button } from "@mui/material";
import {
  Person,
  AddLocation,
  MedicalInformation,
  ArrowRightAlt,
} from "@mui/icons-material";

import useAxios from "../../hooks/useAxios";
import { formatBody } from "../../helpers/formatter";

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
  const [loading, setLoading] = useState(false);

  const fieldsByStep = useMemo(
    () => ({
      0: ["name", "birthDate", "cpf", "nacionality", "gernder", "phone", "tel"],
      1: [
        "crf",
        "crfState",
        "email",
        "password",
        "passwordConfirmation",
        "professionalPhone",
      ],
      2: ["street", "cep", "number", "district", "complement", "state", "city"],
    }),
    []
  );

  const navigate = useNavigate();

  const api = useAxios();

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
    name: yup
      .string()
      .required("Nome é obrigatório")
      .matches(
        /^[a-z ,.'-áàâãéèêíïóôõöúç]+$/gi,
        "Informe o nome completo sem números"
      ),
    birthDate: yup
      .date()
      .typeError("Data no formato errado")
      .required("Data de nascimento é obrigatória"),
    cpf: yup
      .string()
      .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "CPF no formato errado")
      .required("CPF é obrigatório"),
    nacionality: yup.string().required("Nacionalidade é obrigatório"),
    gender: yup
      .mixed()
      .oneOf(["WOMAN", "MEN", "OTHER"], "Gênero errado")
      .required("Gênero é obrigatório"),
    tel: yup
      .string()
      .matches(/^\(\d{2}\)\d{4}-\d{4}$/, "Telefone no formato errado"),
    phone: yup
      .string()
      .matches(/^\(\d{2}\)\d{5}-\d{4}$/, "Celular no formato errado")
      .required("Celular é obrigatório"),
    professionalPhone: yup
      .string()
      .matches(
        /(^\(\d{2}\)\d{5}-\d{4}$|^\(\d{2}\)\d{4}-\d{4}$)/,
        "Celular profissional no formato errado"
      )
      .required("Celular profissional é obrigatório"),
    crf: yup
      .string()
      .required("CRF é obrigatório")
      .matches(/^\d{4}/, "O CRF só deve conter números. Ex: 1234"),
    crfState: yup.string().required("Estado do CRF é obrigatório"),
    email: yup
      .string()
      .required("Email é obrigatório")
      .email("Email incorreto"),
    password: yup
      .string()
      .required("Senha é obrigatória")
      .min(6, "Senha deve ter no mínimo 6 caracteres")
      .max(20, "Senha deve ter no máximo 20 caracteres"),
    passwordConfirmation: yup
      .string()
      .required("Confirmação de senha é obrigatória")
      .oneOf([yup.ref("password"), null], "Senhas não conferem"),
    street: yup.string().required("Rua é obrigatória"),
    cep: yup
      .string()
      .required("CEP é obrigatório")
      .matches(/^\d{5}-\d{3}/, "CEP incorreto"),
    number: yup.string().required("Número é obrigatório"),
    district: yup.string().required("Bairro é obrigatório"),
    complement: yup.string(),
    state: yup.string().required("Estado é obrigatório"),
    city: yup.string().required("Cidade é obrigatória"),
    logo: yup.mixed(),
  });

  const handleSubmit = async (values) => {
    const { logo, ...body } = formatBody(values, {
      numberFields: ["phone", "tel", "cep", "cpf", "professionalPhone"],
    });

    const formData = new FormData();

    formData.append("logo", logo);
    formData.append("json", JSON.stringify(body));

    try {
      setLoading(true);
      await api.post("/signup", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/entrar");
    } catch {
    } finally {
      setLoading(false);
    }
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
                professionalPhone: "",
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
                logo: undefined,
              }}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
              validateOnMount
            >
              {({ handleSubmit, errors }) => {
                const hasError = fieldsByStep[activeStep]
                  .map((field) => !!errors[field])
                  .some((error) => error);

                return (
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
                        <Button
                          color="error"
                          variant="outlined"
                          onClick={() => navigate("/entrar")}
                        >
                          Cancelar
                        </Button>
                      )}
                      <Button
                        disabled={loading || hasError}
                        endIcon={!isLastStep && <ArrowRightAlt />}
                        onClick={isLastStep ? handleSubmit : handleNextStep}
                      >
                        {isLastStep ? "Concluir" : "Continuar"}
                      </Button>
                    </ButtonsContainer>
                  </>
                );
              }}
            </Formik>
          </FormContainer>
        </FormWrapper>
      </Container>
    </PageLayout>
  );
};

export default NewAccount;
