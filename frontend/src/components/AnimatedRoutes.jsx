import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Home } from "../pages/Home";
import { About } from "../pages/About";
import { Signin } from "../pages/Signin";
import { Contacts } from "../pages/Contacts";
import { Chat } from "../pages/Chat";
import { WalletView } from "../pages/Wallet";
import { MessageSearch } from "../pages/MessageSearch";
import { NotFound } from "../pages/NotFound";

import { QRCodeReaderPage } from "../pages/QRCodeReaderPage";

import { Blockchain } from "../js/blockchain";
import { Wallet } from "../js/wallet";

import Gun from "gun";

const gun = Gun({
  peers: [
    "http://localhost:3001/gun",
    "https://kuchat.herokuapp.com/gun",
    "https://kuchat-test.herokuapp.com/gun",
  ],
});

const blockchain = new Blockchain();
let wallet;
if (localStorage.getItem("privateKey")) {
  wallet = Wallet.restoreWalletFromPrivateKey(
    localStorage.getItem("privateKey"),
    blockchain
  );
} else {
  wallet = new Wallet(blockchain);
  localStorage.setItem("privateKey", wallet.keyPair.getPrivate("hex"));
}

export const AnimatedRoutes = () => {
  const location = useLocation();
  const [receivedBlockchain, setReceivedBlockchain] = useState([]);

  useEffect(() => {
    gun.get("blockchain").once((data) => {
      const parsedBlockchain = Blockchain.jsonToBlockchain(data.blockchain);
      // parsedBlockchain.selfDestruct();
      blockchain.replaceChain(parsedBlockchain.chain);
      console.log(blockchain);
      setReceivedBlockchain(parsedBlockchain);
    });
  }, []);

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts wallet={wallet} />} />
        <Route
          path="/chat"
          element={<Chat blockchain={blockchain} wallet={wallet} gun={gun} />}
        />
        <Route path="/signin" element={<Signin />} />
        <Route path="/wallet" element={<WalletView wallet={wallet} />} />
        <Route path="/qrcode-reader" element={<QRCodeReaderPage />} />
        <Route
          path="/message-search"
          element={<MessageSearch blockchain={blockchain} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};
