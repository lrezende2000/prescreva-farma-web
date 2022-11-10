import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { Add, FilterList, Search } from "@mui/icons-material";

import useAxios from "../../../../hooks/useAxios";
import { formatUrlQuery } from "../../../../helpers/formatter";

import PageLayout from "../../../../components/PageLayout";
import Text from "../../../../components/Text";

import { StyledTableHead, StyledTableRow } from "./styles";

const UserList = () => {
  const [rows, setRows] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  const pageCount = useMemo(() => Math.ceil(totalRows / 15), [totalRows]);

  const handleChangeFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const api = useAxios();

  const navigate = useNavigate();

  const fetchRows = useCallback(async () => {
    try {
      setLoading(true);
      const url = formatUrlQuery("/user/list", { ...filters, page });

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
  return (
    <PageLayout>
      <Text color="primary_blue" variant="large">
        Usuários
      </Text>

      <Grid container>
        {/* Filter fields */}
        <Grid item container xs={12} md={8}>
          <Grid item xs={12} sm={6} md={4}>
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
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              label="Email"
              value={filters.email}
              onChange={(e) => handleChangeFilter("email", e.target.value)}
              placeholder="Buscar por email"
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
        <Grid item xs={12} md={4}>
          <Box
            display="flex"
            alignItems="center"
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
              Novo Usuário
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Grid container>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <StyledTableHead>
                  <TableCell>Nome</TableCell>
                  <TableCell>Email</TableCell>
                </StyledTableHead>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.id}>
                    <TableCell component="td">{row.name}</TableCell>
                    <TableCell component="td">{row.email}</TableCell>
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
    </PageLayout>
  );
};

export default UserList;
