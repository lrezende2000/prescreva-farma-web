import { useState, useEffect, memo } from "react";
import {
  Autocomplete,
  Box,
  CircularProgress,
  MenuItem,
  TextField,
} from "@mui/material";

import useAxios from "../hooks/useAxios";

const PatientAutocomplete = ({
  onChange,
  defaultPatientId,
  isError,
  error,
  onFocus = () => {},
}) => {
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState(null);

  const api = useAxios();

  useEffect(() => {
    api
      .get("/patient/list/all")
      .then(({ data }) => setOptions(data.rows))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (defaultPatientId) {
      setValue(
        options.find((patient) => patient.id === defaultPatientId) || null
      );
    }
  }, [defaultPatientId, options]);

  if (loading) {
    return (
      <Box width="100%" justifyContent="center">
        <CircularProgress size={20} />
      </Box>
    );
  }

  return (
    <Autocomplete
      fullWidth
      options={options}
      value={value}
      onChange={(_, value) => {
        setValue(value);
        onChange && onChange(value);
      }}
      onFocus={onFocus}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => (
        <TextField
          {...params}
          error={isError}
          helperText={error}
          label="Paciente"
        />
      )}
      renderOption={(params, option) => (
        <MenuItem {...params} key={option.id}>
          {option.name}
        </MenuItem>
      )}
    />
  );
};

export default memo(PatientAutocomplete);
