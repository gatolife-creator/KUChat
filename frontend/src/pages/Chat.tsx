import React from "react";
import { useState, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Transaction } from "../ts/blockchain/transaction";
import CustomLinkify from "../components/CustomLinkify";
import { ChatInput } from "../components/ChatInput";
import TipDialog from "../components/FormDialog";

import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Grid } from "react-loader-spinner";

import { blockchain, BlockchainData } from "../common/common";

import { wallet } from "../common/common";
import { katana } from "../common/common";
import { Blockchain } from "../ts/blockchain/blockchain";

// NOTE 直近のトランザクションだけを読み込むようにしたいが、ブロックチェーン上だとちょっとめんどくさそう。
// TODO 使い道は考えていないが、チャットの内容を公開鍵と秘密鍵を使って暗号化できるようにしてみたい。これをすることで、受信者と送信者以外の人には見れないメッセージを作り出すことができる。
// NOTE 入力欄の自動フォーカス機能は、Androidでは使い勝手が良くないらしい。

export const Chat = () => {
  const search = useLocation().search;
  const query = new URLSearchParams(search);
  const fromAddress = query.get("address")!;

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useLayoutEffect(() => {
    const transactions = blockchain.getTransactionsBetweenTwo(
      wallet.publicKey,
      fromAddress
    );
    setTransactions(transactions);

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const submit = (e) => {
    e.preventDefault();

    const { address, message } = e.target;
    if (!message.value) return false;

    try {
      blockchain.minePendingTransactions(wallet.publicKey);
      const trans = wallet.createTransaction(address.value, 10, message.value);
      blockchain.addTransaction(trans);
      blockchain.minePendingTransactions(wallet.publicKey);
      katana.put("key", JSON.stringify(blockchain));
      katana.emit("key");
      const transactions = blockchain.getTransactionsBetweenTwo(
        wallet.publicKey,
        fromAddress
      );
      setTransactions(transactions);
      message.value = "";
    } catch (error) {
      if (error.message.includes("無効なメッセージです")) {
        window.alert(
          "不適切な言葉が含まれている可能性があります。\n文章を改めて送信してください。"
        );
      }
    }
  };

  return isLoading ? (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ padding: "40px" }}></div>
      <div className="absolute-center">
        <Grid
          height="70"
          width="70"
          color="#4fa94d"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          visible={true}
        />
      </div>
    </motion.main>
  ) : (
    <>
      <motion.main
        className="chat-main"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div style={{ padding: "40px" }}></div>
        {transactions.map((transaction: Transaction, index) =>
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
      </motion.main>
      <motion.footer
        className="chat-footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <form onSubmit={(e) => submit(e)}>
          <ChatInput
            className="chat-input"
            name="message"
            autoFocus
            autoComplete="off"
          />
          <input
            type="text"
            className="form-control"
            name="address"
            value={query.get("address") || ""}
            style={{ display: "none" }}
            placeholder="address"
            readOnly
          />
          <input
            type="text"
            className="form-control"
            name="amount"
            value="0"
            style={{ display: "none" }}
            placeholder="amount"
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
