import { Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";

import Text from "../../components/Text";

import { Container, LoginWrapper, LoginForm, LogoWrapper } from "./styles";

const ForgotPassword = () => {
  return (
    <Container>
      <LoginWrapper>
        <LoginForm>
          <Text variant="large" color="primary_blue">
            PrescrevaFarma
          </Text>
          <Text variant="medium" fontWeight={700}>
            Esqueci minha senha
          </Text>
          <TextField
            size="small"
            fullWidth
            label="E-mail"
            placeholder="Informe o seu e-mail"
            variant="outlined"
          />
          <Link to="/entrar" style={{ width: "100%" }}>
            <Button variant="outlined" fullWidth>
              <Text color="primary_blue" fontWeight={700}>
                Voltar
              </Text>
            </Button>
          </Link>
          <Button type="submit" fullWidth>
            <Text color="white" fontWeight={700}>
              Recuperar senha
            </Text>
          </Button>
        </LoginForm>
      </LoginWrapper>
      <LogoWrapper>
        <img src="/assets/logo/white.png" alt="Prescreva Farma Logo" />
      </LogoWrapper>
    </Container>
  );
};
export default ForgotPassword;
