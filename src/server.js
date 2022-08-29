const path = require("path");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");

const geocode = require("./utils/geocode");
const { generateMessage } = require("./utils/messages");
const {
  addUser,
  getUsersInRoom,
  removeUser,
  getUser,
} = require("./utils/users");

const app = express();
const server = http.createServer(app); // Created the server ourselves to be able to set up the io
const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
}); // Passes the server we created

const port = process.env.PORT;
app.use(express.json()); // Automatically parses incoming data to json

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));

io.on("connection", (socket) => {
  console.log("New WebSocket Connection!");

  socket.on("join", ({ user, room }, callback) => {
    const { error, newUser } = addUser({ id: socket.id, user, room });
    if (error) {
      return callback(error);
    }

    socket.join(newUser.room);
    socket.emit(
      "message",
      generateMessage(newUser.user + " has joined the chat!")
    );
    socket.broadcast
      .to(room)
      .emit("message", generateMessage(newUser.user + " has joined the chat!")); // sends to everyone but the one that called it

    io.to(newUser.room).emit("roomData", {
      room: newUser.room,
      users: getUsersInRoom(newUser.room),
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const { room, user } = getUser(socket.id);

    if (message.toLowerCase().includes("lebatts")) {
      io.to(room).emit("message", message.replace("lebatts", "ceaser"));
      return callback("Dont say that!");
    }

    io.to(room).emit("message", generateMessage(user, message));
    callback("Delivered!");
  });

  socket.on("shareLocation", async (location, callback) => {
    const { room, user } = getUser(socket.id);

    let res = await geocode(location);
    io.to(room).emit(
      "message",
      generateMessage(
        user,
        res.name,
        `https://www.google.com/maps/place/${location}`
      )
    );
    callback("Location Shared!");
  });

  // Built in event
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit(
        "message",
        generateMessage(user.user + " has left the chat!")
      );

      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

app.get("/hello", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});


server.listen(port, () => {
  console.log("Server is running on port " + port);
});
