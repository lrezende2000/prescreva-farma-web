import { Autocomplete, Grid, TextField } from "@mui/material";

const PatientForm = () => {
  return (
    <Grid container item>
      <Grid item xs={12} md={6}>
        <Autocomplete
          fullWidth
          size="small"
          options={[]}
          renderInput={(props) => <TextField {...props} label="Paciente" />}
        />
      </Grid>
    </Grid>
  );
};

export default PatientForm;
