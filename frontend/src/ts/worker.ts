import { Blockchain } from "./blockchain";
import { SearchEngine } from "./searchEngine";
import { v4 as uuidv4 } from "uuid";

interface transactionData {
    blockchain: Blockchain,
    fromAddress: string,
    toAddress: string,
}

export function getTransactionsBetweenTwo(data: transactionData) {
    return data.blockchain.getTransactionsBetweenTwo(
        data.fromAddress,
        data.toAddress,
    )
}

interface docData {
    blockchain: Blockchain,
    engine: SearchEngine,
}

// TODO: 修正が必要
export function setDocuments(data: docData) {
    const len = data.blockchain.chain.length;
    for (let i = 0; i < len; i++) {
        const block = data.blockchain.chain[i];
        for (const transaction of block.transactions) {
            const id = uuidv4();
            data.engine.add(id, transaction);
        }
    }
    return data.engine;
}