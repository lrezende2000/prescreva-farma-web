import { Grid, TextField } from "@mui/material";
import { useFormikContext } from "formik";
import UfSelect from "../../../components/UfSelect";

const ProfessionalDetails = () => {
  const { values, setFieldValue, touched, setFieldTouched, errors } =
    useFormikContext();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFieldValue(name, value);
  };

  const handleFocus = (e, name) => {
    if (!e.target.name) {
      setFieldTouched(name, true);
    }

    setFieldTouched(e.target.name, true);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6} md={3}>
        <TextField
          label="CRF"
          placeholder="Informe seu CRF"
          name="crf"
          value={values.crf}
          onChange={handleChange}
          onFocus={handleFocus}
          error={touched.crf && !!errors.crf}
          helperText={touched.crf && errors.crf}
        />
      </Grid>
      <Grid item xs={6} md={3}>
        <UfSelect
          label="Estado do CRF"
          disable={false}
          defaultValue={values.crfState}
          isError={touched.crfState && !!errors.crfState}
          error={touched.crfState && errors.crfState}
          onChange={(uf) => setFieldValue("crfState", uf?.abbr)}
          onFocus={() => setFieldTouched("crfState", true)}
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
          onFocus={handleFocus}
          error={touched.email && !!errors.email}
          helperText={touched.email && errors.email}
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
          onFocus={handleFocus}
          error={touched.password && !!errors.password}
          helperText={touched.password && errors.password}
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
          onFocus={handleFocus}
          error={touched.passwordConfirmation && !!errors.passwordConfirmation}
          helperText={
            touched.passwordConfirmation && errors.passwordConfirmation
          }
        />
      </Grid>
    </Grid>
  );
};

export default ProfessionalDetails;
