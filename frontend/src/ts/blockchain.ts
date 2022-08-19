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
        const walletBalance = this.getBalanceOfAddress(transaction.fromAddress);
        if (walletBalance < transaction.amount) {
            throw new Error('Not enough balance');
        }

        this.pendingTransactions.push(transaction);
    }

    minePendingTransactions(miningRewardAddress: string): void {
        const rewardTx = new Transaction("System", miningRewardAddress, 100);
        this.pendingTransactions.push(rewardTx);

        const block = new Block(this.getLatestBlock().hash, this.pendingTransactions);
        block.validateBlock();

        this.chain.push(block);

        this.pendingTransactions = [];
    }

    getBalanceOfAddress(address: string): number {
        let balance = 0;

        for (const block of this.chain) {
            for (const trans of block.transactions) {
                if (trans.fromAddress === address) {
                    balance -= trans.amount;
                } else if (trans.toAddress === address) {
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
                if (trans.fromAddress === address || trans.toAddress === address) {
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
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (!currentBlock.hasValidTransactions()) {
                console.log("無効なトランザクションがある");
                return false;
            }
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                console.log("ハッシュ化の結果、記録されているハッシュ値と異なる");
                return false;
            }

            if (currentBlock.preHash !== previousBlock.hash) {
                console.log("preHashと直前のハッシュ値が異なる")
                return false;
            }
        }
        return true;
    }

    static jsonToBlockchain(json: string): Blockchain {
        const tmp = JSON.parse(json);
        const blockchain = Object.assign(new Blockchain(), tmp);

        // 保留中のトランザクションの情報を引き継ぐ
        const pendingTransations = blockchain.pendingTransactions.map(
            (transaction: any) => new Transaction(transaction.fromAddress, transaction.toAddress, transaction.amount, transaction.nft)
        );

        // チェーンの情報を引き継ぐ
        const chain = blockchain.chain.map(
            (block: any) => {
                const transactions = block.transactions.map((transaction: any) => {
                    const tmpTransaction = new Transaction(transaction.fromAddress, transaction.toAddress, transaction.amount, transaction.nft);
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

        blockchain.pendingTransactions = pendingTransations;
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
}