import { useState, useEffect, memo } from "react";
import {
  Autocomplete,
  Box,
  Chip,
  CircularProgress,
  MenuItem,
  TextField,
} from "@mui/material";

import useAxios from "../../../hooks/useAxios";

const MedicineAutocomplete = ({ onChange }) => {
  const [loading, setLoading] = useState(true);
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState([]);

  const api = useAxios();

  useEffect(() => {
    api
      .get("/medicines/list/all")
      .then(({ data }) => setOptions(data.rows))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    onChange && onChange(value);
  }, [value]);

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
      multiple
      filterSelectedOptions
      limitTags={2}
      options={options}
      value={value}
      onChange={(_, value) => setValue(value)}
      getOptionLabel={(option) => option.name}
      renderTags={(value, getTagProps) =>
        value.map((option, index) => (
          <Chip
            key={option.id}
            label={option.name}
            size="small"
            {...getTagProps({ index })}
          />
        ))
      }
      renderInput={(params) => <TextField {...params} label="Fármacos" />}
      renderOption={(params, option) => (
        <MenuItem {...params} key={option.id}>
          {option.name}
        </MenuItem>
      )}
    />
  );
};

export default memo(MedicineAutocomplete);
