import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Home } from "../pages/Home";
import { Signin } from "../pages/Signin";
import { Signup } from "../pages/Signup";
import { Contacts } from "../pages/Contacts";
import { Chat } from "../pages/Chat";
import { WalletView } from "../pages/Wallet";
import { MessageSearch } from "../pages/MessageSearch";
import { TransactionsView } from "../pages/TransactionsView";
import { HowToUse } from "../pages/HowToUse";
import { NotFound } from "../pages/NotFound";

import { QRCodeReaderPage } from "../pages/QRCodeReaderPage";

import { Blockchain } from "../ts/blockchain";
import { Wallet } from "../ts/wallet";

import Gun from "gun";
import { createWorkerFactory } from "@shopify/react-web-worker";
import React from "react";

const gun = Gun({
  peers: [`${window.location.origin}/gun`],
});

const blockchain = new Blockchain();
let wallet;
if (localStorage.getItem("privateKey")) {
  wallet = Wallet.restoreWalletFromPrivateKey(
    localStorage.getItem("privateKey")!,
    blockchain
  );
} else {
  wallet = new Wallet(blockchain);
  localStorage.setItem("privateKey", wallet.keyPair.getPrivate("hex"));
}
gun.get("blockchain").once((data) => {
  if (!data) {
    gun.get("blockchain").put({ blockchain: JSON.stringify(blockchain) });
  }
});

const createWorker = createWorkerFactory(() => import("../ts/worker"));

export const AnimatedRoutes = () => {
  const location = useLocation();
  // const [receivedBlockchain, setReceivedBlockchain] = useState([]);

  useEffect(() => {
    gun.get("blockchain").on((data) => {
      const parsedBlockchain = Blockchain.jsonToBlockchain(data.blockchain);
      blockchain.replaceChain(parsedBlockchain.chain);
      console.log(blockchain);
    });
  }, []);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/contacts" element={<Contacts wallet={wallet} />} />
        <Route
          path="/chat"
          element={
            <Chat
              blockchain={blockchain}
              wallet={wallet}
              gun={gun}
              createWorker={createWorker}
            />
          }
        />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/wallet" element={<WalletView wallet={wallet} />} />
        <Route path="/qrcode-reader" element={<QRCodeReaderPage />} />
        <Route
          path="/message-search"
          element={
            <MessageSearch
              blockchain={blockchain}
              createWorker={createWorker}
            />
          }
        />
        <Route
          path="/transactions-view"
          element={<TransactionsView blockchain={blockchain} />}
        />
        <Route path="how-to-use" element={<HowToUse />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};
