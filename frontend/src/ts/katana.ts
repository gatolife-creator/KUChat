// NOTE WebRTCとIndexed DBを組み合わせることで、ブロックチェーンを組み込んだアプリケーションの開発を目指したクラス。
// TODO データベースを更新する前に、条件に合致するかどうかの確認を行えるようにしたい。

import { Dexie } from "dexie";

export class Katana {
    name: string;
    db: Dexie;

    constructor(name: string) {
        this.name = name;
        this.db = new Dexie(name);
        this.db
            .version(1)
            .stores({
                store: "key,value",
            });
    }

    put(key: string, value: any): void {
        this.db.store.put({ key, value }).catch((error) => console.error(error));
    }

    get(key: string) {
        return this.db.store.get(key);
    }
}