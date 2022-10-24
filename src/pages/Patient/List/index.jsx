import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import PageLayout from "../../../components/PageLayout";
import Text from "../../../components/Text";

import { StyledTableHead, StyledTableRow } from "./styles";

const PatientList = () => {
  return (
    <PageLayout>
      <Text color="primary_blue" variant="large">
        Pacientes
      </Text>

      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{marginBottom: 1}}>
            <StyledTableHead sx={{marginBottom: 1}}>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>CPF</TableCell>
              <TableCell>Idade</TableCell>
              <TableCell>Próxima consulta</TableCell>
              <TableCell>Score</TableCell>
              <TableCell align="right">Ações</TableCell>
            </StyledTableHead>
          </TableHead>
          <TableBody>
            <StyledTableRow>
              <TableCell>1</TableCell>
              <TableCell>tdafsdf</TableCell>
              <TableCell>23434343</TableCell>
              <TableCell>23</TableCell>
              <TableCell>23/12/1222</TableCell>
              <TableCell>10</TableCell>
              <TableCell align="right">.</TableCell>
            </StyledTableRow>
            <StyledTableRow>
              <TableCell>1</TableCell>
              <TableCell>tdafsdf</TableCell>
              <TableCell>23434343</TableCell>
              <TableCell>23</TableCell>
              <TableCell>23/12/1222</TableCell>
              <TableCell>10</TableCell>
              <TableCell align="right">.</TableCell>
            </StyledTableRow>
            <StyledTableRow>
              <TableCell>1</TableCell>
              <TableCell>tdafsdf</TableCell>
              <TableCell>23434343</TableCell>
              <TableCell>23</TableCell>
              <TableCell>23/12/1222</TableCell>
              <TableCell>10</TableCell>
              <TableCell align="right">.</TableCell>
            </StyledTableRow>
            <StyledTableRow>
              <TableCell>1</TableCell>
              <TableCell>tdafsdf</TableCell>
              <TableCell>23434343</TableCell>
              <TableCell>23</TableCell>
              <TableCell>23/12/1222</TableCell>
              <TableCell>10</TableCell>
              <TableCell align="right">.</TableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </PageLayout>
  );
};

export default PatientList;
