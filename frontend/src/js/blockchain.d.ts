import { Transaction } from "./transaction";
import { Block } from "./block";
export declare class Blockchain {
    chain: Block[];
    pendingTransactions: Transaction[];
    constructor();
    static createGenesisBlock(): Block;
    getLatestBlock(): Block;
    addTransaction(transaction: Transaction): void;
    minePendingTransactions(miningRewardAddress: string): void;
    getBalanceOfAddress(address: string): number;
    getTransactionsOfAddress(address: string): Transaction[];
    getTransactionsBetweenTwo(address1: string, address2: string): Transaction[];
    isChainValid(): boolean;
    static jsonToBlockchain(json: string): Blockchain;
    replaceChain(chain: Block[]): void | boolean;
    selfDestruct(): void;
}
