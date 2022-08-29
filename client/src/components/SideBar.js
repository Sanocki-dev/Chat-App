import React, { useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import Avatar from "./general/Avatar";
import UserDetail from "./UserDetail";

function SideBar({ data, id }) {
  const [edit, setEdit] = useState(true);
  const padding = { px: 3, py: 2 };

  const onUserClick = (clicked) => {
    // This is not the user so dont do anything
    if (id !== clicked) return;
    setEdit(true);
  };
  return (
    <Box
      sx={{
        width: "15%",
        minWidth: 200,
        bgcolor: "background.secondary",
        overflow: "hidden",
        borderTopLeftRadius: 12,
      }}
    >
      <UserDetail user={data?.users.find((user) => user.id === id)} />

      {/* Display the room name */}
      <Box
        component={Paper}
        elevation={3}
        sx={{
          ...padding,
          bgcolor: "background.secondary",
          borderRadius: 0,
        }}
      >
        <Typography variant="h6">{data?.room}</Typography>
      </Box>

      {/* Map the users in the room */}
      {data?.users.map(({ user, id }, index) => (
        <Box
          key={index}
          sx={{
            mt: 1.5,
            px: 3,
            mx: 1,
            borderRadius: 2,
            py: 1,
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            "&:hover": {
              bgcolor: "background.darkest",
            },
          }}
          onClick={() => onUserClick(id)}
        >
          <Avatar id={id} />
          <Typography ml={2} color="primary.main">
            {user}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

export default SideBar;
