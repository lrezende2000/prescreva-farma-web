import { useFormikContext } from "formik";
import { Grid, TextField } from "@mui/material";

const NonPharmacologicalTherapy = () => {
  const { values, setFieldValue } = useFormikContext();

  return (
    <Grid container item>
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
