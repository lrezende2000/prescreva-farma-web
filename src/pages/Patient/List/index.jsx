import { useState } from "react";
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

import PageLayout from "../../../components/PageLayout";
import Text from "../../../components/Text";

import { StyledTableHead, StyledTableRow } from "./styles";

const PatientList = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  return (
    <PageLayout>
      <Text color="primary_blue" variant="large">
        Pacientes
      </Text>

      <Grid container>
        {/* Filter fields */}
        <Grid item container xs={12} md={8} spacing={2}>
          <Grid item xs={12} md={4}>
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
          <Grid item xs={12} md={4}>
            <TextField
              placeholder="Buscar por CPF"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="primary" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              placeholder="Buscar pelo celular"
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
        <Grid item container xs={12} md={4}>
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
              <Button startIcon={<Add />}>Cadastrar paciente</Button>
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
                  <TableCell>Próxima consulta</TableCell>
                  <TableCell align="right">Ações</TableCell>
                </StyledTableHead>
              </TableHead>
              <TableBody>
                <StyledTableRow>
                  <TableCell component="td">1</TableCell>
                  <TableCell component="td">Lucas Rezende</TableCell>
                  <TableCell component="td">{maskCpf("12334578900")}</TableCell>
                  <TableCell component="td">22</TableCell>
                  <TableCell component="td">24/10/2022</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
                      <MoreVert color="primary" />
                    </IconButton>
                  </TableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <TableCell component="td">2</TableCell>
                  <TableCell component="td">Arthur Porto</TableCell>
                  <TableCell component="td">{maskCpf("12345678900")}</TableCell>
                  <TableCell component="td">27</TableCell>
                  <TableCell component="td">23/12/2022</TableCell>
                  <TableCell align="right">
                    <IconButton>
                      <MoreVert color="primary" />
                    </IconButton>
                  </TableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <TableCell component="td">1</TableCell>
                  <TableCell component="td">Lucas Rezende</TableCell>
                  <TableCell component="td">{maskCpf("12334578900")}</TableCell>
                  <TableCell component="td">22</TableCell>
                  <TableCell component="td">24/10/2022</TableCell>
                  <TableCell align="right">
                    <IconButton>
                      <MoreVert color="primary" />
                    </IconButton>
                  </TableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <TableCell component="td">2</TableCell>
                  <TableCell component="td">Arthur Porto</TableCell>
                  <TableCell component="td">{maskCpf("12345678900")}</TableCell>
                  <TableCell component="td">27</TableCell>
                  <TableCell component="td">23/12/2022</TableCell>
                  <TableCell align="right">
                    <IconButton>
                      <MoreVert color="primary" />
                    </IconButton>
                  </TableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <TableCell component="td">1</TableCell>
                  <TableCell component="td">Lucas Rezende</TableCell>
                  <TableCell component="td">{maskCpf("12334578900")}</TableCell>
                  <TableCell component="td">22</TableCell>
                  <TableCell component="td">24/10/2022</TableCell>
                  <TableCell align="right">
                    <IconButton>
                      <MoreVert color="primary" />
                    </IconButton>
                  </TableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <TableCell component="td">2</TableCell>
                  <TableCell component="td">Arthur Porto</TableCell>
                  <TableCell component="td">{maskCpf("12345678900")}</TableCell>
                  <TableCell component="td">27</TableCell>
                  <TableCell component="td">23/12/2022</TableCell>
                  <TableCell align="right">
                    <IconButton>
                      <MoreVert color="primary" />
                    </IconButton>
                  </TableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <TableCell component="td">1</TableCell>
                  <TableCell component="td">Lucas Rezende</TableCell>
                  <TableCell component="td">{maskCpf("12334578900")}</TableCell>
                  <TableCell component="td">22</TableCell>
                  <TableCell component="td">24/10/2022</TableCell>
                  <TableCell align="right">
                    <IconButton>
                      <MoreVert color="primary" />
                    </IconButton>
                  </TableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <TableCell component="td">2</TableCell>
                  <TableCell component="td">Arthur Porto</TableCell>
                  <TableCell component="td">{maskCpf("12345678900")}</TableCell>
                  <TableCell component="td">27</TableCell>
                  <TableCell component="td">23/12/2022</TableCell>
                  <TableCell align="right">
                    <IconButton>
                      <MoreVert color="primary" />
                    </IconButton>
                  </TableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <TableCell component="td">1</TableCell>
                  <TableCell component="td">Lucas Rezende</TableCell>
                  <TableCell component="td">{maskCpf("12334578900")}</TableCell>
                  <TableCell component="td">22</TableCell>
                  <TableCell component="td">24/10/2022</TableCell>
                  <TableCell align="right">
                    <IconButton>
                      <MoreVert color="primary" />
                    </IconButton>
                  </TableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <TableCell component="td">2</TableCell>
                  <TableCell component="td">Arthur Porto</TableCell>
                  <TableCell component="td">{maskCpf("12345678900")}</TableCell>
                  <TableCell component="td">27</TableCell>
                  <TableCell component="td">23/12/2022</TableCell>
                  <TableCell align="right">
                    <IconButton>
                      <MoreVert color="primary" />
                    </IconButton>
                  </TableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <TableCell component="td">1</TableCell>
                  <TableCell component="td">Lucas Rezende</TableCell>
                  <TableCell component="td">{maskCpf("12334578900")}</TableCell>
                  <TableCell component="td">22</TableCell>
                  <TableCell component="td">24/10/2022</TableCell>
                  <TableCell align="right">
                    <IconButton>
                      <MoreVert color="primary" />
                    </IconButton>
                  </TableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <TableCell component="td">2</TableCell>
                  <TableCell component="td">Arthur Porto</TableCell>
                  <TableCell component="td">{maskCpf("12345678900")}</TableCell>
                  <TableCell component="td">27</TableCell>
                  <TableCell component="td">23/12/2022</TableCell>
                  <TableCell align="right">
                    <IconButton>
                      <MoreVert color="primary" />
                    </IconButton>
                  </TableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <TableCell component="td">1</TableCell>
                  <TableCell component="td">Lucas Rezende</TableCell>
                  <TableCell component="td">{maskCpf("12334578900")}</TableCell>
                  <TableCell component="td">22</TableCell>
                  <TableCell component="td">24/10/2022</TableCell>
                  <TableCell align="right">
                    <IconButton>
                      <MoreVert color="primary" />
                    </IconButton>
                  </TableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <TableCell component="td">2</TableCell>
                  <TableCell component="td">Arthur Porto</TableCell>
                  <TableCell component="td">{maskCpf("12345678900")}</TableCell>
                  <TableCell component="td">27</TableCell>
                  <TableCell component="td">23/12/2022</TableCell>
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
            <Text>Realizar prescrição</Text>
          </MenuItem>
          <MenuItem>
            <Text>Realizar encaminhamento</Text>
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

export default PatientList;
