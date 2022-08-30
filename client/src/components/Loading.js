import React from "react";
import { Box } from "@mui/material";
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";

function Loading({ size }) {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          position: "relative",
        }}
      >
        <CircularProgress
          variant="determinate"
          size={size}
          thickness={4}
          value={100}
          sx={{
            color: (theme) =>
              theme.palette.grey[theme.palette.mode === "light" ? 300 : 800],
          }}
        />
        <CircularProgress
          variant="indeterminate"
          disableShrink
          sx={{
            color: (theme) =>
              theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
            animationDuration: "520ms",
            position: "absolute",
            left: 0,
            [`& .${circularProgressClasses.circle}`]: {
              strokeLinecap: "round",
            },
          }}
          size={size}
          thickness={4}
        />
      </Box>
    </Box>
  );
}

export default Loading;
