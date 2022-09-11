import React from "react";
import { motion } from "framer-motion";
import { Container } from "@mui/material";
import FullWidthTabs from "../components/FullWidthTabs";

export const History = () => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Container className="center" maxWidth="lg" sx={{ paddingTop: "130px" }}>
        <FullWidthTabs />
      </Container>
    </motion.main>
  );
};
