import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useNavigate, useParams } from "react-router-dom";

import Messages from "../components/Messages";
import Loading from "../components/Loading";

function ChatRoom() {
  const [socket, setSocket] = useState(null);
  const { user, room } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const url = process.env.NODE_ENV === 'development' ? `http://${window.location.hostname}:8000` : '/'
    const newSocket = io(url);
    setSocket(newSocket);

    // Tries to connect to the room using the room and username
    newSocket.emit("join", { user, room }, (error) => {
      if (error) navigate("/", { state: error });
    });

    return () => newSocket.close();
  }, [navigate, room, setSocket, user]);

  return socket ? <Messages socket={socket} /> : <Loading size={155} />;
}

export default ChatRoom;
