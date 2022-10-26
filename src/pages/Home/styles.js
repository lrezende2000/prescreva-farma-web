import styled from "styled-components";

export const ItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;

  @media screen and (max-width: 820px) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (max-width: 720px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 500px) {
    display: grid;
    grid-template-columns: 1fr;
  }
`;
