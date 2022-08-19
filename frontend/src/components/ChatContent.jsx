import { isURL } from "../ts/utility";

export const ChatContent = (props) => {
  console.log("ChatContent");
  const { query, transactions } = props;
  
  return (
    <>
      {transactions.map((transaction) =>
        transaction.fromAddress === "test" ? (
          <div className="chat-sentence chat-sentence-right">
            {isURL(transaction.message) ? (
              <a href={transaction.message} target="_blank" rel="noreferrer">
                {transaction.message}
              </a>
            ) : (
              <>{transaction.message}</>
            )}
          </div>
        ) : transaction.fromAddress === query.get("address") ? (
          <div className="chat-sentence chat-sentence-left">
            {transaction.message}
          </div>
        ) : (
          <></>
        )
      )}
    </>
  );
};
