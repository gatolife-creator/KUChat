// NOTE どうもチャットのところにしかkatanaを設置していないから、ブロックチェーンの更新を検知できないらしい

const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const path = require("path");
const port = process.env.PORT || 3001;

import { Socket } from "socket.io";
import { Blockchain } from "../backend/blockchain/blockchain";

const blockchain = new Blockchain();

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("/api", (req: any, res: any) => {
  res.json({ blockchain: blockchain });
});

app.get("*", (req: any, res: any) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

io.on("connection", (socket: Socket) => {
  // NOTE サーバーの応答速度を早めるつもりでやってみたsetTimeout
  setTimeout(() => {
    if (blockchain) socket.broadcast.emit("update", { key: "key", value: JSON.stringify(blockchain) });
  }, 1000)

  socket.on("update", (data: any) => {
    try {
      // NOTE ブロックチェーンの交換のせいで、一部のトランザクションが消滅する事態が発生しているかもしれない
      blockchain.replaceChain(Blockchain.jsonToBlockchain(data.value));
      socket.broadcast.emit("update", { key: "key", value: JSON.stringify(blockchain) });
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.warn(err.message);
      }
    }
  });
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
