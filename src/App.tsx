import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import React, { useState } from "react";
import "../src/Styles/App.css";
import { GlobalContext } from "./Context/GlobalContext";
import { Main } from "./Pages/Main/Main";

export const App = () => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  const customTheme = {
    fontFamily: "Inter",
    colorScheme: colorScheme,
  };

  return (
    <div className="App">
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider theme={customTheme}>
          <GlobalContext>
            <Main />
          </GlobalContext>
        </MantineProvider>
      </ColorSchemeProvider>
    </div>
  );
};

export default App;
