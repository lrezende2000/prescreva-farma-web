/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback } from "react";
import { useFormikContext } from "formik";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  CircularProgress,
  Grid,
  MenuItem,
  TextField,
  Tooltip,
} from "@mui/material";

import useAxios from "../../../hooks/useAxios";
import Text from "../../../components/Text";

const PharmacologicalTherapy = () => {
  const [medicines, setMedicines] = useState([]);
  const [medicineId, setMedicineId] = useState();
  const [concentration, setConcentration] = useState("");
  const [instructions, setInstructions] = useState("");
  const [loading, setLoading] = useState(false);

  const { values, setFieldValue } = useFormikContext();

  const api = useAxios();

  const fetchMedicines = useCallback(async () => {
    try {
      setLoading(true);

      const { data } = await api.get("/medicines/list/all");

      setMedicines(data.rows);
    } catch (err) {
      setMedicines([]);
    } finally {
      setLoading(false);
    }
  }, [api]);

  const handleAddMedicine = () => {
    const prevMedicines = values.medicines;

    if (!prevMedicines.find((medicine) => medicine.medicineId === medicineId)) {
      const newMedicines = [
        ...prevMedicines,
        { medicineId, concentration, instructions },
      ];

      setFieldValue("medicines", newMedicines);
    }

    setMedicineId(null);
    setConcentration("");
    setInstructions("");
  };

  const handleDeleteMedicine = (id) => {
    const newMedicines = values.medicines.filter(
      (medicine) => medicine.medicineId !== id
    );

    setFieldValue("medicines", newMedicines);
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  return (
    <Grid container item>
      {loading ? (
        <Grid item xs={12} display="flex" justifyContent="center">
          <CircularProgress size={20} />
        </Grid>
      ) : (
        <>
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
                    label={
                      medicines.find((m) => m.id === medicine.medicineId)?.name
                    }
                    onDelete={() => handleDeleteMedicine(medicine.medicineId)}
                  />
                ))}
                {/* <Chip
                  label="Novalgina"
                  variant="outlined"
                  onDelete={() => {}}
                /> */}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Autocomplete
              options={medicines}
              value={
                medicines.find((medicine) => medicine.id === medicineId) || null
              }
              onChange={(_, newValue) => setMedicineId(newValue?.id)}
              renderInput={(props) => <TextField {...props} label="Fármaco" />}
              isOptionEqualToValue={(option, value) => option?.id === value?.id}
              getOptionLabel={(option) => `${option?.name}`}
              renderOption={(props, option) => (
                <MenuItem {...props} key={`${option.id}`}>
                  {option.name} - {option.pharmaceuticalForm}
                </MenuItem>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Tooltip title="Informe também a medida da concentração. Ex: 1mg/L">
              <TextField
                label="Concentração"
                value={concentration}
                onChange={(e) => setConcentration(e.target.value)}
              />
            </Tooltip>
          </Grid>
          <Grid item xs={12}>
            <TextField
              multiline
              rows={4}
              label="Dose, frequência de administração do medicamento e duração do tratamento"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Box
              display="flex"
              justifyContent="flex-end"
              alignItems={["unset", "center"]}
              gap={1}
            >
              <Button onClick={handleAddMedicine}>Adicionar</Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <TextField multiline rows={4} label="Instruções Adicionais" />
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default PharmacologicalTherapy;
