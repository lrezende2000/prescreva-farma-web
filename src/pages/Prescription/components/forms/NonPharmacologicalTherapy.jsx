import { useState } from "react";
import { useFormikContext } from "formik";
import { Autocomplete, Grid, TextField } from "@mui/material";

import { nonPharmacologicalTherapy } from "../../../../data/nonPharmacologicalTherapy";

const NonPharmacologicalTherapy = () => {
  const { values, setFieldValue } = useFormikContext();
  const [option, setOption] = useState(null);

  return (
    <Grid container item>
      <Grid item xs={12} sm={6}>
        <Autocomplete
          options={nonPharmacologicalTherapy}
          value={option}
          onChange={(_, value) => {
            if (value) {
              const appendToValue = `${values.nonPharmacologicalTherapy}${
                values.nonPharmacologicalTherapy ? "\n" : ""
              }${value}`;
              setFieldValue("nonPharmacologicalTherapy", appendToValue);
            }

            setOption(value);
          }}
          isOptionEqualToValue={(option, value) => option === value}
          renderInput={(props) => (
            <TextField
              {...props}
              label="Sugestões de terapias não farmacológicas"
            />
          )}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          multiline
          rows={4}
          label="Terapia não farmacológica"
          value={values.nonPharmacologicalTherapy}
          onChange={(e) =>
            setFieldValue("nonPharmacologicalTherapy", e.target.value)
          }
        />
      </Grid>
    </Grid>
  );
};

export default NonPharmacologicalTherapy;
