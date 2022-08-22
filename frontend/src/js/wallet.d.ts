import { ec as EC } from "elliptic";
import { Transaction } from "./transaction";
import { Blockchain } from "./blockchain";
import { NFT } from "./nft";
export declare class Wallet {
    blockchain: Blockchain;
    keyPair: EC.KeyPair;
    publicKey: string;
    constructor(blockchain: Blockchain);
    createTransaction(recipient: string, amount: number, message: string, nft?: NFT): Transaction;
    getBalance(): number;
    getTransactions(): Transaction[];
    getCorrespondents(): string[];
    getNFT(): NFT[];
    sign(transaction: Transaction): Transaction;
    static restoreWalletFromPrivateKey(privateKey: string, blockchain: Blockchain): Wallet;
    update(blockchain: Blockchain): void;
}
