import { motion } from "framer-motion";
import QRCodeReader from "../components/QRCodeReader";

export const QRCodeReaderPage = () => {
  return (
    <motion.main>
      {/* <div className="container"> */}
      <div className="qrcode-reader-wrapper">
        <QRCodeReader />
      </div>
      {/* </div> */}
    </motion.main>
  );
};
