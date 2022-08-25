import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SearchEngine } from "../js/searchEngine";
import { motion } from "framer-motion";

export const MessageSearch = (props) => {
  const location = useLocation();
  const search = location.search;
  const query = new URLSearchParams(search);
  const { blockchain } = props;

  const engine = new SearchEngine("", "message");
  for (const block of blockchain.chain) {
    for (const transaction of block.transactions) {
      engine.add(transaction);
    }
  }

  const result = engine.search(query.get("q"));
  // console.log(result);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="container">
        <div className="input-group pt-5 mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Recipient's username"
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            id="button-addon2"
          >
            Button
          </button>
        </div>
        <h1>{query.get("q")}</h1>
        {result.map((transaction, index) => (
          <div key={index}>
            <div>{transaction.from}</div>
            <div>{transaction.to}</div>
            <div>{transaction.message}</div>
          </div>
        ))}
      </div>
    </motion.main>
  );
};
