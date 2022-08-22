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
exports.Blockchain = void 0;
var transaction_1 = require("./transaction");
var block_1 = require("./block");
var Blockchain = /** @class */ (function () {
    function Blockchain() {
        this.chain = [Blockchain.createGenesisBlock()];
        this.pendingTransactions = [];
    }
    Blockchain.createGenesisBlock = function () {
        return new block_1.Block("0", []);
    };
    Blockchain.prototype.getLatestBlock = function () {
        return this.chain[this.chain.length - 1];
    };
    Blockchain.prototype.addTransaction = function (transaction) {
        if (!transaction.fromAddress || !transaction.toAddress) {
            throw new Error("Transaction must include from and to address");
        }
        if (transaction.toAddress === "System") {
            throw new Error("Cannot send to System");
        }
        if (!transaction.isValid()) {
            throw new Error("Cannot add invalid transaction to chain");
        }
        if (transaction.amount <= 0) {
            throw new Error('Transaction amount should be higher than 0');
        }
        // Making sure that the amount sent is not greater than existing balance
        var walletBalance = this.getBalanceOfAddress(transaction.fromAddress);
        if (walletBalance < transaction.amount) {
            throw new Error('Not enough balance');
        }
        this.pendingTransactions.push(transaction);
    };
    Blockchain.prototype.minePendingTransactions = function (miningRewardAddress) {
        var rewardTx = new transaction_1.Transaction("System", miningRewardAddress, 100, "reward");
        this.pendingTransactions.push(rewardTx);
        var block = new block_1.Block(this.getLatestBlock().hash, this.pendingTransactions);
        block.validateBlock();
        this.chain.push(block);
        this.pendingTransactions = [];
    };
    Blockchain.prototype.getBalanceOfAddress = function (address) {
        var e_1, _a, e_2, _b;
        var balance = 0;
        try {
            for (var _c = __values(this.chain), _d = _c.next(); !_d.done; _d = _c.next()) {
                var block = _d.value;
                try {
                    for (var _e = (e_2 = void 0, __values(block.transactions)), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var trans = _f.value;
                        if (trans.fromAddress === address) {
                            balance -= trans.amount;
                        }
                        else if (trans.toAddress === address) {
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
    Blockchain.prototype.getTransactionsOfAddress = function (address) {
        var e_3, _a, e_4, _b;
        var transactions = [];
        try {
            for (var _c = __values(this.chain), _d = _c.next(); !_d.done; _d = _c.next()) {
                var block = _d.value;
                try {
                    for (var _e = (e_4 = void 0, __values(block.transactions)), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var trans = _f.value;
                        if (trans.fromAddress === address || trans.toAddress === address) {
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
    Blockchain.prototype.getTransactionsBetweenTwo = function (address1, address2) {
        var e_5, _a, e_6, _b;
        var transactions = [];
        try {
            for (var _c = __values(this.chain), _d = _c.next(); !_d.done; _d = _c.next()) {
                var block = _d.value;
                try {
                    for (var _e = (e_6 = void 0, __values(block.transactions)), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var trans = _f.value;
                        if ((trans.fromAddress === address1 && trans.toAddress === address2) ||
                            (trans.fromAddress === address2 && trans.toAddress === address1)) {
                            transactions.push(trans);
                        }
                    }
                }
                catch (e_6_1) { e_6 = { error: e_6_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e["return"])) _b.call(_e);
                    }
                    finally { if (e_6) throw e_6.error; }
                }
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c["return"])) _a.call(_c);
            }
            finally { if (e_5) throw e_5.error; }
        }
        return transactions;
    };
    Blockchain.prototype.isChainValid = function () {
        /**
         * 一番最初のブロックはそれよりも前のブロックが存在しないので、
         * iは1から始める
         */
        for (var i = 1; i < this.chain.length; i++) {
            var currentBlock = this.chain[i];
            var previousBlock = this.chain[i - 1];
            if (!currentBlock.hasValidTransactions()) {
                console.log("無効なトランザクションがある");
                return false;
            }
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                console.log("ハッシュ化の結果、記録されているハッシュ値と異なる");
                return false;
            }
            if (currentBlock.preHash !== previousBlock.hash) {
                console.log("preHashと直前のハッシュ値が異なる");
                return false;
            }
        }
        return true;
    };
    Blockchain.jsonToBlockchain = function (json) {
        var tmp = JSON.parse(json);
        var blockchain = Object.assign(new Blockchain(), tmp);
        // 保留中のトランザクションの情報を引き継ぐ
        var pendingTransations = blockchain.pendingTransactions.map(function (transaction) { return new transaction_1.Transaction(transaction.fromAddress, transaction.toAddress, transaction.amount, transaction.message, transaction.nft); });
        // チェーンの情報を引き継ぐ
        var chain = blockchain.chain.map(function (block) {
            var transactions = block.transactions.map(function (transaction) {
                var tmpTransaction = new transaction_1.Transaction(transaction.fromAddress, transaction.toAddress, transaction.amount, transaction.message, transaction.nft);
                tmpTransaction.signature = transaction.signature;
                tmpTransaction.timestamp = transaction.timestamp;
                return tmpTransaction;
            });
            var tmpBlock = new block_1.Block(block.preHash, transactions);
            tmpBlock.nonce = block.nonce;
            tmpBlock.difficulty = block.difficulty;
            tmpBlock.hash = block.hash;
            tmpBlock.timestamp = block.timestamp;
            return tmpBlock;
        });
        blockchain.pendingTransactions = pendingTransations;
        blockchain.chain = chain;
        return blockchain;
    };
    Blockchain.prototype.replaceChain = function (chain) {
        var anotherBlockchain = new Blockchain();
        anotherBlockchain.chain = chain;
        if (!anotherBlockchain.isChainValid())
            return false;
        if (chain.length <= this.chain.length)
            return false;
        this.chain = chain;
    };
    Blockchain.prototype.selfDestruct = function () {
        this.chain = [];
        this.pendingTransactions = [];
    };
    return Blockchain;
}());
exports.Blockchain = Blockchain;
