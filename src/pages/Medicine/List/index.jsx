import {
  Box,
  Button,
  Grid,
  InputAdornment,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TextField,
} from "@mui/material";
import { FilterList, Search } from "@mui/icons-material";

import PageLayout from "../../../components/PageLayout";
import Text from "../../../components/Text";

import { StyledTableHead, StyledTableRow } from "./styles";

const MedicineList = () => {
  return (
    <PageLayout>
      <Text color="primary_blue" variant="large">
        Fármacos
      </Text>

      <Grid container>
        {/* Filter fields */}
        <Grid item container xs={12} md={10} spacing={2}>
          <Grid item xs={12} md={3}>
            <TextField
              placeholder="Buscar por nome"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              placeholder="Buscar por subgrupo"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              placeholder="Buscar por forma farmacêutica"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              placeholder="Buscar pelo Indicação"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
        {/* Action buttons */}
        <Grid item container xs={12} md={2}>
          <Grid item xs={12}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="flex-end"
              gap={1}
            >
              <Button startIcon={<FilterList />} variant="outlined">
                Filtrar
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <StyledTableHead>
                  <TableCell>Nome</TableCell>
                  <TableCell>Subgrupo farmacêutico</TableCell>
                  <TableCell>Forma farmacêutica</TableCell>
                  <TableCell>Concentração máxima</TableCell>
                  <TableCell>Indicação terapêutica simplificada</TableCell>
                </StyledTableHead>
              </TableHead>
              <TableBody>
                <StyledTableRow>
                  <TableCell component="td">Aceclofenaco</TableCell>
                  <TableCell component="td">
                    M02A - Produtos para dor articular e muscular de uso local
                  </TableCell>
                  <TableCell component="td">Creme dermatológico</TableCell>
                  <TableCell component="td">15 mg/g</TableCell>
                  <TableCell component="td">
                    Dor e inflamação do sistema musculoesquelético.
                  </TableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <Box display="flex" justifyContent="center">
        <Pagination count={10} color="secondary" />
      </Box>
    </PageLayout>
  );
};

export default MedicineList;
