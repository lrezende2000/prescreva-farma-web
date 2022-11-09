import { useState, useMemo, useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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

import PageLayout from "../../../components/PageLayout";
import Text from "../../../components/Text";

import { StyledTableHead, StyledTableRow } from "./styles";
import { formatUrlQuery } from "../../../helpers/formatter";
import moment from "moment";
import DeleteDialog from "../../../components/DeleteDialog";
import PatientAutocomplete from "../../../components/PatientAutocomplete";
import AvaliationModal from "../../../components/AvaliationModal";

const ForwardList = () => {
  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState(null);
  const [filters, setFilters] = useState({
    patientId: undefined,
    date: "",
  });
  const [loading, setLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAvaliation, setOpenAvaliation] = useState(
    location?.state?.openAvaliation || false
  );
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
      const url = formatUrlQuery("/forward/list", {
        ...filters,
        page,
      });

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

  const handleDeleteForward = async () => {
    try {
      await api.delete(`/forward/${anchorEl?.id}`);

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
        Encaminhamentos
      </Text>

      <Grid container>
        {/* Filter fields */}
        <Grid item container xs={12} md={8} spacing={2}>
          <Grid item xs={12} md={4}>
            <PatientAutocomplete
              onChange={(patient) =>
                handleChangeFilter("patientId", patient?.id)
              }
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              type="date"
              onChange={(e) => handleChangeFilter("date", e.target.value)}
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
                startIcon={<FilterList />}
                disabled={loading}
                variant="outlined"
                onClick={fetchRows}
              >
                Filtrar
              </Button>
              <Button startIcon={<Add />} onClick={() => navigate("novo")}>
                Encaminhar
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
                  <TableCell>Especialista</TableCell>
                  <TableCell>Data do encaminhamento</TableCell>
                  <TableCell align="right">Ações</TableCell>
                </StyledTableHead>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.id}>
                    <TableCell component="td">{row.id}</TableCell>
                    <TableCell component="td">{row.patient.name}</TableCell>
                    <TableCell component="td">
                      {row.medicalExperience}
                    </TableCell>
                    <TableCell component="td">
                      {moment(row.createdAt).format("DD/MM/YYYY")}
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
          <a
            href={`/encaminhamentos/ver/${anchorEl?.id}`}
            target="_blank"
            rel="noreferrer"
          >
            <MenuItem>
              <Text>Imprimir</Text>
            </MenuItem>
          </a>
          <MenuItem onClick={() => setOpenDelete(true)}>
            <Text color="error">Deletar</Text>
          </MenuItem>
        </Menu>
      </Grid>
      <DeleteDialog
        title="Tem certeza que deseja remover o encaminhamento?"
        onClose={() => setOpenDelete(false)}
        open={openDelete}
        onConfirmDelete={handleDeleteForward}
      />
      <Box display="flex" justifyContent="center">
        <Pagination
          page={page}
          count={pageCount}
          color="secondary"
          onChange={(_, value) => setPage(value)}
        />
      </Box>
      <AvaliationModal
        open={openAvaliation}
        onClose={() => setOpenAvaliation(false)}
      />
    </PageLayout>
  );
};

export default ForwardList;
