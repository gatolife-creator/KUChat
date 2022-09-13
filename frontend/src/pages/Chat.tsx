import React from "react";
import { useState, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useWorker } from "@shopify/react-web-worker";
import { Transaction } from "../ts/transaction";
import CustomLinkify from "../components/CustomLinkify";
import { ChatInput } from "../components/ChatInput";
import TipDialog from "../components/FormDialog";

import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Grid } from "react-loader-spinner";

import { blockchain } from "../common/common";
import { gun } from "../common/common";

import { wallet } from "../common/common";
import { createWorker } from "../common/common";

// TODO UTXOデータベースを実装したい。
// NOTE 直近のトランザクションだけを読み込むようにしたいが、ブロックチェーン上だとちょっとめんどくさそう。
// TODO 使い道は考えていないが、チャットの内容を公開鍵と秘密鍵を使って暗号化できるようにしてみたい。これをすることで、受信者と送信者以外の人には見れないメッセージを作り出すことができる。
// NOTE 入力欄の自動フォーカス機能は、Androidでは使い勝手が良くないらしい。

export const Chat = () => {
  const location = useLocation();
  const search = location.search;
  const query = new URLSearchParams(search);

  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const worker = useWorker<any, []>(createWorker);

  useLayoutEffect(() => {
    gun.get("blockchain").on(() => {
      const dataForWorker = {
        blockchain: blockchain,
        fromAddress: wallet.publicKey,
        toAddress: query.get("address"),
      };

      (async () => {
        const transactions = await worker.getTransactionsBetweenTwo(
          dataForWorker
        );
        setTransactions(transactions);
        setTimeout(() => setIsLoading(false), 500);
      })();
    });
  }, []);

  const submit = (e) => {
    e.preventDefault();

    const { address, message } = e.target;
    if (!message.value) return false;

    try {
      // TODO この下のマイニングはそのうち、マイニングページに移動させる
      // TODO つまり、メッセージの送信と同時にマイニングすることを中止する
      // TODO デバッグの関係でマイニングしたのであって、本来の形ではない。今にプログラムのままだと、チェーンの置き換えの際に、一部のトランザクションが消滅してしまう。
      blockchain.minePendingTransactions(wallet.publicKey);
      const trans = wallet.createTransaction(address.value, 10, message.value);
      blockchain.addTransaction(trans);
      blockchain.minePendingTransactions(wallet.publicKey);
      // blockchain.selfDestruct();
      gun.get("blockchain").put({ blockchain: JSON.stringify(blockchain) });
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
