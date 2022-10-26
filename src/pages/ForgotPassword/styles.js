import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

export const LoginWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LoginForm = styled.form`
  width: 100%;
  max-width: 400px;
  padding: 0 1rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const LogoWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${({ theme }) => theme.colors.primary_blue};

  img {
    width: 100%;
    max-width: 400px;
  }

  @media screen and (max-width: 900px) {
    display: none;
  }
`;
