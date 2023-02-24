import { createContext, useState } from "react";
import io from "socket.io-client";

const UserContext = createContext({
  username: "Mike",
  socket: null,
  createConnection: () => {},
  updateUsername: (newName) => {},
});

export const UserContextProvider = (props) => {
  const [username, setUsername] = useState("Mike");
  const [socket, setSocket] = useState();

  const updateUsername = (newName) => {
    setUsername(newName);
  };

  const createConnection = (user, room) => {
    const url =
      process.env.NODE_ENV === "development"
        ? `http://${window.location.hostname}:8000`
        : "/";

    const newSocket = io(url, { transports: ["websocket"], upgrade: false });
    setSocket(newSocket);
    setUsername(user);

    // Tries to connect to the room using the room and username
    newSocket.emit("join", { user, room }, (error) => {
      if (error) return "Could not join!";
    });
  };

  return (
    <UserContext.Provider
      value={{ updateUsername, username, createConnection, socket }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
