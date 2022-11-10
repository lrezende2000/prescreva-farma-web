import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  Grid,
  Pagination,
  Paper,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
} from "@mui/material";
import { FilterList } from "@mui/icons-material";

import useAxios from "../../../../hooks/useAxios";
import { formatUrlQuery } from "../../../../helpers/formatter";

import PageLayout from "../../../../components/PageLayout";
import Text from "../../../../components/Text";
import UserAutocomplete from "../../components/UserAutocomplete";

import { StyledTableHead, StyledTableRow } from "./styles";

const AvaliationList = () => {
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    professionalId: undefined,
    grade: null,
  });

  const pageCount = useMemo(() => Math.ceil(totalRows / 15), [totalRows]);

  const api = useAxios();

  const handleChangeFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const fetchRows = useCallback(async () => {
    try {
      setLoading(true);
      const url = formatUrlQuery("/avaliation/", { ...filters, page });

      const { data } = await api.get(url);

      setRows(data.rows);
      setTotalRows(data.totalRows);
    } catch (err) {
      toast.error(err.response.data.message);
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
        Avaliações
      </Text>
      <Grid container>
        {/* Filter fields */}
        <Grid item container xs={12} md={8} spacing={4}>
          <Grid item xs={12} md={4}>
            <UserAutocomplete
              onChange={(user) =>
                handleChangeFilter("professionalId", user?.id)
              }
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Rating
              max={10}
              value={filters.grade}
              onChange={(_, newValue) => {
                handleChangeFilter("grade", newValue);
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
                  <TableCell>Usuário</TableCell>
                  <TableCell align="center">Nota</TableCell>
                  <TableCell>Comentário</TableCell>
                </StyledTableHead>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.id}>
                    <TableCell component="td">
                      {row?.professional?.name}
                    </TableCell>
                    <TableCell component="td" align="center">
                      <Rating max={10} value={row.grade} readOnly />
                    </TableCell>
                    <TableCell component="td">{row.comment}</TableCell>
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

export default AvaliationList;
