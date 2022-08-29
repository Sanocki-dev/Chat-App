const path = require("path");
const express = require("express");
const http = require('http');

const app = express();
const server = http.createServer(app)

const port = process.env.PORT;
const cors = require("cors");
const publicPath = path.join(__dirname, "../public");

app.use(cors());
app.use(express.json()); // Automatically parses incoming data to json
app.use(express.static(publicPath));

server.listen(port, () => {
  console.log("Server is running on port " + port);
});
