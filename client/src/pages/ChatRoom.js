import React, { useEffect, useState } from "react";
import io from "socket.io-client";

import Messages from "../components/Messages";
import Loading from "../components/Loading";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";

function ChatRoom() {
  const [socket, setSocket] = useState(null);
  const { user, room } = useParams();

  useEffect(() => {}, []);

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:8000`);
    setSocket(newSocket);

    newSocket.emit("join", { user, room }, (error) => {
      console.log(error);
    });

    return () => newSocket.close();
  }, [room, setSocket, user]);

  return (
    <Box>{socket ? <Messages socket={socket} /> : <Loading size={155} />}</Box>
  );
}

export default ChatRoom;
