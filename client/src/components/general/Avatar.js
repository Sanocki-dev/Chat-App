import { Box, Avatar as MuiAvatar } from "@mui/material";
import React from "react";

function Avatar({ id, sx, size }) {
  return (
    <MuiAvatar sx={{...sx}}>
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
