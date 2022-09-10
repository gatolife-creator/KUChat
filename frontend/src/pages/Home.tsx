import { motion } from "framer-motion";
import { ActionAreaCard } from "../components/ActionAreaCard";
import { Grid } from "@mui/material";
import { Container } from "@mui/material";
import React from "react";

export const Home = () => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Container maxWidth="lg" sx={{ paddingTop: "100px" }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          // sx={{ width: "100%", margin: "0 auto" }}
        >
          <ActionAreaCard
            title="チャット"
            content="他の人をチャットをしたり、仮想通貨をプレゼントすることができます。勉強とかに役立ててみよう。"
            link="/contacts"
            linkText="見る"
            imgURL="https://www.shoshinsha-design.com/wp-content/uploads/2020/05/noimage-760x460.png"
          />
          <ActionAreaCard
            title="グループチャット"
            content="グループを結成して、複数人でチャットできます。部活の取り決めやイベントの取り決めに役立ててみよう。"
            link="/group-chat"
            linkText="見る"
            imgURL="https://www.shoshinsha-design.com/wp-content/uploads/2020/05/noimage-760x460.png"
          />
          <ActionAreaCard
            title="NFTマーケット"
            content="これはNFTマーケットです。教材やアイコンなどを取引できます。近日公開予定。"
            link="/nft-market"
            linkText="見る"
            imgURL="https://www.shoshinsha-design.com/wp-content/uploads/2020/05/noimage-760x460.png"
          />
          <ActionAreaCard
            title="単語カード"
            content="単語カードを作成できる。君の単語帳をNFTにして、KUCoinを稼ごう。近日公開予定。"
            link="/word-list"
            linkText="見る"
            imgURL="https://www.shoshinsha-design.com/wp-content/uploads/2020/05/noimage-760x460.png"
          />
        </Grid>
      </Container>
    </motion.main>
  );
};
