// TODO サーバーサイド側にもブロックチェーンを一時的に保持しておきたい。
// TODO もちろん長いチェーンを残したいので。ブロックチェーンのファイルを追加しておく。

const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require("path");
const port = process.env.PORT || 3001;

let blockchain: any;

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("/api", (req: any, res: any) => {
  res.json({ message: "Hello World!" });
});

app.get("*", (req: any, res: any) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

io.on("connection", (socket: any) => {
  if (blockchain) socket.broadcast.emit("update", blockchain);

  socket.on("update", (data: any) => {
    blockchain = data
    socket.broadcast.emit("update", data);
  });
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
