const path = require("path");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const dotenv = require("dotenv");

const geocode = require("./utils/geocode");
const { generateMessage } = require("./utils/messages");
const {
  addUser,
  getUsersInRoom,
  removeUser,
  updateUser,
  getUser,
} = require("./utils/users");

dotenv.config();
const app = express();
const server = http.createServer(app); // Created the server ourselves to be able to set up the io
const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
}); // Passes the server we created

const port = process.env.PORT || 8000;

app.use(express.json()); // Automatically parses incoming data to json

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, "../client/build")));

io.set('transports',['websocket']);

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
      generateMessage({
        id: newUser.id,
        user: newUser.user + " has joined the chat!",
      })
    );
    socket.broadcast.to(room).emit(
      "message",
      generateMessage({
        id: newUser.id,
        user: newUser.user + " has joined the chat!",
      })
    ); // sends to everyone but the one that called it

    io.to(newUser.room).emit("roomData", {
      room: newUser.room,
      users: getUsersInRoom(newUser.room),
    });

    callback();
  });

  socket.on("sendMessage", (text, callback) => {
    const data = getUser(socket.id);

    if (!data) {
      return;
    }
    const { user, id, room } = data;

    if (text.toLowerCase().includes("lebatts")) {
      io.to(room).emit("message", message.replace("lebatts", "ceaser"));
      return callback("Dont say that!");
    }

    io.to(room).emit(
      "message",
      generateMessage({
        id,
        user,
        text,
      })
    );
    callback("Delivered!");
  });

  socket.on("updateUsername", async (username) => {
    const { id, user, room } = getUser(socket.id);
    const updated = updateUser(id, username);

    if (!updated) {
      return;
    }

    io.to(room).emit(
      "message",
      generateMessage({
        id,
        user: `${user} has updated their name to ${updated}`,
      })
    );
    io.to(room).emit("roomData", {
      room: room,
      users: getUsersInRoom(room),
    });
  });

  socket.on("shareLocation", async (location, callback) => {
    const data = getUser(socket.id);
    if (!data) {
      return;
    }

    const { user, id, room } = data;
    const res = await geocode(location);

    io.to(room).emit(
      "message",
      generateMessage({
        id,
        user,
        text: res.name,
        link: `https://www.google.com/maps/place/${location}`,
      })
    );
    callback("Location Shared!");
  });

  // Built in event
  socket.on("disconnect", () => {
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit(
        "message",
        generateMessage({
          id: user.id,
          user: user.user + " has left the chat!",
        })
      );

      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });
});

app.get("/clear", (req, res) => {});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

server.listen(port, () => {
  console.log("Server is running on port " + port);
});
