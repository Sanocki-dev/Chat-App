import { createContext, useState } from "react";

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

  const createConnection = () => {};

  return (
    <UserContext.Provider
      value={{ updateUsername, username, createConnection, socket }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
