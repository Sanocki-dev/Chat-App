import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { useNavigate, useParams } from "react-router-dom";

import ChatRoom from "./ChatRoom";
import Loading from "../components/Loading";
import UserContext from "../store/userContext";

function JoinRoom() {
  const { username } = useContext(UserContext);
  const [socket, setSocket] = useState(null);
  const { room } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const url =
      process.env.NODE_ENV === "development"
        ? `http://${window.location.hostname}:8000`
        : "/";
    const newSocket = io(url);
    setSocket(newSocket);

    // Tries to connect to the room using the room and username
    newSocket.emit("join", { user: username, room }, (error) => {
      if (error) navigate("/");
    });

    return () => newSocket.close();
  }, [navigate, room, setSocket, username]);

  return socket ? <ChatRoom socket={socket} /> : <Loading size={155} />;
}

export default JoinRoom;
