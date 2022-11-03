import { useEffect, useState, memo } from "react";
import {
  Autocomplete,
  Box,
  CircularProgress,
  MenuItem,
  TextField,
} from "@mui/material";

import { ibgeApi } from "../services/ibge";

const UfSelect = ({
  defaultValue,
  label,
  disabled,
  onChange,
  onFocus = () => {},
  isError,
  error,
}) => {
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState(null);

  useEffect(() => {
    ibgeApi
      .get("/localidades/estados/?orderBy=nome")
      .then(({ data }) =>
        setOptions(
          data.map((uf) => ({ id: uf.id, name: uf.nome, abbr: uf.sigla }))
        )
      )
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (defaultValue) {
      setValue(options.find((uf) => uf.abbr === defaultValue) || null);
    }
  }, [options]);

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
      disabled={disabled}
      options={options}
      value={value}
      onChange={(_, value) => {
        setValue(value);
        onChange && onChange(value);
      }}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => option.id === value?.id}
      onFocus={onFocus}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label || "Estados"}
          error={isError}
          helperText={error}
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

export default memo(UfSelect);
