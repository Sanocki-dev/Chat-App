import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import Home from "./pages/Home";
import ChatRoom from "./pages/ChatRoom";
import { blue, indigo } from "@mui/material/colors";
import { IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const darkTheme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: blue[500],
        dark: indigo[900],
      },
      background: {
        main: "#36393f",
        secondary: "#2f3136",
        dark: "#292b2f",
        darkest: "#202225",
        input: "#40444b",
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <IconButton
        sx={{ position: "absolute", right: 10, top: 10 }}
        onClick={() => setDarkMode((cur) => !cur)}
      >
        {darkMode ? <Brightness4 /> : <Brightness7 />}
      </IconButton>
      <BrowserRouter>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/:room/:user" element={<ChatRoom />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
