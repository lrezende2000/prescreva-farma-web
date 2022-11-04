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
import { Add, CalendarMonth, FilterList, MoreVert } from "@mui/icons-material";

import useAxios from "../../../hooks/useAxios";
import { formatUrlQuery } from "../../../helpers/formatter";

import PageLayout from "../../../components/PageLayout";
import Text from "../../../components/Text";
import PatientAutocomplete from "../../../components/PatientAutocomplete";

import { StyledTableHead, StyledTableRow } from "./styles";

const AppointmentList = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [filters, setFilters] = useState({
    patientId: undefined,
    date: "",
  });
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(1);

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
      const url = formatUrlQuery("/appointment/list", { ...filters, page });

      const { data } = await api.get(url);

      setRows(data.rows);
      setTotalRows(data.totalRows);
    } catch (err) {
      setRows([]);
      setTotalRows(0);
    } finally {
      setLoading(false);
    }
  }, [page, filters]);

  const formatAppointmentTime = (start, end) => {
    const day = moment(start).format("DD/MM/YYYY HH:mm");

    return `${day} - ${moment(end).format("HH:mm")}`;
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
        Consultas
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
              <Button
                disabled={loading}
                onClick={fetchRows}
                startIcon={<FilterList />}
                variant="outlined"
              >
                Filtrar
              </Button>
              <Button startIcon={<Add />} onClick={() => navigate("novo")}>
                Agendar consulta
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
                  <TableCell>Data da consulta</TableCell>
                  <TableCell align="right">Ações</TableCell>
                </StyledTableHead>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.id}>
                    <TableCell component="td">{row.id}</TableCell>
                    <TableCell component="td">{row.patient.name}</TableCell>
                    <TableCell component="td">
                      {formatAppointmentTime(row.start, row.end)}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
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
          <MenuItem>
            <Text>Editar</Text>
          </MenuItem>
        </Menu>
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

export default AppointmentList;
