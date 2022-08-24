"use strict";
exports.__esModule = true;
exports.Transaction = void 0;
var crypto_js_1 = require("crypto-js");
var elliptic_1 = require("elliptic");
var filter_1 = require("./filter");
var secp256k1 = new elliptic_1.ec("secp256k1");
// TODO ホモセクシャルやレずビアンのような正しい言葉もフィルタリングされてしまう。これをどうにか修正できるようにしたい。
// TODO 単語ごとに区切れるようにすればいいが、そのようなライブラリは往々にして使うのが難しい（自分の実力不足もあるが）。
// TODO 正規表現によって個人情報を保護するのには限界があるから、また別の手立てを考えないといけない（学校関係者であることがわかるようにする仕組み）。
// TODO たとえば100くらいの学校に関係する質問を用意して、ランダムに何問か解答させるようにするのはどうだろうか。
var bougen = "馬鹿,バカ,阿呆,アホ,死ね,ﾀﾋね,氏ね,ハゲ,デブ,チビ,消えろ,ぶさいく,ブサイク,不細工,ばばあ,おっさん,じじい,きもい,キモイ,臭い,のろま,無能,Fラン,高卒,中卒,役立たず,レベルが低い,殺す,てめえ,てめぇ,呪う,キチガイ,気狂い,基地外".split(",");
var discriminativeExpression = "朝鮮人,朝鮮名,チョーセン,北鮮,南鮮,第三国人,支那,くろんぼ,外人,ガイジン,男のくせに,女のくせに,男らしく,女らしく,女々しい,ホモ,オカマ,オネエ,レズ,アメ公,イタ公,穢多,非人,ブリカス,乞食,鮮人,白痴,知障,害児,ポコペン,ポリ公,露助".split(",");
var shimoneta = "うんこ,ウンコ,うんぽこ,ちんこ,チンコ,ちんぽこ,ぽこちん,ポコチン,青姦".split(",");
var IPv4 = "^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])$";
var phoneNumber = "^0\\d{1,3}-\\d{2,4}-\\d{3,4}$";
var email = "^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\\.)+[a-zA-Z]{2,}$";
var postalCode = "^\\d{3}-\\d{4}$";
var unwanted = "((.)\\1{9,}";
var filterList = bougen.concat(discriminativeExpression, shimoneta, IPv4, phoneNumber, email, postalCode, unwanted);
var filter = new filter_1.Filter(filterList);
var Transaction = /** @class */ (function () {
    function Transaction(from, to, amount, message, nft) {
        this.from = from;
        this.to = to;
        this.amount = amount;
        this.message = message;
        this.timestamp = Date.now();
        this.signature = "";
        this.nft = nft;
    }
    Transaction.prototype.calculateHash = function () {
        return (0, crypto_js_1.SHA256)(this.from +
            this.to +
            this.amount +
            this.message +
            this.timestamp +
            this.nft).toString();
    };
    Transaction.prototype.signTransaction = function (signingKey) {
        if (signingKey.getPublic("hex") !== this.from) {
            throw new Error("You cannot sign transactions for other wallets!");
        }
        var hashTx = this.calculateHash();
        var sig = signingKey.sign(hashTx, "base64");
        this.signature = sig.toDER("hex");
    };
    Transaction.prototype.isValid = function () {
        if (!filter.isPure(this.message)) {
            throw new Error("Invalid message");
        }
        if (this.from === "System")
            return true;
        if (!this.signature || this.signature.length === 0) {
            throw new Error("No signature in this transaction");
        }
        var publicKey = secp256k1.keyFromPublic(this.from, "hex");
        return publicKey.verify(this.calculateHash(), this.signature);
    };
    return Transaction;
}());
exports.Transaction = Transaction;
