// NOTE どうもチャットのところにしかkatanaを設置していないから、ブロックチェーンの更新を検知できないらしい

const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require("path");
const port = process.env.PORT || 3001;

import { Blockchain } from "../backend/blockchain/blockchain";

const blockchain = new Blockchain();
let blockchainStr: string;

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("/api", (req: any, res: any) => {
  res.json({ message: "Hello World!" });
});

app.get("*", (req: any, res: any) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

io.on("connection", (socket: any) => {
  if (blockchainStr) socket.broadcast.emit("update", blockchainStr);

  socket.on("update", (data: any) => {
    try {
      blockchainStr = data.value;
      // NOTE ブロックチェーンの交換のせいで、一部のトランザクションが消滅する事態が発生しているかもしれない
      blockchain.replaceChain(Blockchain.jsonToBlockchain(blockchainStr).chain);
      socket.broadcast.emit("update", { key: "key", value: JSON.stringify(blockchain) });
    } catch (err: any) {
      console.warn(err.message);
    }
  });
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
