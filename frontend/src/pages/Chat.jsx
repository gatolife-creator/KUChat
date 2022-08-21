import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import Gun from "gun";
import { Blockchain } from "../js/blockchain";

// TODO チャットのテストをする際、まずはブロックチェーンを用いずに、リアルタイムでコメントのレンダリングができるかどうかをテストする
// TODO また、ペンディングトランザクションを他のノードと共有したほうがいいかもしれない。正確な情報はわからないが、全てのトランザクションが処理されるためには、全てのノードがペンディングトランザクションを共有している必要がありそうだ。

const gun = Gun({
  peers: [
    "http://localhost:3001/gun",
    "https://kuchat.herokuapp.com/gun",
    "https://kuchat-test.herokuapp.com/gun",
  ],
});

export const Chat = (props) => {
  const { blockchain, wallet } = props;
  const location = useLocation();
  const search = location.search;
  const query = new URLSearchParams(search);

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, []);

  useEffect(() => {
    gun.get("blockchain").once((data) => {
      const parsedBlockchain = Blockchain.jsonToBlockchain(data.blockchain);
      blockchain.replaceChain(parsedBlockchain.chain);
      // blockchain.selfDestruct();

      setTransactions(
        blockchain.getTransactionsBetweenTwo(
          wallet.publicKey,
          query.get("address")
        )
      );
    });
  }, [blockchain, transactions, wallet.publicKey]);

  const submit = (e) => {
    e.preventDefault();

    const { address, message, amount } = e.target;
    if (!message.value) return false;

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
  };

  return (
    <>
      <motion.main
        className="chat-main"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {transactions.map((transaction, index) =>
          transaction.fromAddress === wallet.publicKey ? (
            <div className="chat-sentence chat-sentence-right" key={index}>
              {transaction.message}
            </div>
          ) : transaction.fromAddress === query.get("address") ? (
            <div className="chat-sentence chat-sentence-left" key={index}>
              {transaction.message}
            </div>
          ) : (
            <React.Fragment key={index}></React.Fragment>
          )
        )}
      </motion.main>
      <motion.footer>
        <div className="chat-footer">
          <form onSubmit={(e) => submit(e)}>
            <input
              type="text"
              className="form-control"
              name="address"
              value={query.get("address")}
              style={{ display: "none" }}
              readOnly
            />
            <input
              type="text"
              className="form-control"
              name="message"
              autoFocus
            />
            <input
              type="text"
              className="form-control"
              name="amount"
              value="100"
              style={{ display: "none" }}
              readOnly
            />

            <button className="btn btn-success">
              <i className="bi bi-send-fill"></i>
            </button>
          </form>
        </div>
      </motion.footer>
    </>
  );
};
