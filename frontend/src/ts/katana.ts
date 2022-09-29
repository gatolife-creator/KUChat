// NOTE WebRTCとIndexed DBを組み合わせることで、ブロックチェーンを組み込んだアプリケーションの開発を目指したクラス。
// TODO データベースを更新する前に、条件に合致するかどうかの確認を行えるようにしたい。

import { Dexie } from "dexie";
import { io } from "socket.io-client";

export class Katana {
    name: string;
    db: Dexie;
    socket: any;

    constructor(name: string) {
        this.name = name;
        this.db = new Dexie(name);
        this.db
            .version(1)
            .stores({
                store: "key,value",
            });
        this.socket = io();

        this.socket.on("update", (message) => {
            console.log(message);
        })
    }

    put(key: string, value: any): void {
        this.db.store.put({ key, value }).catch((error) => console.error(error));
        console.log("successfully put");
    }

    get(key: string) {
        return this.db.store.get(key);
    }

    emit(key: string) {
        this.get(key).then((data) => {
            this.socket.emit('update', data);
        })
    }

    on(callback: Function) {
        this.socket.on("update", (message) => {
            callback(message);
        })
    }
}