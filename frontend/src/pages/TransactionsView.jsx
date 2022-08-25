import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import CustomLinkify from "../components/CustomLinkify";

export const TransactionsView = (props) => {
  const { blockchain } = props;
  const location = useLocation();
  const search = location.search;
  const query = new URLSearchParams(search);
  const fromAddress = query.get("from");
  const toAddress = query.get("to");
  const hash = query.get("hash");

  const [message, setMessage] = useState("");
  const transactions = blockchain.getTransactionsBetweenTwo(
    fromAddress,
    toAddress
  );

  return (
    <motion.main
      className="chat-main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {transactions.map((transaction, index) =>
        transaction.from === fromAddress &&
        transaction.calculateHash() === hash ? (
          <div className="chat-right-wrapper" key={index}>
            <div className="chat-sentence" style={{ backgroundColor: "pink" }}>
              <CustomLinkify content={transaction.message} />
            </div>
            <small className="chat-timestamp">
              {`${new Date(transaction.timestamp).getMonth() + 1}月${new Date(
                transaction.timestamp
              ).getDate()}日${new Date(
                transaction.timestamp
              ).getHours()}時${new Date(transaction.timestamp).getMinutes()}分`}
            </small>
          </div>
        ) : transaction.from === fromAddress ? (
          <div className="chat-right-wrapper" key={index}>
            <div className="chat-sentence">
              <CustomLinkify content={transaction.message} />
            </div>
            <small className="chat-timestamp">
              {`${new Date(transaction.timestamp).getMonth() + 1}月${new Date(
                transaction.timestamp
              ).getDate()}日${new Date(
                transaction.timestamp
              ).getHours()}時${new Date(transaction.timestamp).getMinutes()}分`}
            </small>
          </div>
        ) : transaction.from === toAddress ? (
          <div className="chat-left-wrapper" key={index}>
            <div className="chat-sentence">
              <CustomLinkify content={transaction.message} />
            </div>
            <button
              style={{ display: "inline" }}
              className="btn btn-outline-danger tip-btn"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasBottom"
              aria-controls="offcanvasBottom"
              onClick={() => setMessage(transaction.message)}
            >
              <i style={{ fontSize: "14px" }} className="bi bi-heart"></i>
            </button>
            <small className="chat-timestamp">
              {`${new Date(transaction.timestamp).getMonth() + 1}月${new Date(
                transaction.timestamp
              ).getDate()}日${new Date(
                transaction.timestamp
              ).getHours()}時${new Date(transaction.timestamp).getMinutes()}分`}
            </small>
          </div>
        ) : (
          <React.Fragment key={index}></React.Fragment>
        )
      )}
      <div
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
      </div>
    </motion.main>
  );
};
