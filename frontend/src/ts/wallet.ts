import { ec as EC } from "elliptic";
import { Transaction } from "./transaction";
import { Blockchain } from "./blockchain";
import { NFT } from "./nft";

const ec = new EC("secp256k1");

export class Wallet {
    blockchain: Blockchain;
    keyPair: EC.KeyPair;
    publicKey: string;

    constructor(blockchain: Blockchain) {
        this.blockchain = blockchain;
        this.keyPair = ec.genKeyPair();
        this.publicKey = this.keyPair.getPublic("hex");
    }

    createTransaction(recipient: string, amount: number, message: string, nft?: NFT): Transaction {
        const transaction = new Transaction(this.publicKey, recipient, amount, message, nft);
        const signedTransaction = this.sign(transaction);
        return signedTransaction;
    }

    getBalance() {
        let balance = 0;

        for (const block of this.blockchain.chain) {
            for (const trans of block.transactions) {
                if (trans.from === this.publicKey) {
                    balance -= trans.amount;
                } else if (trans.to === this.publicKey) {
                    balance += trans.amount;
                }
            }
        }
        return balance;
    }

    getTransactions() {
        const transactions: Transaction[] = [];
        for (const block of this.blockchain.chain) {
            for (const trans of block.transactions) {
                if (trans.from === this.publicKey || trans.to === this.publicKey) {
                    transactions.push(trans);
                }
            }
        }
        return transactions;
    }

    getCorrespondents() {
        const transactions = this.getTransactions();
        const correspondents: string[] = [];
        for (const transaction of transactions) {
            if (transaction.from !== this.publicKey) {
                correspondents.push(transaction.from);
            } else if (transaction.to !== this.publicKey) {
                correspondents.push(transaction.to);
            }
        }
        return [...new Set(correspondents)];
    }

    getNFT(): NFT[] {
        const NFTs: NFT[] = [];

        for (const block of this.blockchain.chain) {
            for (const trans of block.transactions) {
                if (!trans.nft) continue;
                NFTs.push(trans.nft);
            }
        }

        return NFTs;
    }

    sign(transaction: Transaction) {
        if (this.keyPair.getPublic("hex") !== this.publicKey) {
            throw new Error("You cannot sign transactions for other wallets!");
        }

        const hashTx = transaction.calculateHash();
        const sig = this.keyPair.sign(hashTx, "base64");
        transaction.signature = sig.toDER("hex");
        return transaction;
    }

    static restoreWalletFromPrivateKey(privateKey: string, blockchain: Blockchain): Wallet {
        const keyPair = ec.keyFromPrivate(privateKey);
        const publicKey = keyPair.getPublic("hex");
        const wallet = new Wallet(blockchain);
        wallet.keyPair = keyPair;
        wallet.publicKey = publicKey;
        return wallet;
    }

    update(blockchain: Blockchain) {
        this.blockchain = blockchain;
    }
}