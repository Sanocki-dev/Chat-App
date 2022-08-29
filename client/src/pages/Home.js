import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../components/general/Input";

function Home() {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    user: { value: "", isValid: true },
    room: { value: "", isValid: true },
  });

  const onChangeHandler = (e) => {
    console.log(e);
    setInput((current) => ({
      ...current,
      [e.target.name]: { value: e.target.value, isValid: true },
    }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    navigate(`/room/${input.user.value}/${input.room.value}`);
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
          // width: 500,
          // height: 500,
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
            label="Username"
            error={!input.user.isValid}
            errorMessage={"Error here man oh man"}
            name="user"
            placeholder="Username"
            value={input.user.value}
            onChange={onChangeHandler}
          />
          <Input
            label="Room ID"
            fullWidth
            error={!input.room.isValid}
            name="room"
            placeholder="Server ID"
            value={input.room.value}
            onChange={onChangeHandler}
            helperText={"Enter a username"}
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
