import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import Gun from "gun";
import { Blockchain } from "../js/blockchain";
import { Wallet } from "../js/wallet";


// TODO チャットのテストをする際、まずはブロックチェーンを用いずに、リアルタイムでコメントのレンダリングができるかどうかをテストする
// TODO なお、p2pの実現のために、使用するライブラリはgun.jsを想定している
// TODO また、ペンディングトランザクションを他のノードと共有したほうがいいかもしれない。正確な情報はわからないが、全てのトランザクションが処理されるためには、全てのノードがペンディングトランザクションを共有している必要がありそうだ。
// TODO チェーンの交換の際に、ブロックチェーンをJSON形式に変えているため、thisが使えない。もしかするとstaticを使ったほうがいいのかもしれない。

export const Chat = () => {
  const blockchain = new Blockchain();
  const wallet = new Wallet(blockchain);
  const location = useLocation();
  const search = location.search;
  const query = new URLSearchParams(search);

  const gun = Gun({
    peers: ["http://localhost:3001/gun", "https://kuchat.herokuapp.com/gun"],
  });

  gun.get("blockchain").once((data) => {
    console.log("replacing now...");
    const parsedBlockchain = Blockchain.jsonToBlockchain(data.blockchain);
    console.log(
      "parsedBlockchain validation: ",
      parsedBlockchain.isChainValid()
    );
    blockchain.replaceChain(parsedBlockchain.chain);
    console.log(blockchain);
    console.log("replaced");
  });

  gun
    .get("blockchain")
    .on(() => console.log("blockchain updated"));

  const submit = (e) => {
    e.preventDefault();

    const { address, message, amount } = e.target;
    if (!message.value) return false;
    // console.log(address.value, message.value, amount.value);
    blockchain.minePendingTransactions(wallet.publicKey);
    const trans = wallet.createTransaction(address.value, 10, {});
    blockchain.addTransaction(trans);

    console.log("chain length:", blockchain.chain.length);
    console.log("validation:", blockchain.isChainValid());
    gun.get("blockchain").put({ blockchain: JSON.stringify(blockchain) });
    message.value = "";
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.main className="chat-main"></motion.main>
      <motion.footer>
        <div className="chat-footer">
          <form onSubmit={(e) => submit(e)}>
            <input
              type="text"
              className="form-control"
              name="address"
              value={query.get("address")}
              style={{ display: "none" }}
              readOnly
            />
            <input type="text" className="form-control" name="message" />
            <input
              type="text"
              className="form-control"
              name="amount"
              value="100"
              style={{ display: "none" }}
              readOnly
            />

            <button className="btn btn-success">
              <i className="bi bi-send-fill"></i>
            </button>
          </form>
        </div>
      </motion.footer>
    </motion.main>
  );
};
