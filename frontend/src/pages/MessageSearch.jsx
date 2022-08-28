import { useLocation } from "react-router-dom";
import { SearchEngine } from "../ts/searchEngine";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { SearchForm } from "../components/SearchForm";
import { Container } from "@mui/material";
import { Button } from "@mui/material";

import { v4 as uuidv4 } from "uuid";

export const MessageSearch = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const search = location.search;
  const query = new URLSearchParams(search);
  const { blockchain } = props;

  const engine = new SearchEngine("", "message");
  for (const block of blockchain.chain) {
    for (const transaction of block.transactions) {
      const id = uuidv4();
      engine.add(id, transaction);
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
      <Container className="center" maxWidth="lg" sx={{ paddingTop: "130px" }}>
        <SearchForm
          action={submit}
          placeholder="検索したいワードを入力"
          name="message"
        />

        <h1>{query.get("q")}</h1>
        {result.map((transaction, index) => (
          <Button
            key={index}
            component={Link}
            variant="outlined"
            sx={{
              width: "100%",
              height: "100px",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              margin: "0 auto",
              marginBottom: "20px",
            }}
            color="primary"
            to={`/transactions-view?from=${transaction.from}&to=${
              transaction.to
            }&hash=${transaction.calculateHash()}`}
          >
            {transaction.message}
          </Button>
        ))}
      </Container>
    </motion.main>
  );
};
