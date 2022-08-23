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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
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
    Wallet.prototype.createTransaction = function (recipient, amount, message, nft) {
        var transaction = new transaction_1.Transaction(this.publicKey, recipient, amount, message, nft);
        var signedTransaction = this.sign(transaction);
        return signedTransaction;
    };
    Wallet.prototype.getBalance = function () {
        var e_1, _a, e_2, _b;
        var balance = 0;
        try {
            for (var _c = __values(this.blockchain.chain), _d = _c.next(); !_d.done; _d = _c.next()) {
                var block = _d.value;
                try {
                    for (var _e = (e_2 = void 0, __values(block.transactions)), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var trans = _f.value;
                        if (trans.from === this.publicKey) {
                            balance -= trans.amount;
                        }
                        else if (trans.to === this.publicKey) {
                            balance += trans.amount;
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e["return"])) _b.call(_e);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c["return"])) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return balance;
    };
    Wallet.prototype.getTransactions = function () {
        var e_3, _a, e_4, _b;
        var transactions = [];
        try {
            for (var _c = __values(this.blockchain.chain), _d = _c.next(); !_d.done; _d = _c.next()) {
                var block = _d.value;
                try {
                    for (var _e = (e_4 = void 0, __values(block.transactions)), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var trans = _f.value;
                        if (trans.from === this.publicKey || trans.to === this.publicKey) {
                            transactions.push(trans);
                        }
                    }
                }
                catch (e_4_1) { e_4 = { error: e_4_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e["return"])) _b.call(_e);
                    }
                    finally { if (e_4) throw e_4.error; }
                }
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c["return"])) _a.call(_c);
            }
            finally { if (e_3) throw e_3.error; }
        }
        return transactions;
    };
    Wallet.prototype.getCorrespondents = function () {
        var e_5, _a;
        var transactions = this.getTransactions();
        var correspondents = [];
        try {
            for (var transactions_1 = __values(transactions), transactions_1_1 = transactions_1.next(); !transactions_1_1.done; transactions_1_1 = transactions_1.next()) {
                var transaction = transactions_1_1.value;
                if (transaction.from !== this.publicKey) {
                    correspondents.push(transaction.from);
                }
                else if (transaction.to !== this.publicKey) {
                    correspondents.push(transaction.to);
                }
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (transactions_1_1 && !transactions_1_1.done && (_a = transactions_1["return"])) _a.call(transactions_1);
            }
            finally { if (e_5) throw e_5.error; }
        }
        return __spreadArray([], __read(new Set(correspondents)), false);
    };
    Wallet.prototype.getNFT = function () {
        var e_6, _a, e_7, _b;
        var NFTs = [];
        try {
            for (var _c = __values(this.blockchain.chain), _d = _c.next(); !_d.done; _d = _c.next()) {
                var block = _d.value;
                try {
                    for (var _e = (e_7 = void 0, __values(block.transactions)), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var trans = _f.value;
                        if (!trans.nft)
                            continue;
                        NFTs.push(trans.nft);
                    }
                }
                catch (e_7_1) { e_7 = { error: e_7_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e["return"])) _b.call(_e);
                    }
                    finally { if (e_7) throw e_7.error; }
                }
            }
        }
        catch (e_6_1) { e_6 = { error: e_6_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c["return"])) _a.call(_c);
            }
            finally { if (e_6) throw e_6.error; }
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
    Wallet.restoreWalletFromPrivateKey = function (privateKey, blockchain) {
        var keyPair = ec.keyFromPrivate(privateKey);
        var publicKey = keyPair.getPublic("hex");
        var wallet = new Wallet(blockchain);
        wallet.keyPair = keyPair;
        wallet.publicKey = publicKey;
        return wallet;
    };
    Wallet.prototype.update = function (blockchain) {
        this.blockchain = blockchain;
    };
    return Wallet;
}());
exports.Wallet = Wallet;
