import { SHA256 } from "crypto-js";
import { ec } from "elliptic";
import { Purifier } from "../purifier";
import { PIIDetector } from "../PIIDetector";

const secp256k1 = new ec("secp256k1");

// TODO 正規表現によって個人情報を保護するのには限界があるから、また別の手立てを考えないといけない（学校関係者であることがわかるようにする仕組み）。
// TODO たとえば100くらいの学校に関係する質問を用意して、ランダムに何問か解答させるようにするのはどうだろうか。
// TODO 参考: https://dic.nicovideo.jp/a/%E3%83%8D%E3%83%83%E3%83%88%E3%82%B9%E3%83%A9%E3%83%B3%E3%82%B0%E3%81%AE%E4%B8%80%E8%A6%A7
// TODO 参考: https://qiita.com/grrrr/items/0b35b5c1c98eebfa5128

const bougen = "馬鹿,バカ,阿呆,アホ,死ね,ﾀﾋね,氏ね,ハゲ,デブ,チビ,消えろ,ぶさいく,ブサイク,不細工,ばばあ,おっさん,じじい,きもい,キモイ,臭い,のろま,無能,Fラン,高卒,中卒,役立たず,レベルが低い,殺す,てめえ,てめぇ,呪う,キチガイ,気狂い,基地外,ググれカス,ggrks,キモオタ,情弱,ネカマ,ネトウヨ,ネトサヨ,マジキチ,DQN,サカ豚,ま〜ん（笑）,あたおか,TNJ女子,鬼女,チー牛,喪女,喪男,ゴミP".split(",");
const discriminativeExpression = "朝鮮人,朝鮮名,チョーセン,北鮮,南鮮,第三国人,支那,くろんぼ,外人,ガイジン,男のくせに,女のくせに,男らしく,女らしく,女々しい,ホモ,オカマ,オネエ,レズ,アメ公,イタ公,穢多,非人,ブリカス,乞食,鮮人,白痴,知障,害児,ポコペン,ポリ公,露助".split(",");
const shimoneta = "うんこ,ウンコ,うんぽこ,ちんこ,チンコ,ちんぽこ,ぽこちん,ポコチン,青姦,NTR".split(",");

const filterList = bougen.concat(discriminativeExpression, shimoneta);
const purifier = new Purifier(filterList);

const piidetector = new PIIDetector();

export class Transaction {
    from: string;
    to: string;
    amount: number;
    message: string;
    timestamp: number;
    signature: string;

    constructor(from: string, to: string, amount: number, message: string) {
        this.from = from;
        this.to = to;
        this.amount = amount;
        this.message = message;
        this.timestamp = Date.now();
        this.signature = "";
    }

    calculateHash(): string {
        return SHA256(
            this.from +
            this.to +
            this.amount +
            this.message +
            this.timestamp
        ).toString();
    }


    signTransaction(signingKey: ec.KeyPair): void {
        if (signingKey.getPublic("hex") !== this.from) {
            throw new Error("You cannot sign transactions for other wallets!");
        }

        const hashTx = this.calculateHash();
        const sig = signingKey.sign(hashTx, "base64");
        this.signature = sig.toDER("hex");
    }

    isValid(): boolean {

        if (!purifier.isPure(this.message)) {
            throw new Error(`無効なメッセージです${this.message}`);
        }

        if (piidetector.includePII(this.message)) {
            throw new Error(`無効なメッセージです${this.message}`);
        }

        if (this.from === "System") return true;

        if (!this.signature || this.signature.length === 0) {
            throw new Error("このトランザクションに署名がありません");
        }

        const publicKey = secp256k1.keyFromPublic(this.from, "hex");
        return publicKey.verify(this.calculateHash(), this.signature);
    }
}