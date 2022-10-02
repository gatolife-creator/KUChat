import { motion } from "framer-motion";
import React from "react";
import QRCodeReader from "../components/QRCodeReader";

export const QRCodeReaderPage = () => {
  return (
    <motion.main>
      <div className="qrcode-reader-wrapper">
        <QRCodeReader />
      </div>
    </motion.main>
  );
};
