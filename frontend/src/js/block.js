"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
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
        var e_1, _a;
        try {
            for (var _b = __values(this.transactions), _c = _b.next(); !_c.done; _c = _b.next()) {
                var tx = _c.value;
                if (!tx.isValid())
                    return false;
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b["return"])) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return true;
    };
    return Block;
}());
exports.Block = Block;
