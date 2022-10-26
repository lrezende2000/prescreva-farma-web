import { Autocomplete, Grid, TextField } from "@mui/material";
import { useFormikContext } from "formik";

const ForwardForm = () => {
  const { values, setFieldValue } = useFormikContext();

  return (
    <Grid container item>
      <Grid item xs={12} md={6}>
        <Autocomplete
          options={[]}
          renderInput={(props) => <TextField {...props} label="Paciente" />}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Autocomplete
          options={[]}
          renderInput={(props) => (
            <TextField {...props} label="Especialidade" />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          multiline
          rows={4}
          label="Motivo do encaminhamento"
          value={values.forwardReason}
          onChange={(e) => setFieldValue("forwardReason", e.target.value)}
        />
      </Grid>
    </Grid>
  );
};

export default ForwardForm;
