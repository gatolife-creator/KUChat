import { motion } from "framer-motion";
import { ActionAreaCard } from "../components/ActionAreaCard";
import { Grid } from "@mui/material";
import { Container } from "@mui/material";
import React from "react";
import { Card } from "../components/Card";

export const Home = () => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* <Container maxWidth="lg" sx={{ paddingTop: "100px" }}> */}
        <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
          <Card
            title="チャット"
            paragraph="他の人をチャットをしたり、仮想通貨をプレゼントすることができます。勉強とかに役立ててみよう。"
            btnTitle="見る"
            link="/contacts"
          />
          <Card
            title="グループチャット"
            paragraph="グループを結成して、複数人でチャットできます。部活の取り決めやイベントの取り決めに役立ててみよう。"
            btnTitle="見る"
            link="/group-chat"
          />
          <Card
            title="NFTマーケット"
            paragraph="これはNFTマーケットです。教材やアイコンなどを取引できます。近日公開予定。"
            btnTitle="見る"
            link="/nft-market"
          />
          <Card
            title="単語カード"
            paragraph="単語カードを作成できる。君の単語帳をNFTにして、KUCoinを稼ごう。近日公開予定。"
            btnTitle="見る"
            link="/word-list"
          />
        </Grid>
      {/* </Container> */}
    </motion.main>
  );
};
