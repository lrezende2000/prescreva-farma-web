import { ThemeProvider as SCThemeProvider } from "styled-components";
import { ThemeProvider as MUIThemeProvider } from "@mui/material";

import { MUITheme, theme } from "./global/theme";

import GlobalStyles from "./global/globalStyles";
import Routes from "./routes";
import { AuthProvider } from "./context/auth";

function App() {
  return (
    <MUIThemeProvider theme={MUITheme}>
      <SCThemeProvider theme={theme}>
        <GlobalStyles />
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </SCThemeProvider>
    </MUIThemeProvider>
  );
}

export default App;
