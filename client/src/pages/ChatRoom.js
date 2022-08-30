import React, { useContext, useEffect, useState } from "react";
import { Box, IconButton, Snackbar, Stack, useMediaQuery } from "@mui/material";
import { Close } from "@mui/icons-material";

import SideBar from "../components/SideBar";
import MessageArea from "../components/MessageArea";
import MessageInput from "../components/MessageInput";
import UserContext from "../store/userContext";
import UserDetail from "../components/UserDetail";

const ChatRoom = () => {
  const { socket, createConnection } = useContext(UserContext);
  const [messages, setMessages] = useState([]);
  const [roomData, setRoomData] = useState(null);
  const [alert, setAlert] = useState(false);
  const smBP = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const mdBP = useMediaQuery((theme) => theme.breakpoints.down("md"));

  useEffect(() => {
    if (!socket) return;

    const messageListener = (message) => {
      setMessages((current) => [...current, { ...message }]);
    };

    const updateRoom = (data) => {
      setRoomData(data);
    };

    socket?.on("message", messageListener);
    socket?.on("roomData", updateRoom);

    return () => {
      socket?.off("message", messageListener);
    };
  }, [socket, createConnection]);

  const shareLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const coords = `${latitude},${longitude}`;

        socket.emit("shareLocation", coords, (message) => {});
      },
      () => {
        return setAlert(true);
      }
    );
  };

  if (!socket) return <UserDetail />;

  return (
    <Stack
      direction={mdBP ? "column" : "row"}
      height="100vh"
      width="100%"
      boxSizing="border-box"
      overflow="hidden"
      pl={mdBP ? 0 : 3}
      pt={mdBP ? 0 : 3}
      bgcolor="background.darkest"
    >
      <SideBar fullWidth={mdBP} data={roomData} id={socket.id} />
      <Box
        sx={{
          display: "flex",
          flex:1,
          flexDirection: "column",
          boxSizing: "border-box",
          overflow: "hidden",
          // flexGrow:1,
          width: "100%",
          bgcolor: "background.main",
          py: 3,
          px: 3,
        }}
      >
        <MessageArea messages={messages} />
        <MessageInput socket={socket} shareLocation={shareLocationHandler} />
      </Box>
      <Snackbar
        open={alert}
        message="Unable to share your location."
        autoHideDuration={5000}
        onClose={() => setAlert(false)}
        action={
          <IconButton onClick={() => setAlert(false)}>
            <Close />
          </IconButton>
        }
      />
    </Stack>
  );
};

export default ChatRoom;
