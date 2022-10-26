import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { Button, TextField } from "@mui/material";

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

const Login = () => {
  const [loading, setLoading] = useState(false);

  const { updateUser } = useAuth();

  const navigate = useNavigate();

  const location = useLocation();

  const api = useAxios();

  const handleToggleSubmit = async (values) => {
    try {
      setLoading(true);
      const { data } = await api.post("/login", values, {
        withCredentials: true,
      });

      updateUser(data.user);

      navigate(location.state?.from?.pathname || "/home", { replace: true });
    } catch (err) {
      console.log(err.message);
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
        >
          {({ values, setFieldValue, handleSubmit, errors }) => (
            <LoginForm>
              <Text variant="large" color="primary_blue">
                PrescrevaFarma
              </Text>
              <Text variant="medium" fontWeight={700}>
                Entrar
              </Text>
              <Text variant="medium" fontWeight={100} textAlign="center">
                Loren ipsun loren ipsun loren ipsun loren ipsunloren ipsun
              </Text>
              <TextField
                fullWidth
                size="small"
                error={!!errors.login}
                helperText={errors.login}
                label="E-mail"
                placeholder="Informe o seu e-mail"
                variant="outlined"
                value={values.login}
                onChange={(e) => setFieldValue("login", e.target.value)}
              />
              <TextField
                fullWidth
                size="small"
                label="Senha"
                placeholder="Informe sua senha"
                variant="outlined"
                type="password"
                error={!!errors.password}
                helperText={errors.password}
                value={values.password}
                onChange={(e) => setFieldValue("password", e.target.value)}
              />
              <Text fontWeight={700}>
                <StyledLink to="/esqueci-senha">Esqueci minha senha</StyledLink>
              </Text>
              <Text>
                Não tem uma conta?{" "}
                <StyledLink to="/criar-conta">Clique aqui</StyledLink>
              </Text>
              <Button fullWidth disabled={loading} onClick={handleSubmit}>
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
