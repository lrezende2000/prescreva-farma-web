import { Header } from "../Header";

import { Container, PageWrapper } from "./styles";

const PageLayout = ({ children }) => {
  return (
    <Container>
      <Header />
      <PageWrapper>{children}</PageWrapper>
    </Container>
  );
};

export default PageLayout;
