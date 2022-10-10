import { motion } from "framer-motion";
import React from "react";
import { Card } from "../components/Card";

export const Home = () => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="mx-auto w-11/12"
    >
      <div className="container pt-36">
        <div className="mx-auto grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          <Card
            title="チャット"
            paragraph="他の人をチャットをしたり、仮想通貨をプレゼントすることができます。勉強とかに役立ててみよう。"
            btnTitle="見る →"
            link="/contacts"
          />
          <Card
            title="グループチャット"
            paragraph="グループを結成して、複数人でチャットできます。部活の取り決めやイベントの取り決めに役立ててみよう。"
            btnTitle="見る →"
            link="/group-chat"
          />
          <Card
            title="NFTマーケット"
            paragraph="これはNFTマーケットです。教材やアイコンなどを取引できます。近日公開予定。"
            btnTitle="見る →"
            link="/nft-market"
          />
          <Card
            title="単語カード"
            paragraph="単語カードを作成できる。君の単語帳をNFTにして、KUCoinを稼ごう。近日公開予定。"
            btnTitle="見る →"
            link="/word-list"
          />
        </div>
      </div>
    </motion.main>
  );
};
