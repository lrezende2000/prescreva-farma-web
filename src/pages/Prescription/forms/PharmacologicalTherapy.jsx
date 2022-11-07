import * as yup from "yup";
import { Formik, useFormikContext } from "formik";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  Chip,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";

import Text from "../../../components/Text";
import MedicineAutocomplete from "../../../components/MedicineAutocomplete";

const PharmacologicalTherapy = () => {
  const { values, setFieldValue, setFieldTouched, errors, touched } =
    useFormikContext();

  const handleAddMedicine = (posologyValues, posologyActions) => {
    const prevMedicines = values.medicines;

    if (
      !prevMedicines.find(
        (medicine) => medicine.medicineId === posologyValues.medicineId
      )
    ) {
      const newMedicines = [...prevMedicines, { ...posologyValues }];

      setFieldValue("medicines", newMedicines);
      posologyActions.resetForm();
    } else {
      toast.warn("Medicamento já adicionado");
    }

    posologyActions.setSubmitting(false);
  };

  const handleDeleteMedicine = (id) => {
    const newMedicines = values.medicines.filter(
      (medicine) => medicine.medicineId !== id
    );

    setFieldValue("medicines", newMedicines);
  };

  const posologyValidationSchema = yup.object().shape({
    medicineId: yup
      .number()
      .integer()
      .required("Fármaco é obrigatório")
      .typeError("Fármaco é obrigatório"),
    medicineName: yup.string(),
    concentration: yup.string().required("Concentração é obrigatório"),
    instructions: yup
      .string()
      .required(
        "Dose, frequência de administração do medicamento e duração do tratamento é obrigatório"
      ),
    administrationForm: yup
      .string()
      .oneOf(
        ["Uso oral", "Uso externo"],
        "Forma de administração só pode ser 'Uso oral' ou 'Uso externo'"
      )
      .required("Forma de administração é obrigatória"),
  });

  return (
    <Grid container item>
      <Grid item xs={12}>
        <Box display="flex" flexDirection="column" gap={1}>
          <Text fontWeight={700}>Fármacos prescritos</Text>
          <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
            {!values.medicines.length && (
              <Text variant="small" fontStyle="italic">
                Nenhum fármaco adicionado
              </Text>
            )}
            {values.medicines.map((medicine) => (
              <Chip
                key={medicine.medicineId}
                variant="outlined"
                label={medicine.medicineName}
                onDelete={() => handleDeleteMedicine(medicine.medicineId)}
              />
            ))}
          </Box>
        </Box>
      </Grid>
      <Formik
        initialValues={{
          medicineId: null,
          medicineName: "",
          concentration: "",
          instructions: "",
          administrationForm: undefined,
        }}
        validationSchema={posologyValidationSchema}
        onSubmit={handleAddMedicine}
        validateOnMount
      >
        {(posologyFormik) => {
          const hasError = Object.values(posologyFormik.values).some(
            (value) => !value
          );

          // console.log(posologyFormik.values)
          console.log(posologyFormik.isSubmitting);

          return (
            <>
              <Grid item xs={12} sm={6}>
                <MedicineAutocomplete
                  key={posologyFormik.values.medicineId}
                  defaultMedicineId={posologyFormik.values.medicineId}
                  onChange={(value) => {
                    posologyFormik.setFieldValue("medicineName", value?.name);
                    posologyFormik.setFieldValue("medicineId", value?.id);
                  }}
                  onFocus={() =>
                    posologyFormik.setFieldTouched("medicineId", true)
                  }
                  isError={
                    posologyFormik.touched.medicineId &&
                    !!posologyFormik.errors.medicineId
                  }
                  error={
                    posologyFormik.touched.medicineId &&
                    posologyFormik.errors.medicineId
                  }
                  optionLabel={(option) =>
                    `${option.name} - ${option.pharmaceuticalForm}`
                  }
                />
              </Grid>
              <Grid item xs={6} sm={3}>
                <FormControl
                  fullWidth
                  size="small"
                  error={
                    posologyFormik.touched.administrationForm &&
                    !!posologyFormik.errors.administrationForm
                  }
                >
                  <InputLabel
                    id="administrationForm-label"
                    htmlFor="administrationForm"
                  >
                    Forma de administração
                  </InputLabel>
                  <Select
                    id="administrationForm"
                    label="Forma de administração"
                    labelId="administrationForm-label"
                    value={posologyFormik.administrationForm}
                    onChange={(e) =>
                      posologyFormik.setFieldValue(
                        "administrationForm",
                        e.target.value
                      )
                    }
                    onFocus={() =>
                      posologyFormik.setFieldTouched("administrationForm", true)
                    }
                  >
                    <MenuItem value="Uso oral">Uso Oral</MenuItem>
                    <MenuItem value="Uso externo">Uso Externo</MenuItem>
                  </Select>
                  {posologyFormik.touched.administrationForm &&
                    !!posologyFormik.errors.administrationForm && (
                      <FormHelperText>
                        {posologyFormik.errors.administrationForm}
                      </FormHelperText>
                    )}
                </FormControl>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Tooltip title="Informe também a medida da concentração. Ex: 1mg/L">
                  <TextField
                    label="Concentração"
                    value={posologyFormik.values.concentration}
                    onChange={(e) =>
                      posologyFormik.setFieldValue(
                        "concentration",
                        e.target.value
                      )
                    }
                    onFocus={() =>
                      posologyFormik.setFieldTouched("concentration", true)
                    }
                    error={
                      posologyFormik.touched.concentration &&
                      !!posologyFormik.errors.concentration
                    }
                    helperText={
                      posologyFormik.touched.concentration &&
                      posologyFormik.errors.concentration
                    }
                  />
                </Tooltip>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  multiline
                  rows={4}
                  label="Dose, frequência de administração do medicamento e duração do tratamento"
                  value={posologyFormik.values.instructions}
                  onChange={(e) =>
                    posologyFormik.setFieldValue("instructions", e.target.value)
                  }
                  onFocus={() =>
                    posologyFormik.setFieldTouched("instructions", true)
                  }
                  error={
                    posologyFormik.touched.instructions &&
                    !!posologyFormik.errors.instructions
                  }
                  helperText={
                    posologyFormik.touched.instructions &&
                    posologyFormik.errors.instructions
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  alignItems={["unset", "center"]}
                  gap={1}
                >
                  <Button
                    disabled={posologyFormik.is || hasError}
                    onClick={posologyFormik.handleSubmit}
                  >
                    Adicionar
                  </Button>
                </Box>
              </Grid>
            </>
          );
        }}
      </Formik>
      <Grid item xs={12}>
        <TextField
          multiline
          rows={4}
          label="Instruções Adicionais"
          value={values.aditionalInfos}
          onChange={(e) => setFieldValue("aditionalInfos", e.target.value)}
          onFocus={() => setFieldTouched("aditionalInfos", true)}
          error={touched.aditionalInfos && !!errors.aditionalInfos}
          helperText={touched.aditionalInfos && errors.aditionalInfos}
        />
      </Grid>
    </Grid>
  );
};

export default PharmacologicalTherapy;
