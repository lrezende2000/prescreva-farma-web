import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Text from "../../../components/Text";
import { theme } from "../../../global/theme";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;

  border: 1px solid ${({ theme }) => theme.colors.secondary_blue};
  border-radius: 8px;

  padding: 1rem;
  max-width: 250px;
  width: 100%;

  transition: 0.1s ease-in;

  cursor: pointer;

  :hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

const Item = ({ Icon, label, link }) => {
  const navigate = useNavigate();

  return (
    <Container onClick={() => navigate(link)}>
      <Icon fontSize="large" sx={{ color: theme.colors.secondary_blue }} />
      <Text variant="medium" fontWeight={700}>{label}</Text>
    </Container>
  );
};

export default Item;
