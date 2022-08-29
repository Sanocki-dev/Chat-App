import { Edit } from "@mui/icons-material";
import { Box, IconButton, Paper, Typography } from "@mui/material";
import React, { useContext } from "react";

import UserContext from "../store/userContext";
import Avatar from "./general/Avatar";

function UserDetail({ user }) {
  const { updateUsername } = useContext(UserContext);

  const editUser = () => {
    updateUsername('Mike')
  };

  return (
    <Box
      component={Paper}
      sx={{
        position: "absolute",
        width: 300,
        pb: 3,
        left: "50%",
        top: "50%",
        transform: "translate(-50%,-50%)",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Box height={125}>
        <Avatar id={user?.id} sx={{ transform: "scale(4)" }} />
      </Box>
      <IconButton
        onClick={editUser}
        sx={{ position: "absolute", right: 10, top: 10 }}
      >
        <Edit />
      </IconButton>
      <Typography variant="caption">Display name</Typography>
      <Typography variant="h4">{user?.user}</Typography>
    </Box>
  );
}

export default UserDetail;
