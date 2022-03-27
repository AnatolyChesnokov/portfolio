import { ThemeProvider } from "styled-components";
import { GlobalStyle, theme } from "../src/theme";
import React from "react";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
