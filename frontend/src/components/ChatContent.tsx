import React from "react";
import { Transaction } from "../ts/transaction";
import { isURL } from "../ts/utility";

export const ChatContent = (props) => {
  const { query, transactions } = props;
  return (
    <>
      {transactions.map((transaction: Transaction) =>
        transaction.from === "System" ? (
          <div className="chat-sentence chat-sentence-right">
            {isURL(transaction.amount) ? (
              <a href={transaction.message} target="_blank" rel="noreferrer">
                {transaction.amount}
              </a>
            ) : (
              <>{transaction.amount}</>
            )}
          </div>
        ) : transaction.from === query.get("address") ? (
          <div className="chat-sentence chat-sentence-left">
            {transaction.amount}
          </div>
        ) : (
          <></>
        )
      )}
    </>
  );
};
