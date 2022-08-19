"use strict";
exports.__esModule = true;
exports.Block = void 0;
var crypto_js_1 = require("crypto-js");
var Block = /** @class */ (function () {
    function Block(preHash, transactions) {
        this.preHash = preHash;
        this.hash = this.calculateHash();
        this.timestamp = Date.now();
        this.difficulty = 2;
        this.transactions = transactions;
        this.nonce = 0;
    }
    Block.prototype.calculateHash = function () {
        return (0, crypto_js_1.SHA256)(this.preHash +
            this.timestamp +
            JSON.stringify(this.transactions) +
            this.nonce).toString();
    };
    Block.prototype.validateBlock = function () {
        while (this.hash.substring(0, this.difficulty) !== Array(this.difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Block mined:" + this.hash);
    };
    Block.prototype.hasValidTransactions = function () {
        for (var _i = 0, _a = this.transactions; _i < _a.length; _i++) {
            var tx = _a[_i];
            if (!tx.isValid())
                return false;
        }
        return true;
    };
    return Block;
}());
exports.Block = Block;
