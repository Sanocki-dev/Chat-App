import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  amber,
  blue,
  deepOrange,
  green,
  grey,
  indigo,
  red,
} from "@mui/material/colors";
import { IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";

import Home from "./pages/Home";
import ChatRoom from "./pages/ChatRoom";

const getTheme = (mode) => ({
  palette: {
    mode,
    ...(mode === "dark"
      ? {
          primary: {
            main: blue[500],
            dark: red[900],
          },
          secondary: {
            main: red[500],
          },
          background: {
            main: "#36393f",
            secondary: "#2f3136",
            dark: "#292b2f",
            darkest: "#202225",
            input: "#40444b",
          },
          text: {
            link: blue[200],
          },
        }
      : {
          primary: {
            main: blue[500],
          },
          secondary: {
            main: red[800],
          },
          background: {
            main: "#fff",
            secondary: "#f5f5f5",
            dark: "#f3f3f3",
            darkest: "#c1c1c1",
            input: "#40444b",
          },
          text: {
            primary: grey[900],
            secondary: grey[800],
            link: blue[900],
          },
        }),
    // primary: {
    //   ...amber,
    //   ...(mode === "dark" && {
    //     main: amber[300],
    //   }),
    // },
    // ...(mode === "dark" && {
    //   background: {
    //     default: deepOrange[900],
    //     paper: deepOrange[900],
    //   },
    // }),
    // text: {
    //   ...(mode === "light"
    //     ? {
    //         primary: grey[900],
    //         secondary: grey[800],
    //       }
    //     : {
    //         primary: "#fff",
    //         secondary: grey[500],
    //       }),
    // },
  },
});

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const darkModeTheme = createTheme(getTheme(darkMode ? "dark" : "light"));

  const darkTheme = createTheme(darkModeTheme);
  //   {
  //   palette: {
  //     mode: darkMode ? "dark" : "light",
  //     primary: {
  //       main: blue[500],
  //       dark: indigo[900],
  //     },
  //     background: {
  //       main: "#36393f",
  //       secondary: "#2f3136",
  //       dark: "#292b2f",
  //       darkest: "#202225",
  //       input: "#40444b",
  //     },
  //   },
  // }

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
          <Route path="/:room" element={<ChatRoom />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
