import { createWorkerFactory } from "@shopify/react-web-worker";

import { Blockchain } from "../ts/blockchain/blockchain";
import { Wallet } from "../ts/blockchain/wallet";
import { Katana } from "../ts/katana";

export const createWorker = createWorkerFactory(() => import("../ts/worker"));

export let blockchain = new Blockchain();

export let wallet: Wallet;

export interface BlockchainData {
    key: "key";
    value: string;
}

if (localStorage.getItem("privateKey")) {
    wallet = Wallet.restoreWalletFromPrivateKey(
        localStorage.getItem("privateKey")!,
        blockchain
    );
} else {
    wallet = new Wallet(blockchain);
    localStorage.setItem("privateKey", wallet.keyPair.getPrivate("hex"));
}

export const katana = new Katana("database");
katana.get("key").then((data: BlockchainData) => {
    const tmpBlockchain = Blockchain.jsonToBlockchain(data.value);
    blockchain.replaceChain(tmpBlockchain);
});

katana.on((data: BlockchainData) => {
    const tmpBlockchain = Blockchain.jsonToBlockchain(data.value);
    blockchain.replaceChain(tmpBlockchain);
    katana.put("key", JSON.stringify(blockchain));
    console.log(blockchain);
});

katana.emit("key");