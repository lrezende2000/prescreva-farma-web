import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
} from "@mui/material";
import { useFormikContext } from "formik";
import PatientAutocomplete from "../../../../components/PatientAutocomplete";

const ForwardForm = () => {
  const { values, setFieldValue, setFieldTouched, touched, errors } =
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
      <Grid item xs={12} md={6}>
        <TextField
          label="Especialidade"
          value={values.medicalExperience}
          onChange={(e) => setFieldValue("medicalExperience", e.target.value)}
          onFocus={() => setFieldTouched("medicalExperience", true)}
          error={touched.medicalExperience && !!errors.medicalExperience}
          helperText={touched.medicalExperience && errors.medicalExperience}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          multiline
          rows={4}
          label="Motivo do encaminhamento"
          value={values.forwardReason}
          onChange={(e) => setFieldValue("forwardReason", e.target.value)}
          onFocus={() => setFieldTouched("forwardReason", true)}
          error={touched.forwardReason && !!errors.forwardReason}
          helperText={touched.forwardReason && errors.forwardReason}
        />
      </Grid>
      <Grid item xs={12}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={values.showFooter}
                onChange={(e) => setFieldValue("showFooter", e.target.checked)}
              />
            }
            label="À disposição para qualquer esclarecimento"
          />
        </FormGroup>
      </Grid>
    </Grid>
  );
};

export default ForwardForm;
