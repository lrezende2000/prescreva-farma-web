import { useCallback, useEffect, useMemo, useState } from "react";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Chip,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
} from "@mui/material";
import { Add, FilterList, MoreVert } from "@mui/icons-material";

import useAxios from "../../../hooks/useAxios";
import { formatUrlQuery } from "../../../helpers/formatter";

import PageLayout from "../../../components/PageLayout";
import Text from "../../../components/Text";
import MedicineAutocomplete from "../components/MedicineAutocomplete";
import PatientAutocomplete from "../../../components/PatientAutocomplete";
import DeleteDialog from "../../../components/DeleteDialog";
import AvaliationModal from "../../../components/AvaliationModal";

import { StyledTableHead, StyledTableRow } from "./styles";
import { toast } from "react-toastify";

const PrescriptionList = () => {
  const location = useLocation();

  const lastAvaliation = localStorage.getItem("@prescreva:lastAvaliation");

  const [anchorEl, setAnchorEl] = useState(null);
  const [filters, setFilters] = useState({
    medicines: [],
    patientId: undefined,
  });
  const [loading, setLoading] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAvaliation, setOpenAvaliation] = useState(
    (location?.state?.openAvaliation && !lastAvaliation) ||
      (location?.state?.openAvaliation &&
        moment(lastAvaliation).diff(moment(), "days") > 1) ||
      false
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
      const url = formatUrlQuery("/prescription/list", {
        ...filters,
        medicines: filters.medicines.join(","),
        page,
      });

      const { data } = await api.get(url);

      setRows(data.rows);
      setTotalRows(data.totalRows);

      if (data.totalRows === 0) {
        toast.warn("N??o foi encontrado nenhum registro");
      }
    } catch (err) {
      setRows([]);
      setTotalRows(0);
    } finally {
      setLoading(false);
    }
  }, [page, filters]);

  const handleDeletePrescription = async () => {
    try {
      await api.delete(`/prescription/${anchorEl?.id}`);

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
        Prescri????es
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
            <MedicineAutocomplete
              onChange={(medicines) =>
                handleChangeFilter(
                  "medicines",
                  medicines.map((medicine) => medicine.id)
                )
              }
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
                Realizar prescri????o
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
                  <TableCell>F??rmacos</TableCell>
                  <TableCell>Data de prescri????o</TableCell>
                  <TableCell align="right">A????es</TableCell>
                </StyledTableHead>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.id}>
                    <TableCell component="td">{row.id}</TableCell>
                    <TableCell component="td">{row.patient.name}</TableCell>
                    <TableCell component="td">
                      {row.prescriptionMedicines.map((prescriptionMedicine) => (
                        <Chip
                          size="small"
                          key={prescriptionMedicine.medicine.name}
                          label={prescriptionMedicine.medicine.name}
                        />
                      ))}
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
            href={`prescricao/ver/${anchorEl?.id}`}
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
        title="Tem certeza que deseja deletar a prescri????o?"
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirmDelete={handleDeletePrescription}
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

export default PrescriptionList;
