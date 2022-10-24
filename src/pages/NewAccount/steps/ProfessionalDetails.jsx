import { Grid, TextField } from "@mui/material";
import { useFormikContext } from "formik";

const ProfessionalDetails = () => {
  const { values, setFieldValue } = useFormikContext();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFieldValue(name, value);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} md={3}>
        <TextField
          label="CRF"
          placeholder="Informe seu CRF"
          helperText="Somente números"
          name="crf"
          value={values.crf}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={6} md={3}>
        <TextField
          label="Estado do CRF"
          placeholder="Informe o estado do CRF"
          name="crfState"
          value={values.crfState}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="E-mail"
          placeholder="Informa seu e-mail"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="Senha"
          placeholder="Informe sua senha"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="Confirmação de senha"
          placeholder="Repita sua senha"
          name="passwordConfirmation"
          type="password"
          value={values.passwordConfirmation}
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  );
};

export default ProfessionalDetails;
