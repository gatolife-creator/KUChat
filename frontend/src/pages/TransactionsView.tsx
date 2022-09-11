import React from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import CustomLinkify from "../components/CustomLinkify";
import TipDialog from "../components/FormDialog";
import { Transaction } from "../ts/transaction";

export const TransactionsView = (props) => {
  const { blockchain } = props;
  const location = useLocation();
  const search = location.search;
  const query = new URLSearchParams(search);
  const fromAddress = query.get("from");
  const toAddress = query.get("to");
  const hash = query.get("hash");

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
      <div style={{ padding: "40px" }}></div>
      {transactions.map((transaction: Transaction, index: number) =>
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
            <TipDialog></TipDialog>
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
    </motion.main>
  );
};
