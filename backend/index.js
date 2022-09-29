const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require("path");
// const Gun = require("gun");
const port = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("/api", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("update", (data) => {
    console.log("data: " + data);
    socket.broadcast.emit("update", data);
  });
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
