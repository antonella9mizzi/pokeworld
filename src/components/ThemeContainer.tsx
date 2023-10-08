import React from "react";
import {
  createTheme,
  StyledEngineProvider,
  ThemeProvider,
} from "@mui/material/styles";

const ThemeContainer = (props: any) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#00126b",
      },
      secondary: {
        main: "#ff1f48",
      },
      text: { primary: "#121212" },
      background: { default: "#edeef1" },
    },
    typography: {
      h1: {
        fontSize: 48,
      },
      subtitle1: { fontSize: 18 },
      body1: { fontSize: 14.5 },
    },
  });
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </StyledEngineProvider>
  );
};

export default ThemeContainer;
