import { memo, useState } from "react";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const PasswordInput = ({
  value,
  onChange,
  onFocus,
  isError,
  error,
  label,
  ...otherParams
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      label={label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      type={showPassword ? "text" : "password"}
      onFocus={onFocus}
      error={isError}
      helperText={error}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              edge="end"
              onClick={() => setShowPassword((show) => !show)}
              tabIndex={-1}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...otherParams}
    />
  );
};

PasswordInput.defaultProps = {
  onFocus: () => {},
  isError: false,
  error: "",
};

export default memo(PasswordInput);
