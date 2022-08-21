import { useEffect } from "react";
import { isURL } from "../ts/utility";

export const ChatContent = (props) => {
  const { query, transactions } = props;
  // useEffect(() => {
  //   console.log("ChatContent");
  // }, [transactions]);

  return (
    <>
      {transactions.map((transaction) =>
        transaction.fromAddress === "System" ? (
          <div className="chat-sentence chat-sentence-right">
            {isURL(transaction.amount) ? (
              <a href={transaction.message} target="_blank" rel="noreferrer">
                {transaction.amount}
              </a>
            ) : (
              <>{transaction.amount}</>
            )}
          </div>
        ) : transaction.fromAddress === query.get("address") ? (
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
