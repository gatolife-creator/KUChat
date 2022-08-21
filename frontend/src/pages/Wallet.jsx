import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";

export const WalletView = (props) => {
  const { wallet } = props;
  console.log(wallet.getBalance());
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <QRCodeSVG value={"/chat?address=" + wallet.publicKey}></QRCodeSVG>
      <h1>{wallet.getBalance()}</h1>
    </motion.main>
  );
};
