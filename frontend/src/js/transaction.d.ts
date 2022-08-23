import { ec } from "elliptic";
import { NFT } from "./nft";
export declare class Transaction {
    from: string;
    to: string;
    amount: number;
    message: string;
    timestamp: number;
    signature: string;
    nft: NFT | undefined;
    constructor(from: string, to: string, amount: number, message: string, nft?: NFT);
    calculateHash(): string;
    signTransaction(signingKey: ec.KeyPair): void;
    isValid(): boolean;
}
