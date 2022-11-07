import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  TextField,
} from "@mui/material";
import { useFormikContext } from "formik";
import PatientAutocomplete from "../../../components/PatientAutocomplete";
import { medicalExperience } from "../../../data/medicalExperience";

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
        <Autocomplete
          options={medicalExperience}
          value={values.medicalExperience || null}
          onChange={(_, experience) =>
            setFieldValue("medicalExperience", experience)
          }
          isOptionEqualToValue={(option, value) => option === value}
          onFocus={() => setFieldTouched("medicalExperience", true)}
          renderInput={(props) => (
            <TextField
              {...props}
              error={touched.medicalExperience && !!errors.medicalExperience}
              helperText={touched.medicalExperience && errors.medicalExperience}
              label="Especialidade"
            />
          )}
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
