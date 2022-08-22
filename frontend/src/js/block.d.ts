import { Transaction } from './transaction';
export declare class Block {
    preHash: string;
    hash: string;
    timestamp: number;
    difficulty: number;
    transactions: Transaction[];
    nonce: number;
    constructor(preHash: string, transactions: Transaction[]);
    calculateHash(): string;
    validateBlock(): void;
    hasValidTransactions(): boolean;
}
