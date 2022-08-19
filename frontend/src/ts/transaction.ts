import { SHA256 } from "crypto-js";
import { ec } from "elliptic";
import { NFT } from "./nft";

const secp256k1 = new ec("secp256k1");

export class Transaction {
    fromAddress: string;
    toAddress: string;
    amount: number;
    timestamp: number;
    signature: string;
    nft: NFT | undefined;

    constructor(fromAddress: string, toAddress: string, amount: number, nft?: NFT) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
        this.timestamp = Date.now();
        this.signature = "";
        this.nft = nft;
    }

    calculateHash(): string {
        return SHA256(
            this.fromAddress +
            this.toAddress +
            this.amount +
            this.timestamp +
            this.nft
        ).toString();
    }


    signTransaction(signingKey: ec.KeyPair): void {
        if (signingKey.getPublic("hex") !== this.fromAddress) {
            throw new Error("You cannot sign transactions for other wallets!");
        }

        const hashTx = this.calculateHash();
        const sig = signingKey.sign(hashTx, "base64");
        this.signature = sig.toDER("hex");
    }

    isValid(): boolean {
        if (this.fromAddress === "System") return true;

        if (!this.signature || this.signature.length === 0) {
            throw new Error("No signature in this transaction");
        }

        const publicKey = secp256k1.keyFromPublic(this.fromAddress, "hex");
        return publicKey.verify(this.calculateHash(), this.signature);
    }
}