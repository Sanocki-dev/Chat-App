import { Box, Avatar as MuiAvatar } from "@mui/material";
import React from "react";

function Avatar({ id, sx, size }) {
  return (
    <MuiAvatar
      sx={{
        backgroundColor: "transparent",
        border: "1px solid",
        borderColor: "primary.main",
        ...sx,
      }}
    >
      <Box
        src={`https://avatars.dicebear.com/api/bottts/${id}.svg`}
        component="img"
        sx={{ height: 30 }}
        alt="avatar"
      />
    </MuiAvatar>
  );
}

export default Avatar;
