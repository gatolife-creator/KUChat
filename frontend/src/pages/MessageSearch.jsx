import { useLocation } from "react-router-dom";
import { SearchEngine } from "../js/searchEngine";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const MessageSearch = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
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

  const submit = (e) => {
    e.preventDefault();
    const { message } = e.target;
    if (!message.value) return false;
    navigate("/message-search?q=" + message.value);
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="container">
        <form className="d-flex" role="search" onSubmit={(e) => submit(e)}>
          <div className="input-group pt-5 mb-3">
            <input
              type="text"
              className="form-control"
              name="message"
              placeholder="検索したいワードを入力"
            />
            <button className="btn btn-outline-secondary" type="send">
              検索
            </button>
          </div>
        </form>
        <h1>{query.get("q")}</h1>
        {result.map((transaction, index) => (
          <div key={index}>
            <Link
              to={
                "/transactions-view?transaction=" + transaction.calculateHash()
              }
              className="btn btn-outline-secondary mb-3"
              style={{ width: "100%", padding: "50px" }}
            >
              {transaction.message}
            </Link>
          </div>
        ))}
      </div>
    </motion.main>
  );
};
