// NOTE このハッシュテーブルは、一般的に言われるものと異なることに注意
import { SHA1 } from "crypto-js";

export class HashTable<T> {
    table: [key: string, data: T];

    put(data: T): void {
        const hash = SHA1(String(data)).toString();
        this.table[hash] = data;
    }

    bulkPut(data: T[]): void {
        data.forEach(d => this.put(d));
    }

    has(data: T): boolean {
        const hash = SHA1(String(data)).toString();
        return this.table.hasOwnProperty(hash);
    }

    get(hash: string): T {
        return this.table[hash];
    }

    bulkGet(hashes: string[]): T[] {
        return hashes.map(hash => this.get(hash));
    }

    static isEqual(data1: never, data2: never) {
        const hash1 = SHA1(data1);
        const hash2 = SHA1(data2);
        return hash1 === hash2;
    }
}