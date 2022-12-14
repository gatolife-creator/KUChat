import { Transaction } from "./transaction";
import { Block } from "./block";
import { HashTable } from "./hashTable";
import { coloredLog } from "../utility";

export class Blockchain {
    chain: Block[];
    pendingTransactions: HashTable<Transaction>;

    constructor() {
        this.chain = [Blockchain.createGenesisBlock()];
        this.pendingTransactions = new HashTable<Transaction>();
    }

    static createGenesisBlock(): Block {
        return new Block("0", []);
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addTransaction(transaction: Transaction): void {
        // TODO チェーンに含まれていないトランザクションのみ追加すること
        // NOTE どこに原因があるのか正確にはわからないが、おそらくこのメソッドのせいで、チェーンとペンディングリストに同じトランザクションが存在してしまっている
        if (!transaction.from || !transaction.to) {
            throw new Error("トランザクションはfromアドレスとtoアドレスが必要です。");
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

        const walletBalance = this.getBalanceOfAddress(transaction.from);
        if (walletBalance < transaction.amount) {
            throw new Error('十分な残高がありません。');
        }

        this.pendingTransactions.put(transaction);
    }

    minePendingTransactions(miningRewardAddress: string): void {
        const rewardTx = new Transaction("System", miningRewardAddress, 100, "reward");
        this.pendingTransactions.put(rewardTx);
        const transactionsTable = new HashTable(this.extractTransactions());

        const pendingTransactions = this.pendingTransactions.extract();

        const transactions: Transaction[] = [];

        for (const transaction of pendingTransactions) {
            if (!transactionsTable.has(transaction)) {
                transactions.push(transaction);
            }
        }

        const block = new Block(this.getLatestBlock().hash, transactions);
        block.validateBlock();

        this.chain.push(block);

        this.pendingTransactions = new HashTable<Transaction>();
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

    extractTransactions() {
        const transactions: Transaction[] = [];
        const len = this.chain.length;
        for (let i = 0; i < len; i++) {
            const block = this.chain[i];
            for (let j = 0; j < block.transactions.length; j++) {
                transactions.push(block.transactions[j]);
            }
        }
        return transactions;
    }

    extractTransactionsWithoutReward() {
        const transactions: Transaction[] = [];
        const len = this.chain.length;
        for (let i = 0; i < len; i++) {
            const block = this.chain[i];
            for (let j = 0; j < block.transactions.length; j++) {
                const trans = block.transactions[j];
                if (trans.from !== "System") {
                    transactions.push(block.transactions[j]);
                }
            }
        }
        return transactions;
    }

    getTransactionsOfAddress(address: string): Transaction[] {
        const transactions: Transaction[] = [];
        const len = this.chain.length;
        for (let i = 0; i < len; i++) {
            const block = this.chain[i];
            const len2 = block.transactions.length;
            for (let j = 0; j < len2; j++) {
                const trans = block.transactions[j];
                if (trans.from === address || trans.to === address) {
                    transactions.push(trans);
                }
            }
        }
        return transactions;
    }

    getTransactionsBetweenTwo(address1: string, address2: string): Transaction[] {
        const transactions: Transaction[] = [];
        const len = this.chain.length;
        for (let i = 0; i < len; i++) {
            const block = this.chain[i];
            const len2 = block.transactions.length;
            for (let j = 0; j < len2; j++) {
                const trans = block.transactions[j];
                if ((trans.from === address1 && trans.to === address2) ||
                    (trans.from === address2 && trans.to === address1)) {
                    transactions.push(trans);
                }
            }
        }
        return transactions;
    }


    isChainValid(): boolean {
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
                console.warn("preHashと直前のハッシュ値が一致しません");
                return false;
            }

            const transactions = this.extractTransactions();
            const hashTable = new HashTable(transactions);
            if (hashTable.getLength() !== transactions.length) {
                console.warn("トランザクションに重複があります。");
                return false;
            }
        }
        return true;
    }


    replaceChain(blockchain: Blockchain): void {
        // チェーン上のトランザクション
        const transactions = this.extractTransactionsWithoutReward();
        const anotherTransactions = blockchain.extractTransactionsWithoutReward();

        // チェーン上トランザクションからハッシュテーブルを作成
        const hashTable1 = new HashTable(transactions);
        const hashTable2 = new HashTable(anotherTransactions);

        // チェーン上のトランザクションとペンディングリストを合成
        hashTable1.merge(this.pendingTransactions);
        hashTable2.merge(blockchain.pendingTransactions);


        // 重複しなかったトランザクションリスト
        const result: Transaction[] = [];

        if (!blockchain.isChainValid()) {
            console.warn("このブロックチェーンは無効です");

        } else if (blockchain.chain.length <= this.chain.length) {
            coloredLog("smaller", "blue");
            /* 
            受け取ったチェーンの長さが自分のチェーン以下であった場合、
            受け取ったチェーンのトランザクションを吸収する
            */
            for (const transaction of anotherTransactions) {
                // 自分のチェーンに相手のトランザクションが存在しなければ
                if (!hashTable1.has(transaction)) {
                    // そのチェーンを自分のペンディングリストに追加する
                    result.push(transaction);
                }
            }
            // NOTE ここの挙動怪しい、図解して整理すること
            this.pendingTransactions.bulkPut(result);
        } else {
            coloredLog("bigger", "blue");
            /*
            受け取ったチェーンの長さが自分のチェーンより大きい場合、
            受け取ったチェーンが自分のトランザクションを吸収する
            */
            for (const transaction of transactions) {
                // 相手のチェーンに自分のチェーンのトランザクションが存在しなければ
                if (!hashTable2.has(transaction)) {
                    // そのチェーンを相手のペンディングリストに追加する。
                    result.push(transaction);
                }
            }
            blockchain.pendingTransactions.bulkPut(result);
            this.chain = blockchain.chain;
            this.pendingTransactions = blockchain.pendingTransactions;
        }
    }

    selfDestruct(): void {
        this.chain = [];
        this.pendingTransactions = new HashTable<Transaction>();
    }

    static jsonToBlockchain(json: string): Blockchain {
        const tmp = JSON.parse(json);
        const blockchain = Object.assign(new Blockchain(), tmp);

        // 保留中のトランザクションの情報を引き継ぐ
        const pendingTransactions = new HashTable<Transaction>(Array.from(blockchain.pendingTransactions.table).map(
            (transaction: any) => new Transaction(transaction.from, transaction.to, transaction.amount, transaction.message)
        ));

        // チェーンの情報を引き継ぐ
        const chain = blockchain.chain.map(
            (block: any) => {
                const transactions = block.transactions.map((transaction: any) => {
                    const tmpTransaction = new Transaction(transaction.from, transaction.to, transaction.amount, transaction.message);
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
}