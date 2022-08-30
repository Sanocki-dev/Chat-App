import React, { useState } from "react";
import { Box, Button, Collapse, Paper, Typography } from "@mui/material";
import Avatar from "./general/Avatar";
import UserDetail from "./UserDetail";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

function SideBar({ fullWidth, data, id }) {
  const [edit, setEdit] = useState(false);
  const [open, setOpen] = useState(!fullWidth);
  const padding = { px: 3, py: 2 };

  const onUserClick = (clicked) => {
    // This is not the user so dont do anything
    if (id !== clicked) return;
    setEdit(true);
  };

  return (
    <Box
      sx={{
        width: fullWidth ? "100%" : "15%",
        minWidth: 200,
        bgcolor: "background.secondary",
        overflow: "hidden",
        borderTopLeftRadius: 12,
      }}
    >
      {edit && (
        <UserDetail
          onClose={() => setEdit(false)}
          user={data?.users.find((user) => user.id === id)}
        />
      )}

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
      {fullWidth && (
        <Button fullWidth onClick={() => setOpen((a) => !a)}>
          Show Chat List{open ? <ExpandLess /> : <ExpandMore />}
        </Button>
      )}
      <Collapse in={open}>
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
      </Collapse>
    </Box>
  );
}

export default SideBar;
