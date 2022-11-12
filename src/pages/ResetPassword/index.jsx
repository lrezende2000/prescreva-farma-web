import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import {
  Box,
  Button,
} from "@mui/material";

import { api } from "../../services/api";

import Text from "../../components/Text";

import {
  Container,
  LoginWrapper,
  LoginForm,
  LogoWrapper,
  StyledLink,
} from "./styles";
import PasswordInput from "../../components/PasswordInput";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [params] = useSearchParams();
  const token = params.get("token");

  const validationSchema = yup
    .object()
    .shape({
      newPassword: yup
        .string()
        .min(6, "Senha deve ter no mínimo 6 caracteres")
        .required("Senha é obrigatória"),
      newPasswordConfirmation: yup
        .string()
        .required("Confirmação de senha é obrigatória")
        .oneOf([yup.ref("newPassword"), null], "Senhas não conferem"),
    })
    .noUnknown();

  const handleToggleSubmit = async (values) => {
    try {
      const { data } = await api.post("/resetPassword", values, {
        headers: {
          Authorization: `Bearer ${token || ""}`,
        },
        withCredentials: false,
      });

      toast.success(data.message);
      navigate("/entrar", { replace: true });
    } catch (err) {
      toast.error(err.response?.data.message);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/entrar");
    }
  }, [token]);

  return (
    <Container>
      <LoginWrapper>
        <Formik
          initialValues={{
            newPassword: "",
            showNewPassword: false,
            newPasswordConfirmation: "",
            showPasswordConfirmation: false,
          }}
          validationSchema={validationSchema}
          onSubmit={handleToggleSubmit}
        >
          {({
            values,
            setFieldValue,
            handleSubmit,
            errors,
            isValid,
            touched,
            setFieldTouched,
          }) => (
            <LoginForm>
              <img
                src="/assets/logo/blue.png"
                alt="Prescreva Farma Logo"
                height={150}
              />
              <Text variant="large" color="primary_blue">
                PrescrevaFarma
              </Text>
              <Text variant="medium" fontWeight={700}>
                Alterar senha
              </Text>
              <PasswordInput
                label="Nova senha"
                value={values.newPassword}
                isError={touched.newPassword && !!errors.newPassword}
                error={touched.newPassword && errors.newPassword}
                onChange={(value) => setFieldValue("newPassword", value)}
                onFocus={() => setFieldTouched("newPassword", true)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
              />
              <PasswordInput
                label="Confirme sua senha"
                value={values.newPasswordConfirmation}
                isError={
                  touched.newPasswordConfirmation &&
                  !!errors.newPasswordConfirmation
                }
                error={
                  touched.newPasswordConfirmation &&
                  errors.newPasswordConfirmation
                }
                onChange={(value) =>
                  setFieldValue("newPasswordConfirmation", value)
                }
                onFocus={() => setFieldTouched("newPasswordConfirmation", true)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
              />
              <StyledLink to={"/entrar"}>
                <Text>Já tem login?</Text>
              </StyledLink>
              <Box>
                <Button disabled={!isValid} onClick={handleSubmit}>
                  Alterar senha
                </Button>
              </Box>
            </LoginForm>
          )}
        </Formik>
      </LoginWrapper>
      <LogoWrapper>
        <img src="/assets/logo/white.png" alt="Prescreva Farma Logo" />
      </LogoWrapper>
    </Container>
  );
};
export default ResetPassword;
