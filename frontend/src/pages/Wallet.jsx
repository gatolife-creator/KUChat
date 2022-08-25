import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { CopyToClipboard } from "react-copy-to-clipboard";

export const WalletView = (props) => {
  const { wallet } = props;
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
            <div className="box26">
              <span className="box-title">アドレス</span>
              <CopyToClipboard
                text={wallet.publicKey}
                onCopy={() =>
                  alert(
                    `クリップボードに アドレス をコピーしました！`
                  )
                }
              >
                <button
                  className="btn btn-outline-secondary me-3"
                  style={{ display: "inline" }}
                >
                  <i className="bi bi-link-45deg"></i>
                </button>
              </CopyToClipboard>
              <small
                className="text-truncate"
                style={{
                  display: "inline-block",
                  maxWidth: "90%",
                  verticalAlign: "middle",
                }}
              >
                {wallet.publicKey}
              </small>
            </div>
          </div>
        </div>
      </div>
    </motion.main>
  );
};
