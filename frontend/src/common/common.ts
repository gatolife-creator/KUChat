import { createWorkerFactory } from "@shopify/react-web-worker";

import { Blockchain } from "../ts/blockchain/blockchain";
import { Wallet } from "../ts/blockchain/wallet";
import { Katana } from "../ts/katana";

export const createWorker = createWorkerFactory(() => import("../ts/worker"));

export let blockchain = new Blockchain();

export let wallet: Wallet;
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
katana.get("key").then((data) => {
    const storedBlockchain = data.value;
    blockchain = Blockchain.jsonToBlockchain(storedBlockchain);
});