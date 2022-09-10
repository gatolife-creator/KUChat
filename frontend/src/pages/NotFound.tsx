import { motion } from "framer-motion";
import { Fibonacci } from "../components/Script/Fibonacci";
import { ManyTriangles } from "../components/Script/ManyTriangles";
import { PerpendicularBisector } from "../components/Script/PerpendicularBisector";
import { Container } from "@mui/material";
import React from "react";

export const NotFound = () => {
  const random = (Math.random() * 3) | 0;

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Container maxWidth="lg" sx={{ paddingTop: "100px" }}>
        {random === 0 ? (
          <Fibonacci />
        ) : random === 1 ? (
          <ManyTriangles />
        ) : random === 2 ? (
          <PerpendicularBisector />
        ) : (
          <></>
        )}
      </Container>
    </motion.main>
  );
};
