import { useEffect, useState } from "react";
import { Grid, TextField } from "@mui/material";
import { useFormikContext } from "formik";

import { maskCep, unmaskNumber } from "../../../helpers/mask";
import { cepApi } from "../../../services/cep";

const ProfessionalAddress = () => {
  const [disableFields, setDisableFields] = useState(true);

  const { values, setFieldValue } = useFormikContext();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFieldValue(name, value);
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
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          disabled={disableFields}
          label="Estado"
          placeholder="Informe seu estado"
          name="state"
          value={values.state}
          onChange={handleChange}
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
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="Número"
          placeholder="Informe seu número"
          name="number"
          value={values.number}
          onChange={handleChange}
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
        />
      </Grid>
    </Grid>
  );
};

export default ProfessionalAddress;
