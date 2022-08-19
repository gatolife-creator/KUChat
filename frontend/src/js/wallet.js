"use strict";
exports.__esModule = true;
exports.Wallet = void 0;
var elliptic_1 = require("elliptic");
var transaction_1 = require("./transaction");
var ec = new elliptic_1.ec("secp256k1");
var Wallet = /** @class */ (function () {
    function Wallet(blockchain) {
        this.blockchain = blockchain;
        this.keyPair = ec.genKeyPair();
        this.publicKey = this.keyPair.getPublic("hex");
    }
    Wallet.prototype.createTransaction = function (recipient, amount, nft) {
        var transaction = new transaction_1.Transaction(this.publicKey, recipient, amount, nft);
        var signedTransaction = this.sign(transaction);
        return signedTransaction;
    };
    Wallet.prototype.getBalance = function () {
        var balance = 0;
        for (var _i = 0, _a = this.blockchain.chain; _i < _a.length; _i++) {
            var block = _a[_i];
            for (var _b = 0, _c = block.transactions; _b < _c.length; _b++) {
                var trans = _c[_b];
                if (trans.fromAddress === this.publicKey) {
                    balance -= trans.amount;
                }
                else if (trans.toAddress === this.publicKey) {
                    balance += trans.amount;
                }
            }
        }
        return balance;
    };
    Wallet.prototype.getNFT = function () {
        var NFTs = [];
        for (var _i = 0, _a = this.blockchain.chain; _i < _a.length; _i++) {
            var block = _a[_i];
            for (var _b = 0, _c = block.transactions; _b < _c.length; _b++) {
                var trans = _c[_b];
                if (!trans.nft)
                    continue;
                NFTs.push(trans.nft);
            }
        }
        return NFTs;
    };
    Wallet.prototype.sign = function (transaction) {
        if (this.keyPair.getPublic("hex") !== this.publicKey) {
            throw new Error("You cannot sign transactions for other wallets!");
        }
        var hashTx = transaction.calculateHash();
        var sig = this.keyPair.sign(hashTx, "base64");
        transaction.signature = sig.toDER("hex");
        return transaction;
    };
    Wallet.prototype.update = function (blockchain) {
        this.blockchain = blockchain;
    };
    return Wallet;
}());
exports.Wallet = Wallet;
