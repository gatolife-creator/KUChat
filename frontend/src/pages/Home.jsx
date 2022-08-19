import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card } from "../components/Card";

export const Home = () => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="container px-4 mt-5 text-center">
        <div className="row gx-5">
          <div className="col">
              <Card
                title="チャット"
                text="他の人をチャットをしたり、仮想通貨をプレゼントすることができます。勉強とかに役立ててみよう。"
                link="/contacts"
                linkText="見る"
              />
          </div>

          <div className="col">
              <Card
                title="グループチャット"
                text="グループを結成して、複数人でチャットできます。部活の取り決めやイベントの取り決めに役立ててみよう。"
                link="/group-chat"
                linkText="見る"
              />
          </div>

          <div className="col">
              <Card
                title="NFTマーケット"
                text="これはNFTマーケットです。教材やアイコンなどを取引できます。近日公開予定。"
                link="/nft-market"
                linkText="見る"
              />
          </div>

          <div className="col">
              <Card
                title="単語カード"
                text="単語カードを作成できる。君の単語帳をNFTにして、KUCoinを稼ごう。近日公開予定。"
                link="/word-list"
                linkText="見る"
              />
          </div>
        </div>
      </div>
    </motion.main>
  );
};
