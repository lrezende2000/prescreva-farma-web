import { useNavigate } from "react-router-dom";
import { Button, Grid, TextField } from "@mui/material";
import { CalendarMonth } from "@mui/icons-material";

import PageLayout from "../../../components/PageLayout";
import Stepper from "../../../components/Stepper";

import { Container } from "./styles";

const CreateAppointment = () => {
  const navigate = useNavigate();

  return (
    <PageLayout>
      <Container>
        <Stepper steps={[{ label: "Agendamento", icon: <CalendarMonth /> }]} />
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            {/* Autocomplete */}
            <TextField label="Paciente" />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Data da consulta"
              type="date"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Horário inicial"
              type="time"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Horário de término"
              type="time"
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            display="flex"
            flexDirection={["column", "row"]}
            justifyContent="space-between"
            gap={1}
          >
            <Button
              variant="outlined"
              color="error"
              onClick={() => navigate("/consultas")}
            >
              Cancelar
            </Button>
            <Button>Salvar</Button>
          </Grid>
        </Grid>
      </Container>
    </PageLayout>
  );
};

export default CreateAppointment;
