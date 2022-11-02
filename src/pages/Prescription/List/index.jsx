import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TextField,
} from "@mui/material";
import {
  Add,
  CalendarMonth,
  FilterList,
  MoreVert,
  Search,
} from "@mui/icons-material";

import PageLayout from "../../../components/PageLayout";
import Text from "../../../components/Text";

import { StyledTableHead, StyledTableRow } from "./styles";
import MedicineAutocomplete from "../components/MedicineAutocomplete";
import PatientAutocomplete from "../../../components/PatientAutocomplete";

const PrescriptionList = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [filters, setFilters] = useState({
    medicines: [],
    patientId: undefined,
  });

  const navigate = useNavigate();

  const open = Boolean(anchorEl);

  const handleChangeFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <PageLayout>
      <Text color="primary_blue" variant="large">
        Prescrições
      </Text>

      <Grid container>
        {/* Filter fields */}
        <Grid item container xs={12} md={8} spacing={2}>
          <Grid item xs={12} md={4}>
            <PatientAutocomplete
              onChange={(patient) =>
                handleChangeFilter("patientId", patient?.id || undefined)
              }
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <MedicineAutocomplete
              onChange={(medicines) =>
                handleChangeFilter(
                  "medicines",
                  medicines.map((medicine) => medicine.id)
                )
              }
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              placeholder="Buscar por data"
              type="date"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CalendarMonth color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
        {/* Action buttons */}
        <Grid item container xs={12} md={4}>
          <Grid item xs={12}>
            <Box
              display="flex"
              flexDirection={["column", "row"]}
              alignItems={["unset", "center"]}
              justifyContent="flex-end"
              gap={1}
            >
              <Button startIcon={<FilterList />} variant="outlined">
                Filtrar
              </Button>
              <Button startIcon={<Add />} onClick={() => navigate("novo")}>
                Realizar prescrição
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
                  <TableCell>ID</TableCell>
                  <TableCell>Paciente</TableCell>
                  <TableCell>Fármacos</TableCell>
                  <TableCell>Data de prescrição</TableCell>
                  <TableCell align="right">Ações</TableCell>
                </StyledTableHead>
              </TableHead>
              <TableBody>
                <StyledTableRow>
                  <TableCell component="td">1</TableCell>
                  <TableCell component="td">Lucas Rezende</TableCell>
                  <TableCell component="td">Tylenol, Novalgina</TableCell>
                  <TableCell component="td">20/12/2022</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                      <MoreVert color="primary" />
                    </IconButton>
                  </TableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <TableCell component="td">2</TableCell>
                  <TableCell component="td">Arthur Porto</TableCell>
                  <TableCell component="td">Tylenol, Novalgina</TableCell>
                  <TableCell component="td">20/12/2022</TableCell>
                  <TableCell align="right">
                    <IconButton>
                      <MoreVert color="primary" />
                    </IconButton>
                  </TableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={() => setAnchorEl(null)}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem>
            <Text>Editar</Text>
          </MenuItem>
          <MenuItem>
            <Text>Imprimir</Text>
          </MenuItem>
          <MenuItem>
            <Text color="error">Deletar</Text>
          </MenuItem>
        </Menu>
      </Grid>
      <Box display="flex" justifyContent="center">
        <Pagination count={10} color="secondary" />
      </Box>
    </PageLayout>
  );
};

export default PrescriptionList;
