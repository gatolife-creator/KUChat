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
      <div className="container">
        <div style={{ marginTop: "100px" }} className="card">
          <h5 className="card-header">Wallet</h5>
          <div className="card-body">
            <div className="box26">
              <span className="box-title">KUGreen 保持量</span>
              <h1>{wallet.getBalance()} KUG</h1>
            </div>
            <div className="box26">
              <span className="box-title">QRコード</span>
                <QRCodeSVG value={wallet.publicKey}></QRCodeSVG>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
};
