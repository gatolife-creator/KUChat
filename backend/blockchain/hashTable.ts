// NOTE このハッシュテーブルは、一般的に言われるものと異なることに注意
import { SHA1 } from "crypto-js";

export class HashTable<T> {
    table: { [key: string]: T } = {};

    constructor(data?: T[]) {
        if (data) {
            this.bulkPut(data);
        }
    }

    put(data: T): void {
        const hash = SHA1(JSON.stringify(data)).toString();
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

    extract(): T[] {
        return Object.keys(this.table).map(d => this.get(d));
    }

    merge(hashTable: HashTable<T>): void {
        this.table = { ...this.table, ...hashTable.table };
    }

    getLength(): number {
        return Object.keys(this.table).length;
    }

    static isEqual(data1: never, data2: never) {
        const hash1 = SHA1(data1);
        const hash2 = SHA1(data2);
        return hash1 === hash2;
    }
}