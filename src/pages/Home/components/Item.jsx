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

  width: 100%;
  max-width: 250px;
  padding: 1rem;

  transition: 0.1s ease-in;

  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);

  cursor: pointer;

  :hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  @media screen and (max-width: 820px) {
    max-width: unset;
    width: unset;
  }
`;

const Item = ({ Icon, label, link }) => {
  const navigate = useNavigate();

  return (
    <Container onClick={() => navigate(link)}>
      <Icon fontSize="large" sx={{ color: theme.colors.secondary_blue }} />
      <Text variant="medium" fontWeight={700}>
        {label}
      </Text>
    </Container>
  );
};

export default Item;
