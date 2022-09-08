import bip39 from "bip39";
import { ec } from "elliptic";
import crypto from "crypto";

const secp256k1 = new ec("secp256k1");


export function genMnemonic() {
    const mnemonic = bip39.generateMnemonic();
    const seed = bip39.mnemonicToEntropy(mnemonic);
    const key = Buffer.from('Bitcoin seed', 'utf8');
    const hmac = crypto.createHmac('sha512', key);
    const hash = hmac.update(seed).digest();
    const privateKey = hash.slice(0, 32);
    const publicKey = secp256k1.keyFromPrivate(privateKey.toString()).getPublic("hex");
    console.log(mnemonic.toString());
}