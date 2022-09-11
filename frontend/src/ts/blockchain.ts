import { Transaction } from "./transaction";
import { Block } from "./block";

export class Blockchain {
    chain: Block[];
    pendingTransactions: Transaction[];

    constructor() {
        this.chain = [Blockchain.createGenesisBlock()];
        this.pendingTransactions = [];
    }

    static createGenesisBlock(): Block {
        return new Block("0", []);
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addTransaction(transaction: Transaction): void {

        if (!transaction.from || !transaction.to) {
            throw new Error("Transaction must include from and to address");
        }

        if (transaction.to === "System") {
            throw new Error("システムに送信することはできません。");
        }

        if (!transaction.isValid()) {
            throw new Error("無効なトンランザクションをチェーンに追加することはできません。");
        }

        if (transaction.amount < 0) {
            throw new Error('送金額は0以上でなくてはなりません。');
        }
        // Making sure that the amount sent is not greater than existing balance
        const walletBalance = this.getBalanceOfAddress(transaction.from);
        if (walletBalance < transaction.amount) {
            throw new Error('十分な残高がありません。');
        }

        this.pendingTransactions.push(transaction);
    }

    minePendingTransactions(miningRewardAddress: string): void {
        const rewardTx = new Transaction("System", miningRewardAddress, 100, "reward");
        this.pendingTransactions.push(rewardTx);

        const block = new Block(this.getLatestBlock().hash, this.pendingTransactions);
        block.validateBlock();

        this.chain.push(block);

        this.pendingTransactions = [];
    }

    getBalanceOfAddress(address: string): number {
        let balance = 0;
        const len = this.chain.length;
        for (let i = 0; i < len; i++) {
            const block = this.chain[i];
            const len2 = block.transactions.length;
            for (let j = 0; j < len2; j++) {
                const trans = block.transactions[j];
                if (trans.from === address) {
                    balance -= trans.amount;
                } else if (trans.to === address) {
                    balance += trans.amount;
                }
            }
        }
        return balance;
    }

    getTransactionsOfAddress(address: string): Transaction[] {
        const transactions: Transaction[] = [];
        for (const block of this.chain) {
            for (const trans of block.transactions) {
                if (trans.from === address || trans.to === address) {
                    transactions.push(trans);
                }
            }
        }
        return transactions;
    }

    getTransactionsBetweenTwo(address1: string, address2: string): Transaction[] {
        let transactions: Transaction[] = [];

        for (const block of this.chain) {
            for (const trans of block.transactions) {
                if ((trans.from === address1 && trans.to === address2) ||
                    (trans.from === address2 && trans.to === address1)) {
                    transactions.push(trans);
                }
            }
        }
        return transactions;
    }

    isChainValid(): boolean {
        /**
         * 一番最初のブロックはそれよりも前のブロックが存在しないので、
         * iは1から始める
         */
        const len = this.chain.length;
        for (let i = 1; i < len; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (!currentBlock.hasValidTransactions()) {
                console.warn("無効なトランザクションがあります");
                return false;
            }
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                console.warn("ハッシュ化の結果、記録されているハッシュ値と一致しません");
                return false;
            }

            if (currentBlock.preHash !== previousBlock.hash) {
                console.warn("preHashと直前のハッシュ値が一致しません")
                return false;
            }
        }
        return true;
    }

    static jsonToBlockchain(json: string): Blockchain {
        const tmp = JSON.parse(json);
        const blockchain = Object.assign(new Blockchain(), tmp);

        // 保留中のトランザクションの情報を引き継ぐ
        const pendingTransactions = blockchain.pendingTransactions.map(
            (transaction: any) => new Transaction(transaction.from, transaction.to, transaction.amount, transaction.message, transaction.nft)
        );

        // チェーンの情報を引き継ぐ
        const chain = blockchain.chain.map(
            (block: any) => {
                const transactions = block.transactions.map((transaction: any) => {
                    const tmpTransaction = new Transaction(transaction.from, transaction.to, transaction.amount, transaction.message, transaction.nft);
                    tmpTransaction.signature = transaction.signature;
                    tmpTransaction.timestamp = transaction.timestamp;
                    return tmpTransaction;
                });
                const tmpBlock = new Block(block.preHash, transactions);
                tmpBlock.nonce = block.nonce;
                tmpBlock.difficulty = block.difficulty;
                tmpBlock.hash = block.hash;
                tmpBlock.timestamp = block.timestamp;
                return tmpBlock;
            }
        );

        blockchain.pendingTransactions = pendingTransactions;
        blockchain.chain = chain;

        return blockchain;
    }

    replaceChain(chain: Block[]): void | boolean {
        const anotherBlockchain = new Blockchain();
        anotherBlockchain.chain = chain;
        if (!anotherBlockchain.isChainValid()) return false;

        if (chain.length <= this.chain.length) return false;

        this.chain = chain;
    }

    selfDestruct(): void {
        this.chain = [];
        this.pendingTransactions = [];
    }
}