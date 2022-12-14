import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  /* height: 100%; */

  display: flex;
  flex-direction: column;
`;

export const PageWrapper = styled.div`
  width: 100%;
  /* height: 100%; */

  padding: 3rem 2rem 1rem;

  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media screen and (max-width: 400px) {
    padding: 2rem 1rem 1rem;
  }
`;