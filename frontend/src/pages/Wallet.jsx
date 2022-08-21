import { motion } from "framer-motion";

export const WalletView = (props) => {
  const { wallet } = props;
  console.log(wallet.getBalance());
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {wallet.publicKey}
      <h1>{wallet.getBalance()}</h1>
    </motion.main>
  );
};
