import { ec } from "elliptic";
import { NFT } from "./nft";
export declare class Transaction {
    fromAddress: string;
    toAddress: string;
    amount: number;
    message: string;
    timestamp: number;
    signature: string;
    nft: NFT | undefined;
    constructor(fromAddress: string, toAddress: string, amount: number, message: string, nft?: NFT);
    calculateHash(): string;
    signTransaction(signingKey: ec.KeyPair): void;
    isValid(): boolean;
}
