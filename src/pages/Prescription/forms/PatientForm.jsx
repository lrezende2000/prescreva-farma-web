import { Grid } from "@mui/material";
import { useFormikContext } from "formik";

import PatientAutocomplete from "../../../components/PatientAutocomplete";

const PatientForm = () => {
  const { setFieldValue, setFieldTouched, touched, errors, values } =
    useFormikContext();

  return (
    <Grid container item>
      <Grid item xs={12} md={6}>
        <PatientAutocomplete
          defaultPatientId={values.patientId}
          onChange={(patient) => setFieldValue("patientId", patient?.id)}
          onFocus={() => setFieldTouched("patientId", true)}
          isError={touched.patientId && !!errors.patientId}
          error={touched.patientId && errors.patientId}
        />
      </Grid>
    </Grid>
  );
};

export default PatientForm;
