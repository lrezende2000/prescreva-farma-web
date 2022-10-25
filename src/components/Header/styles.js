import styled, { css } from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  max-height: 130px;

  padding: 1rem 2rem 0;

  background-color: ${({ theme }) => theme.colors.primary_blue};

  @media screen and (max-width: 820px) {
    padding-bottom: 1rem;
  }
`;

export const UnloggedContainer = styled.div`
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: flex-start;

  img {
    height: 100%;
  }
`;

export const LoggedContainer = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  justify-content: space-between;
`;

export const HeaderWrapper = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  a {
    height: fit-content;
  }

  img {
    height: 60px;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  align-items: center;

  @media screen and (max-width: 820px) {
    p {
      display: none;
    }

    gap: 1rem;
  }

  @media screen and (min-width: 821px) {
    #menu-mobile {
      display: none;
    }
  }
`;

export const Divider = styled.div`
  width: 100%;
  height: 0px;

  border-top: 1px solid ${({ theme }) => theme.colors.quartiary_blue};

  opacity: 0.5;

  @media screen and (max-width: 820px) {
    display: none;
  }
`;

export const NavLinkContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: flex-start;
  align-items: flex-end;

  gap: 3rem;

  @media screen and (max-width: 820px) {
    display: none;
  }
`;

export const NavItem = styled.div`
  padding-bottom: calc(1rem - 4px);

  /* transition: 0.10ms ease-in; */

  ${({ active }) =>
    active &&
    css`
      border-bottom: 4px solid ${({ theme }) => theme.colors.quartiary_blue};
    `}

  :hover {
    border-bottom: 4px solid ${({ theme }) => theme.colors.quartiary_blue};
  }
`;
