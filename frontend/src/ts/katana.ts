// NOTE WebRTCとIndexed DBを組み合わせることで、ブロックチェーンを組み込んだアプリケーションの開発を目指したクラス。
// TODO データベースを更新する前に、条件に合致するかどうかの確認を行えるようにしたい。

import { Dexie } from "dexie";
import { io } from "socket.io-client";


class DexieExtend extends Dexie {
    name: string;
    store: Dexie.Table;
    constructor(name: string) {
        super(name);
        this.name = name;
    }
}

export class Katana {
    name: string;
    db: DexieExtend;
    socket: any;

    constructor(name: string) {
        this.name = name;
        this.db = new DexieExtend(name);
        this.db
            .version(1)
            .stores({
                store: "key,value",
            });
        this.socket = io();
    }

    /**
     * データベースの情報を更新
     * @param key 
     * @param value 
     */
    put(key: string, value: any): void {
        this.db.store.put({ key, value }).catch((error) => console.error(error));
    }

    /**
     * 指定したキーの値をデータベースから取り出す
     * @param key 
     * @returns 
     */
    get(key: string) {
        return this.db.store.get(key);
    }

    /**
     * データベース上の情報をサーバーに送信
     * @param key 
     */
    emit(key: string) {
        this.get(key).then((data) => {
            this.socket.emit('update', data);
        })
    }

    /**
     * 情報の送信を検知する
     * @param callback 
     */
    on(callback: Function) {
        this.get("key").then((data) => {
            callback(data);
        })
        
        this.socket.on("update", (data) => {
            callback(data);
        })
    }
}