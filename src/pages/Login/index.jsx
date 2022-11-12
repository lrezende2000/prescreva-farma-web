import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { Button, TextField } from "@mui/material";
import * as yup from "yup";

import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";

import Text from "../../components/Text";

import {
  Container,
  LoginWrapper,
  LoginForm,
  LogoWrapper,
  StyledLink,
} from "./styles";
import PasswordInput from "../../components/PasswordInput";
import { toast } from "react-toastify";

const Login = () => {
  const [loading, setLoading] = useState(false);

  const { updateUser } = useAuth();

  const navigate = useNavigate();

  const location = useLocation();

  const api = useAxios();

  const validationSchema = yup.object().shape({
    login: yup
      .string()
      .required("Email é obrigatório")
      .email("Email no formato errado"),
    password: yup.string().required("Senha é obrigatória"),
  });

  const handleToggleSubmit = async (values) => {
    try {
      setLoading(true);
      const { data } = await api.post("/login", values);

      updateUser(data.user);

      toast.success(data.message);
      navigate(location.state?.from?.pathname || "/inicio", { replace: true });
    } catch (err) {
      console.log(err)
      toast.error(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container>
      <LoginWrapper>
        <Formik
          initialValues={{ login: "", password: "" }}
          onSubmit={handleToggleSubmit}
          validationSchema={validationSchema}
        >
          {({
            values,
            setFieldValue,
            handleSubmit,
            errors,
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
                Entrar
              </Text>
              <TextField
                fullWidth
                size="small"
                error={touched.login && !!errors.login}
                helperText={touched.login && errors.login}
                label="E-mail"
                placeholder="Informe o seu e-mail"
                variant="outlined"
                value={values.login}
                onChange={(e) => setFieldValue("login", e.target.value)}
                onFocus={() => setFieldTouched("login", true)}
              />
              <PasswordInput
                label="Senha"
                value={values.password}
                isError={touched.password && !!errors.password}
                error={touched.password && errors.password}
                onChange={(value) => setFieldValue("password", value)}
                onFocus={() => setFieldTouched("password", true)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSubmit();
                  }
                }}
                placeholder="Informe sua senha"
              />
              <Text fontWeight={700}>
                <StyledLink to="/esqueci-senha">Esqueci minha senha</StyledLink>
              </Text>
              {/* <Text>
                Não tem uma conta?{" "}
                <StyledLink to="/criar-conta">Clique aqui</StyledLink>
              </Text> */}
              <Button
                fullWidth
                disabled={loading}
                type="submit"
                onClick={handleSubmit}
              >
                <Text color="white" fontWeight={700}>
                  Entrar
                </Text>
              </Button>
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
export default Login;
