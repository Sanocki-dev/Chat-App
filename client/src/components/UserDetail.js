import { Close, Edit, Save } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputAdornment,
  Paper,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import UserContext from "../store/userContext";
import Avatar from "./general/Avatar";
import Input from "./general/Input";

function UserDetail({ user, onClose }) {
  const { socket, createConnection } = useContext(UserContext);
  const [editMode, setEditMode] = useState(!user);
  const [username, setUsername] = useState(!user ? "" : user.user);
  const { room } = useParams();

  useEffect(() => {
    setEditMode(!user);
    setUsername(!user ? "" : user.user);
  }, [user]);

  const saveUser = (e) => {
    e.preventDefault();

    if (!username || username.trim() === 0) return;

    if (!socket) {
      return createConnection(username, room);
    }
    socket.emit("updateUsername", username);
    setEditMode(false);
  };

  const onChangeHandler = (e) => {
    setUsername(e.target.value);
  };

  const onCloseHandler = () => {
    if (editMode) {
      return setEditMode(false);
    }

    onClose();
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
        backgroundColor: "background.secondary",
      }}
    >
      <Box height={125}>
        <Avatar id={user?.id} sx={{ transform: "scale(4)" }} />
      </Box>
      <IconButton
        onClick={onCloseHandler}
        sx={{ position: "absolute", right: 10, top: 10 }}
      >
        <Close />
      </IconButton>
      <Box position={"relative"}>
        <Typography variant="caption">Display name</Typography>
        <IconButton
          sx={{ position: "absolute", top: -10, right: -50 }}
          size="small"
          onClick={() => setEditMode((current) => !current)}
        >
          <Edit />
        </IconButton>
      </Box>
      {/* If there is no username yet or they click on the edit button */}
      {!user || editMode ? (
        <Box component="form" onSubmit={saveUser}>
          <Input
            value={username}
            autoFocus
            onChange={onChangeHandler}
            endAdornment={
              <InputAdornment position="start">
                <IconButton
                  color="secondary"
                  edge="end"
                  aria-label="share location"
                  onClick={saveUser}
                >
                  <Save />
                </IconButton>
              </InputAdornment>
            }
          >
            {username}
          </Input>
        </Box>
      ) : (
        <Typography variant="h4" mx="auto">
          {username}
        </Typography>
      )}
    </Box>
  );
}

export default UserDetail;
