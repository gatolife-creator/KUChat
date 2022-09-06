import { Blockchain } from "./blockchain";
import { SearchEngine } from "./searchEngine";
import { v4 as uuidv4 } from "uuid";

interface transactionData {
    blockchain: Blockchain,
    fromAddress: string,
    toAddress: string,
}

// interface miningData {
//     blockchain: Blockchain,
//     address: string,
// }

export function getTransactionsBetweenTwo(data: transactionData) {
    return data.blockchain.getTransactionsBetweenTwo(
        data.fromAddress,
        data.toAddress,
    )
}

// export function minePendingTransactions(data: miningData) {
//     data.blockchain.minePendingTransactions(data.address);
//     return data.blockchain;
// }

interface docData {
    blockchain: Blockchain,
    engine: SearchEngine,
}

// TODO: 修正が必要
export function setDocuments(data: docData) {
    for (const block of data.blockchain.chain) {
        for (const transaction of block.transactions) {
            const id = uuidv4();
            data.engine.add(id, transaction);
        }
    }
    return data.engine;
}

// interface searchData {
//     engine: SearchEngine,
//     query: string,
// }

// export function search(data: searchData) {
//     return data.engine.search(data.query);
// }
