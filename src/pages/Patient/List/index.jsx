import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import {
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
import { Add, FilterList, MoreVert, Search } from "@mui/icons-material";

import { maskCpf } from "../../../helpers/mask";
import {
  formatAppointmentTime,
  formatUrlQuery,
} from "../../../helpers/formatter";
import useAxios from "../../../hooks/useAxios";

import PageLayout from "../../../components/PageLayout";
import Text from "../../../components/Text";

import { StyledTableHead, StyledTableRow } from "./styles";
import DeleteDialog from "../../../components/DeleteDialog";

const PatientList = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [filters, setFilters] = useState({
    name: "",
    cpf: "",
  });
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);

  const navigate = useNavigate();

  const api = useAxios();

  const open = Boolean(anchorEl);

  const pageCount = useMemo(() => Math.ceil(totalRows / 15), [totalRows]);

  const handleChangeFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const fetchRows = useCallback(async () => {
    try {
      setLoading(true);
      const url = formatUrlQuery("/patient/list", { ...filters, page });

      const { data } = await api.get(url);

      console.log(data.rows);

      setRows(data.rows);
      setTotalRows(data.totalRows);
    } catch (err) {
      setRows([]);
      setTotalRows(0);
    } finally {
      setLoading(false);
    }
  }, [page, filters]);

  const handleDeletePatient = async () => {
    try {
      await api.delete(`/patient/${anchorEl?.id}`);

      setOpenDelete(false);
      setAnchorEl(null);

      fetchRows();
    } catch {}
  };

  useEffect(() => {
    fetchRows();
  }, [page]);

  useEffect(() => {
    setPage(1);
  }, [totalRows]);

  return (
    <PageLayout>
      <Text color="primary_blue" variant="large">
        Pacientes
      </Text>

      <Grid container spacing={2}>
        {/* Filter fields */}
        <Grid item container xs={12} lg={8} spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              value={filters.name}
              onChange={(e) => handleChangeFilter("name", e.target.value)}
              placeholder="Buscar por nome"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="primary" />
                  </InputAdornment>
                ),
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  fetchRows();
                }
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              placeholder="Buscar por CPF"
              value={filters.cpf}
              onChange={(e) => handleChangeFilter("cpf", e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="primary" />
                  </InputAdornment>
                ),
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  fetchRows();
                }
              }}
            />
          </Grid>
        </Grid>
        {/* Action buttons */}
        <Grid item container xs={12} lg={4}>
          <Grid item xs={12}>
            <Box
              display="flex"
              flexDirection={["column", "row"]}
              alignItems={["unset", "center"]}
              justifyContent="flex-end"
              gap={1}
            >
              <Button
                startIcon={<FilterList />}
                variant="outlined"
                disabled={loading}
                onClick={fetchRows}
              >
                Filtrar
              </Button>
              <Button startIcon={<Add />} onClick={() => navigate("novo")}>
                Cadastrar paciente
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
                  <TableCell>Nome</TableCell>
                  <TableCell>CPF</TableCell>
                  <TableCell>Idade</TableCell>
                  <TableCell align="center">Próxima consulta</TableCell>
                  <TableCell align="right">Ações</TableCell>
                </StyledTableHead>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.id} id={row.id}>
                    <TableCell component="td">{row.id}</TableCell>
                    <TableCell component="td">{row.name}</TableCell>
                    <TableCell component="td">{maskCpf(row.cpf)}</TableCell>
                    <TableCell component="td">
                      {moment().diff(moment(row.birthDate), "years")}
                    </TableCell>
                    <TableCell component="td" align="center">
                      {row.appointments?.length
                        ? formatAppointmentTime(
                            row.appointments[0].start,
                            row.appointments[0].end
                          )
                        : "-"}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        id={row.id}
                        onClick={(e) => setAnchorEl(e.currentTarget)}
                      >
                        <MoreVert color="primary" />
                      </IconButton>
                    </TableCell>
                  </StyledTableRow>
                ))}
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
          <MenuItem onClick={() => navigate(`editar/${anchorEl?.id}`)}>
            <Text>Editar</Text>
          </MenuItem>
          <MenuItem>
            <Text>Realizar prescrição</Text>
          </MenuItem>
          <MenuItem>
            <Text>Realizar encaminhamento</Text>
          </MenuItem>
          <MenuItem onClick={() => setOpenDelete(true)}>
            <Text color="error">Deletar</Text>
          </MenuItem>
        </Menu>
        <DeleteDialog
          title="Tem certeza que deseja deletar o paciente?"
          open={openDelete}
          onClose={() => setOpenDelete(false)}
          onConfirmDelete={handleDeletePatient}
        />
      </Grid>
      <Box display="flex" justifyContent="center">
        <Pagination
          page={page}
          count={pageCount}
          color="secondary"
          onChange={(_, value) => setPage(value)}
        />
      </Box>
    </PageLayout>
  );
};

export default PatientList;
