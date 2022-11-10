import styled from "styled-components";
import { TableRow } from "@mui/material";

export const StyledTableHead = styled(TableRow)`
  background-color: ${({ theme }) => theme.colors.tertiary_blue};
`;

export const StyledTableRow = styled(TableRow)`
  &:last-child td,
  &:last-child th {
    border: 0;
  }
`;
