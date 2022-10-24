import styled, { css } from "styled-components";
import { StepConnector, stepConnectorClasses } from "@mui/material";

export const StyledStepIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;

  z-index: 1;

  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.quartiary_blue};

  display: flex;
  align-items: center;
  justify-content: center;
  ${({ active, completed }) =>
    (active || completed) &&
    css`
      background-color: ${({ theme }) => theme.colors.secondary_blue};
    `}
`;

export const StyledStepConnector = styled(StepConnector)`
  &.${stepConnectorClasses.alternativeLabel} {
    top: 23.5px;
  }

  &.${stepConnectorClasses.active} {
    .${stepConnectorClasses.line} {
      background-color: ${({ theme }) => theme.colors.secondary_blue};
    }
  }

  &.${stepConnectorClasses.completed} {
    .${stepConnectorClasses.line} {
      background-color: ${({ theme }) => theme.colors.secondary_blue};
    }
  }

  & .${stepConnectorClasses.line} {
    height: 3px;
    border: 0px;
    background-color: ${({ theme }) => theme.colors.quartiary_blue};
    border-radius: 1px;
  }
`;
