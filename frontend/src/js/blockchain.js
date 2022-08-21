"use strict";
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
        var balance = 0;
        for (var _i = 0, _a = this.chain; _i < _a.length; _i++) {
            var block = _a[_i];
            for (var _b = 0, _c = block.transactions; _b < _c.length; _b++) {
                var trans = _c[_b];
                if (trans.fromAddress === address) {
                    balance -= trans.amount;
                }
                else if (trans.toAddress === address) {
                    balance += trans.amount;
                }
            }
        }
        return balance;
    };
    Blockchain.prototype.getTransactionsOfAddress = function (address) {
        var transactions = [];
        for (var _i = 0, _a = this.chain; _i < _a.length; _i++) {
            var block = _a[_i];
            for (var _b = 0, _c = block.transactions; _b < _c.length; _b++) {
                var trans = _c[_b];
                if (trans.fromAddress === address || trans.toAddress === address) {
                    transactions.push(trans);
                }
            }
        }
        return transactions;
    };
    Blockchain.prototype.getTransactionsBetweenTwo = function (address1, address2) {
        var transactions = [];
        for (var _i = 0, _a = this.chain; _i < _a.length; _i++) {
            var block = _a[_i];
            for (var _b = 0, _c = block.transactions; _b < _c.length; _b++) {
                var trans = _c[_b];
                if ((trans.fromAddress === address1 && trans.toAddress === address2) ||
                    (trans.fromAddress === address2 && trans.toAddress === address1)) {
                    transactions.push(trans);
                }
            }
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
