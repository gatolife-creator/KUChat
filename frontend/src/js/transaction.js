"use strict";
exports.__esModule = true;
exports.Transaction = void 0;
var crypto_js_1 = require("crypto-js");
var elliptic_1 = require("elliptic");
var secp256k1 = new elliptic_1.ec("secp256k1");
var Transaction = /** @class */ (function () {
    function Transaction(fromAddress, toAddress, amount, nft) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
        this.timestamp = Date.now();
        this.signature = "";
        this.nft = nft;
    }
    Transaction.prototype.calculateHash = function () {
        return (0, crypto_js_1.SHA256)(this.fromAddress +
            this.toAddress +
            this.amount +
            this.timestamp +
            this.nft).toString();
    };
    Transaction.prototype.signTransaction = function (signingKey) {
        if (signingKey.getPublic("hex") !== this.fromAddress) {
            throw new Error("You cannot sign transactions for other wallets!");
        }
        var hashTx = this.calculateHash();
        var sig = signingKey.sign(hashTx, "base64");
        this.signature = sig.toDER("hex");
    };
    Transaction.prototype.isValid = function () {
        if (this.fromAddress === "System")
            return true;
        if (!this.signature || this.signature.length === 0) {
            throw new Error("No signature in this transaction");
        }
        var publicKey = secp256k1.keyFromPublic(this.fromAddress, "hex");
        return publicKey.verify(this.calculateHash(), this.signature);
    };
    return Transaction;
}());
exports.Transaction = Transaction;
