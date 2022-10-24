import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormikContext } from "formik";
import { maskCpf, maskPhone, maskTel } from "../../../helpers/mask";

const PersonalDetails = () => {
  const { values, setFieldValue } = useFormikContext();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFieldValue(name, value);
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
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          label="Nacionalidade"
          placeholder="Informe sua nacionalidade"
          name="nacionality"
          value={values.nacionality}
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel id="gender_label" htmlFor="gender">Gênero</InputLabel>
          <Select
            labelId="gender_label"
            label="Gênero"
            placeholder="Infore seu gênero"
            name="gender"
            value={values.gender}
            onChange={handleChange}
          >
            <MenuItem value="MEN">Masculino</MenuItem>
            <MenuItem value="WOMAN">Feminino</MenuItem>
            <MenuItem value="OTHER">Outro</MenuItem>
          </Select>
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
        />
      </Grid>
    </Grid>
  );
};

export default PersonalDetails;
