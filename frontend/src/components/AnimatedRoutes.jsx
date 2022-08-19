import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Home } from "../pages/Home";
import { About } from "../pages/About";
import { Signin } from "../pages/Signin";
import { Contacts } from "../pages/Contacts";
import { Chat } from "../pages/Chat";
import { WalletView } from "../pages/Wallet";

import { Blockchain } from "../js/blockchain";
import { Wallet } from "../js/wallet";

const blockchain = new Blockchain();
const wallet = new Wallet(blockchain);

export const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route
          path="/chat"
          element={<Chat blockchain={blockchain} wallet={wallet} />}
        />
        <Route path="/signin" element={<Signin />} />
        <Route path="/wallet" element={<WalletView wallet={wallet} />} />
      </Routes>
    </AnimatePresence>
  );
};
