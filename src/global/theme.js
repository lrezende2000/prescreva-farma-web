import { createTheme } from "@mui/material";

export const theme = {
  colors: {
    primary_blue: "#052460",
    secondary_blue: "#3A89C9",
    tertiary_blue: "#9CC4E4",
    quartiary_blue: "#E9F2F9",
    error: "#F26C4F",
    black: "#333",
    white: "#FFF",
  },
};

export const MUITheme = createTheme({
  palette: {
    primary: {
      main: theme.colors.primary_blue,
    },
    secondary: {
      main: theme.colors.secondary_blue,
    },
    error: {
      main: theme.colors.error,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
      styleOverrides: {
        root: {
          padding: "0.5rem 2rem",
          textTransform: "none",
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
        size: "small",
      },
    },
    MuiSelect: {
      defaultProps: {
        fullWidth: true,
        size: "small",
      },
    },
    MuiGrid: {
      defaultProps: {
        spacing: 2,
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          whiteSpace: "normal",
        },
      },
    },
  },
});
