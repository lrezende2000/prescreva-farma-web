import { Button, TextField } from "@mui/material";

import Text from "../../components/Text";

import {
  Container,
  LoginWrapper,
  LoginForm,
  LogoWrapper,
  StyledLink,
} from "./styles";

const Login = () => {
  return (
    <Container>
      <LoginWrapper>
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
            size="small"
            fullWidth
            label="E-mail"
            placeholder="Informe o seu e-mail"
            variant="outlined"
          />
          <TextField
            size="small"
            fullWidth
            label="Senha"
            placeholder="Informe sua senha"
            variant="outlined"
          />
          <Text fontWeight={700}>
            <StyledLink to="/esqueci-senha">Esqueci minha senha</StyledLink>
          </Text>
          <Text>
            Não tem uma conta?{" "}
            <StyledLink to="/criar-conta">Clique aqui</StyledLink>
          </Text>
          <Button type="submit" fullWidth>
            <Text color="white" fontWeight={700}>
              Entrar
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
export default Login;
