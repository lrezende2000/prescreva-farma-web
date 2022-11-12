import { useCallback, useEffect, useMemo, useState } from "react";
import { FilterList, Search } from "@mui/icons-material";
import {
  Button,
  Grid,
  InputAdornment,
  Modal,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TextField,
  Box,
  CircularProgress,
} from "@mui/material";

import useAxios from "../../../../hooks/useAxios";
import { formatUrlQuery } from "../../../../helpers/formatter";

import { StyledTableHead, StyledTableRow } from "./styles";

const MedicinesSearch = ({ open, onClose }) => {
  const [rows, setRows] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    name: "",
    subGroup: "",
    pharmaceuticalForm: "",
    therapeuticIndication: "",
  });
  const [loading, setLoading] = useState(false);

  const pageCount = useMemo(() => Math.ceil(totalRows / 15), [totalRows]);

  const handleChangeFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const api = useAxios();

  const fetchRows = useCallback(async () => {
    try {
      setLoading(true);
      const url = formatUrlQuery("/medicines/list", { ...filters, page });

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

  useEffect(() => {
    fetchRows();
  }, [page]);

  useEffect(() => {
    setPage(1);
  }, [totalRows]);

  if (loading) {
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box
        maxWidth={800}
        sx={{ backgroundColor: "white" }}
        p={2}
        pt={5}
        marginX={3}
        height="100%"
        maxHeight="90vh"
        margin
        overflow="scroll"
        display="flex"
        flexDirection="column"
        gap={2}
        borderRadius={1}
      >
        <Grid container spacing={2}>
          {/* Filter fields */}
          <Grid item container xs={12} md={12} spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Nome"
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
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Subgrupo"
                value={filters.subGroup}
                onChange={(e) => handleChangeFilter("subGroup", e.target.value)}
                placeholder="Buscar por subgrupo"
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
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Forma farmacêutica"
                value={filters.pharmaceuticalForm}
                onChange={(e) =>
                  handleChangeFilter("pharmaceuticalForm", e.target.value)
                }
                placeholder="Buscar por forma farmacêutica"
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
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                label="Indicação"
                value={filters.therapeuticIndication}
                onChange={(e) =>
                  handleChangeFilter("therapeuticIndication", e.target.value)
                }
                placeholder="Buscar pelo Indicação"
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
          <Grid item container xs={12}>
            <Grid item xs={12}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="flex-end"
                gap={1}
              >
                <Button
                  disabled={loading}
                  startIcon={<FilterList />}
                  variant="outlined"
                  onClick={() => fetchRows()}
                >
                  Filtrar
                </Button>
              </Box>
            </Grid>
          </Grid>
          {loading && (
            <Grid item xs={12}>
              <CircularProgress size={20} />
            </Grid>
          )}
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
                  {rows.map((row) => (
                    <StyledTableRow key={row.id}>
                      <TableCell component="td">{row.name}</TableCell>
                      <TableCell component="td">{row.subGroup}</TableCell>
                      <TableCell component="td">
                        {row.pharmaceuticalForm}
                      </TableCell>
                      <TableCell component="td">{row.maximumDosage}</TableCell>
                      <TableCell component="td">
                        {row.therapeuticIndication}
                      </TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="center">
          <Pagination
            page={page}
            count={pageCount}
            color="secondary"
            onChange={(_, value) => setPage(value)}
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default MedicinesSearch;
