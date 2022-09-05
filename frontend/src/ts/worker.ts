import { Blockchain } from "./blockchain";

interface data {
    blockchain: Blockchain,
    fromAddress: string,
    toAddress: string,
}

export function getTransactionsBetweenTwo(data: data) {
    return data.blockchain.getTransactionsBetweenTwo(
        data.fromAddress,
        data.toAddress,
    )
}