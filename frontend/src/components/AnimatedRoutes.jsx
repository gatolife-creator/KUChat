import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Home } from "../pages/Home";
import { About } from "../pages/About";
import { Contacts } from "../pages/Contacts";
import { Chat } from "../pages/Chat";

export const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </AnimatePresence>
  );
};