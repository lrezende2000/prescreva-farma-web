import { Button, TextField } from "@mui/material";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";

import { api } from "../../services/api";

import Text from "../../components/Text";

import { Container, LoginWrapper, LoginForm, LogoWrapper } from "./styles";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const validationSchema = yup.object().shape({
    login: yup
      .string()
      .email("Email incorreto")
      .required("Email é obrigatório"),
  });

  const handleToggleSubmit = async (values) => {
    try {
      const { data } = await api.post("/forgotPassword", values, {
        withCredentials: false,
      });

      toast.success(data.message);
      navigate("/entrar", { replace: true });
    } catch (err) {
      toast.error(err.response?.data.message);
    }
  };

  return (
    <Container>
      <LoginWrapper>
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
            Esqueci minha senha
          </Text>
          <Formik
            initialValues={{ login: "" }}
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
              <>
                <TextField
                  fullWidth
                  label="E-mail"
                  placeholder="Informe o seu e-mail"
                  value={values.login}
                  onChange={(e) => setFieldValue("login", e.target.value)}
                  onFocus={() => setFieldTouched("login", true)}
                  error={touched.login && !!errors.login}
                  helperText={touched.login && errors.login}
                />
                <Link to="/entrar" style={{ width: "100%" }}>
                  <Button variant="outlined" fullWidth>
                    <Text color="primary_blue" fontWeight={700}>
                      Voltar
                    </Text>
                  </Button>
                </Link>
                <Button fullWidth onClick={handleSubmit}>
                  <Text color="white" fontWeight={700}>
                    Recuperar senha
                  </Text>
                </Button>
              </>
            )}
          </Formik>
        </LoginForm>
      </LoginWrapper>
      <LogoWrapper>
        <img src="/assets/logo/white.png" alt="Prescreva Farma Logo" />
      </LogoWrapper>
    </Container>
  );
};
export default ForgotPassword;
