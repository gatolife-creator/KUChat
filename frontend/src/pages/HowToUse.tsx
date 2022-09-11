import { motion } from "framer-motion";
import { Container } from "@mui/system";
import React from "react";

export const HowToUse = () => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Container maxWidth="lg" sx={{ paddingTop: "100px" }}>
        <h2>初めに</h2>
        <p>
          アンケートにご協力くださり、誠にありがとうございます。
          <br />
          アプリケーションの<strong>見やすさ</strong>や、
          <strong>操作性向上</strong>のために調査をしております。
          <br />
          特に、<strong>配色やウェブデザインに詳しい方</strong>
          は、<strong>細かな改善点</strong>まで教えていただけると嬉しいです。
        </p>
        <hr />
        <h2>アンケートの回答手順</h2>
        <ol>
          <li>
            左上の「<strong>KUChat</strong>」ロゴをクリック
          </li>
          <li>遷移した画面（ホーム画面）を確認して、アンケートに回答</li>
          <li>
            「<strong>チャット</strong>」ボタンをクリック
          </li>
          <li>該当のアンケートに回答</li>
          <li>
            ページ遷移したのち、アドレス入力欄に「<strong>test</strong>
            」と入力し、Enterキーもしくは🔍アイコンをクリック
          </li>
          <li>
            ページ遷移したのち、画面下のメッセージ入力欄に「
            <strong>test</strong>」と入力、送信
          </li>
          <li>該当のアンケートに回答</li>
        </ol>
        <hr />
        <h2>注意事項</h2>
        <p>
          学校で使用するタブレットPCでは正常に動作しないことがあります。
          <br />
          正常に動作しなかった場合、お手数ですが、学校管轄外のPC（特に
          <strong>ifilter</strong>
          がインストールされていないもの）でお試しください。
        </p>
      </Container>
    </motion.main>
  );
};
