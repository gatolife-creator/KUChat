import React from "react";
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

export const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/wallet" element={<WalletView />} />
        <Route path="/qrcode-reader" element={<QRCodeReaderPage />} />
        <Route path="/message-search" element={<MessageSearch />} />
        <Route path="/transactions-view" element={<TransactionsView />} />
        <Route path="how-to-use" element={<HowToUse />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};
