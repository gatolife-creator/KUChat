import { createWorkerFactory } from "@shopify/react-web-worker";

import { Blockchain } from "../ts/blockchain";
import { Wallet } from "../ts/wallet";
import Gun from "gun";

export const createWorker = createWorkerFactory(() => import("../ts/worker"));

export const blockchain = new Blockchain();

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

export const gun = Gun({
    peers: [`${window.location.origin}/gun`, "http://localhost:3001/gun"],
});

gun.get("blockchain").once((data) => {
    if (!data) {
        gun.get("blockchain").put({ blockchain: JSON.stringify(blockchain) });
    }
});

gun.get("blockchain").on((data) => {
    const parsedBlockchain = Blockchain.jsonToBlockchain(data.blockchain);
    blockchain.replaceChain(parsedBlockchain.chain);
      console.log(blockchain);
})