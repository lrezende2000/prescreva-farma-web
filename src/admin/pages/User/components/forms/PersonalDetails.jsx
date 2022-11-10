import { memo } from "react";
import { useFormikContext } from "formik";
import {
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import { maskCpf, maskPhone, maskTel } from "../../../../../helpers/mask";

const PersonalDetails = () => {
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
      <Grid item xs={12} md={6}>
        <TextField
          label="Nome completo"
          placeholder="Informe seu nome completo"
          name="name"
          value={values.name}
          onChange={handleChange}
          onFocus={handleFocus}
          error={touched.name && !!errors.name}
          helperText={touched.name && errors.name}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="Data de nascimento"
          placeholder="Informe sua data de nascimento"
          name="birthDate"
          type="date"
          value={values.birthDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          onFocus={handleFocus}
          error={touched.birthDate && !!errors.birthDate}
          helperText={touched.birthDate && errors.birthDate}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="CPF"
          placeholder="999.999.999-99"
          name="cpf"
          value={values.cpf}
          onChange={(e) =>
            setFieldValue(e.target.name, maskCpf(e.target.value))
          }
          onFocus={handleFocus}
          error={touched.cpf && !!errors.cpf}
          helperText={touched.cpf && errors.cpf}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="Nacionalidade"
          placeholder="Informe sua nacionalidade"
          name="nacionality"
          value={values.nacionality}
          onChange={handleChange}
          onFocus={handleFocus}
          error={touched.nacionality && !!errors.nacionality}
          helperText={touched.nacionality && errors.nacionality}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl
          fullWidth
          size="small"
          error={touched.gender && !!errors.gender}
        >
          <InputLabel id="gender_label" htmlFor="gender">
            Gênero
          </InputLabel>
          <Select
            labelId="gender_label"
            label="Gênero"
            placeholder="Infore seu gênero"
            name="gender"
            value={values.gender}
            onChange={handleChange}
            onFocus={(e) => handleFocus(e, "gender")}
          >
            <MenuItem value="MEN">Masculino</MenuItem>
            <MenuItem value="WOMAN">Feminino</MenuItem>
            <MenuItem value="OTHER">Outro</MenuItem>
          </Select>
          {touched.gender && !!errors.gender && (
            <FormHelperText>{errors.gender}</FormHelperText>
          )}
        </FormControl>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="Celular"
          placeholder="(99)99999-9999"
          name="phone"
          value={values.phone}
          onChange={(e) =>
            setFieldValue(e.target.name, maskPhone(e.target.value))
          }
          onFocus={handleFocus}
          error={touched.phone && !!errors.phone}
          helperText={touched.phone && errors.phone}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="Telefone"
          placeholder="(99)9999-9999"
          name="tel"
          value={values.tel}
          onChange={(e) =>
            setFieldValue(e.target.name, maskTel(e.target.value))
          }
          onFocus={handleFocus}
          error={touched.tel && !!errors.tel}
          helperText={touched.tel && errors.tel}
        />
      </Grid>
    </Grid>
  );
};

export default memo(PersonalDetails);
