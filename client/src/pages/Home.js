import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../components/general/Input";
import UserContext from "../store/userContext";

function Home() {
  const navigate = useNavigate();
  const { createConnection } = useContext(UserContext);

  const [input, setInput] = useState({
    user: { value: "", isValid: true },
    room: { value: "", isValid: true },
  });

  const onChangeHandler = (e) => {
    setInput((current) => ({
      ...current,
      [e.target.name]: { value: e.target.value, isValid: true },
    }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    const isValidName = input.user.value.trim().length !== 0;
    const isRoomName = input.room.value.trim().length !== 0;

    if (!isValidName || !isRoomName) {
      setInput((current) => ({
        user: { value: current.user.value, isValid: isValidName },
        room: { value: current.room.value, isValid: isRoomName },
      }));
      return;
    }
    
    const error = createConnection(input.user.value, input.room.value);
    if (!error) {
      navigate(`/${input.room.value}`);
    }
  };

  return (
    <Box
      component={"form"}
      onSubmit={onSubmitHandler}
      sx={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        component={Paper}
        sx={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "space-evenly",
          p: 4,
        }}
        elevation={5}
      >
        <Typography variant="h4" mb={3} fontWeight="bolder">
          Join a room
        </Typography>
        <Stack width="100%" gap={3}>
          <Input
            fullWidth
            label="Display name"
            error={!input.user.isValid}
            errorMessage={"Invalid Username"}
            name="user"
            placeholder="Display name"
            value={input.user.value}
            onChange={onChangeHandler}
          />
          <Input
            label="Room ID"
            fullWidth
            error={!input.room.isValid}
            name="room"
            placeholder="Room"
            value={input.room.value}
            errorMessage={"Invalid Room ID"}
            onChange={onChangeHandler}
          />
          <Button variant="contained" type="submit" fullWidth>
            Join
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

export default Home;
