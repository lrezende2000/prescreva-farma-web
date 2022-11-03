import { useEffect, useState } from "react";
import { Grid, TextField } from "@mui/material";
import { useFormikContext } from "formik";

import { maskCep, unmaskNumber } from "../../../helpers/mask";
import { cepApi } from "../../../services/cep";
import UfSelect from "../../../components/UfSelect";

const ProfessionalAddress = () => {
  const [disableFields, setDisableFields] = useState(true);

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

  const handleGetCep = async (cep) => {
    const unmaskedCep = unmaskNumber(cep);

    const { data } = await cepApi.get(`/${unmaskedCep}/json`);

    if (data.erro) {
      return setDisableFields(false);
    }

    setFieldValue("state", data.uf);
    setFieldValue("city", data.localidade);
    setFieldValue("street", data.logradouro);
    setFieldValue("district", data.bairro);
  };

  useEffect(() => {
    setDisableFields(true);
    if (values.cep?.length >= 9) {
      handleGetCep(values.cep);
    } else {
      setFieldValue("state", "");
      setFieldValue("city", "");
      setFieldValue("street", "");
      setFieldValue("district", "");
    }
  }, [values.cep]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <TextField
          label="CEP"
          placeholder="Informe seu CEP"
          name="cep"
          value={values.cep}
          onChange={(e) =>
            setFieldValue(e.target.name, maskCep(e.target.value))
          }
          onFocus={handleFocus}
          error={touched.cep && !!errors.cep}
          helperText={touched.cep && errors.cep}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <UfSelect
          label="Estado"
          defaultValue={values.state}
          disabled={disableFields}
          isError={touched.state && !!errors.state}
          error={touched.state && errors.state}
          onChange={(uf) => setFieldValue("state", uf?.abbr)}
          onFocus={() => setFieldTouched("state", true)}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          disabled={disableFields}
          label="Cidade"
          placeholder="Informe sua cidade"
          name="city"
          value={values.city}
          onChange={handleChange}
          onFocus={handleFocus}
          error={touched.city && !!errors.city}
          helperText={touched.city && errors.city}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          disabled={disableFields}
          label="Bairro"
          placeholder="Informe seu bairro"
          name="district"
          value={values.district}
          onChange={handleChange}
          onFocus={handleFocus}
          error={touched.district && !!errors.district}
          helperText={touched.district && errors.district}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          disabled={disableFields}
          label="Rua"
          placeholder="Informe sua rua"
          name="street"
          value={values.street}
          onChange={handleChange}
          onFocus={handleFocus}
          error={touched.street && !!errors.street}
          helperText={touched.street && errors.street}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="Número"
          placeholder="Informe seu número"
          name="number"
          value={values.number}
          onChange={handleChange}
          onFocus={handleFocus}
          error={touched.number && !!errors.number}
          helperText={touched.number && errors.number}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Complemento"
          placeholder="Informe o complmento"
          rows={3}
          multiline
          name="complement"
          value={values.complement}
          onChange={handleChange}
          onFocus={handleFocus}
          error={touched.complement && !!errors.complement}
          helperText={touched.complement && errors.complement}
        />
      </Grid>
    </Grid>
  );
};

export default ProfessionalAddress;
