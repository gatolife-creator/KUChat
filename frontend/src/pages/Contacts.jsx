import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ContactCard } from "../components/ContactCard";
import QRCodeReader from "../components/QRCodeReader";

export const Contacts = () => {
  console.log("Contacts");
  const [url, setURL] = useState("");
  const [state, setState] = useState(false);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <>
        <div className="container pt-5">
          <div className="input-group flex-nowrap">
            <span className="input-group-text" id="addon-wrapping">
              @
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="addon-wrapping"
              onChange={(e) => setURL(e.target.value)}
            />
            <Link
              to={"/chat?address=" + url}
              className="btn btn-outline-secondary"
              id="button-addon2"
            >
              決定
            </Link>
          </div>
          <p>or</p>
          <Link
            className="btn btn-success"
            to="/qrcode-reader"
            style={{
              display: "block",
              width: "134px",
              height: "134px",
              margin: "0 auto",
              marginBottom: "50px",
            }}
          >
            <i className="bi bi-qr-code-scan" style={{ fontSize: "5em" }}></i>
          </Link>

          <hr />

          <h3 className="mt-2">チャット履歴</h3>
          <div
            style={{ backgroundColor: "lightgray", padding: "50px" }}
            className="list-group"
          >
            <ContactCard
              name="相手のアドレス"
              date="3 days ago"
              message="最新のメッセージ"
            ></ContactCard>
            <ContactCard
              name="相手のアドレス"
              date="3 days ago"
              message="最新のメッセージ"
            ></ContactCard>
            <ContactCard
              name="相手のアドレス"
              date="3 days ago"
              message="最新のメッセージ"
            ></ContactCard>
          </div>
        </div>
      </>
    </motion.main>
  );
};
