import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Blockchain } from "../ts/blockchain";
import CustomLinkify from "../components/CustomLinkify";
import { ChatInput } from "../components/ChatInput";
import TipDialog from "../components/FormDialog";

import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

// TODO また、ペンディングトランザクションを他のノードと共有したほうがいいかもしれない。正確な情報はわからないが、全てのトランザクションが処理されるためには、全てのノードがペンディングトランザクションを共有している必要がありそうだ。

export const Chat = (props) => {
  const { blockchain, wallet, gun } = props;
  const location = useLocation();
  const search = location.search;
  const query = new URLSearchParams(search);

  const [transactions, setTransactions] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    gun.get("blockchain").once((data) => {
      const parsedBlockchain = Blockchain.jsonToBlockchain(data.blockchain);
      // parsedBlockchain.selfDestruct();
      blockchain.replaceChain(parsedBlockchain.chain);

      setTransactions(
        blockchain.getTransactionsBetweenTwo(
          wallet.publicKey,
          query.get("address")
        )
      );
    });
  }, [blockchain, transactions, wallet.publicKey]);

  const submit = (e) => {
    console.log("submit");
    e.preventDefault();

    const { address, message, amount } = e.target;
    if (!message.value) return false;

    try {
      // TODO この下のマイニングはそのうち、マイニングページに移動させる
      // TODO つまり、メッセージの送信と同時にマイニングすることを中止する
      // TODO デバッグの関係でマイニングしたのであって、本来の形ではない。今にプログラムのままだと、チェーンの置き換えの際に、一部のトランザクションが消滅してしまう。
      blockchain.minePendingTransactions(wallet.publicKey);
      const trans = wallet.createTransaction(
        address.value,
        10,
        message.value,
        {}
      );
      blockchain.addTransaction(trans);
      blockchain.minePendingTransactions(wallet.publicKey);
      console.log(blockchain);
      // blockchain.selfDestruct();
      gun.get("blockchain").put({ blockchain: JSON.stringify(blockchain) });
      message.value = "";
    } catch (error) {
      if (error.message === "Invalid message") {
        window.alert(
          "不適切な言葉が含まれている可能性があります。\n文章を改めて送信してください。"
        );
      }
    }
  };

  return (
    <>
      <motion.main
        className="chat-main"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div style={{padding: "50px"}}></div>
        {transactions.map((transaction, index) =>
          transaction.from === wallet.publicKey ? (
            <div className="chat-right-wrapper" key={index}>
              <div className="chat-sentence">
                <CustomLinkify content={transaction.message} />
              </div>
              <small className="chat-timestamp">
                {`${new Date(transaction.timestamp).getMonth() + 1}月${new Date(
                  transaction.timestamp
                ).getDate()}日${new Date(
                  transaction.timestamp
                ).getHours()}時${new Date(
                  transaction.timestamp
                ).getMinutes()}分`}
              </small>
            </div>
          ) : transaction.from === query.get("address") ? (
            <div className="chat-left-wrapper" key={index}>
              <div className="chat-sentence">
                <CustomLinkify content={transaction.message} />
              </div>
              <TipDialog></TipDialog>
              
              {/* <button
                style={{ display: "inline" }}
                className="btn btn-outline-danger tip-btn"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasBottom"
                aria-controls="offcanvasBottom"
                onClick={() => setMessage(transaction.message)}
              >
                <i style={{ fontSize: "14px" }} className="bi bi-heart"></i>
              </button> */}
              <small className="chat-timestamp">
                {`${new Date(transaction.timestamp).getMonth() + 1}月${new Date(
                  transaction.timestamp
                ).getDate()}日${new Date(
                  transaction.timestamp
                ).getHours()}時${new Date(
                  transaction.timestamp
                ).getMinutes()}分`}
              </small>
            </div>
          ) : (
            <React.Fragment key={index}></React.Fragment>
          )
        )}
        {/* <div
          className="offcanvas offcanvas-bottom"
          tabIndex="-1"
          id="offcanvasBottom"
          aria-labelledby="offcanvasBottomLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasBottomLabel">
              このメッセージにKUGreenを送る
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body small">
            メッセージ：
            <strong>
              <em>"{message}"</em>
            </strong>
            <div className="input-group mt-3">
              <select
                className="form-select"
                id="inputGroupSelect04"
                aria-label="Example select with button addon"
              >
                <option value="100">100</option>
                <option value="500">500</option>
                <option value="1000">1000</option>
              </select>
              <button className="btn btn-outline-secondary" type="button">
                送信
              </button>
            </div>
            残念ながら、この機能はまだ実装されていません。
          </div>
        </div> */}
      </motion.main>
      <motion.footer
        className="chat-footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <form onSubmit={(e) => submit(e)}>
          <ChatInput className="chat-input" name="message" autoFocus />
          <input
            type="text"
            className="form-control"
            name="address"
            value={query.get("address") || ""}
            style={{ display: "none" }}
            readOnly
          />
          <input
            type="text"
            className="form-control"
            name="amount"
            value="100"
            style={{ display: "none" }}
            readOnly
          />

          <Button
            variant="contained"
            color="success"
            type="submit"
            endIcon={<SendIcon />}
          >
            Send
          </Button>
        </form>
      </motion.footer>
    </>
  );
};
