import { Transaction } from "./transaction";
const TinySegmenter = require('tiny-segmenter')

const segmenter = new TinySegmenter();

export class SearchEngine {
    ref: string;
    field: string;
    docs: any;
    database: any;

    constructor(ref: string, field: string) {
        this.ref = ref;
        this.field = field;
        this.docs = {};
        this.database = {};
    }

    add(id: string, doc: any) {
        this.docs[id] = doc;
        this.setDatabase(id, doc);
    }

    setDatabase(id: string, doc: any) {
        const content = doc[this.field];
        const segments = segmenter.segment(content);
        const filtered = SearchEngine.filter(segments);
        const len = filtered.length;
        for (let i = 0; i < len; i++) {
            const item = filtered[i];
            if (this.database[item]) {
                this.database[item].push(id);
            } else {
                this.database[item] = [id];
            }
        }
    }

    updateEngine(engine: SearchEngine) {
        this.ref = engine.ref;
        this.docs = engine.docs;
        this.database = engine.database;
    }

    search<T extends object | Transaction>(text: string) {
        if (!text) return [];
        const segments = segmenter.segment(text);
        const filtered = SearchEngine.filter(segments);
        let matchList: any[] = [];

        const len = filtered.length;
        for (let i = 0; i < len; i++) {
            const item = filtered[i];
            if (this.database[item]) {
                matchList = matchList.concat(this.database[item]);
            }
        }


        let count: any = {};

        // 重複しているIDのカウント
        const len2 = matchList.length;
        for (let i = 0; i < len2; i++) {
            let elm = matchList[i];
            count[elm] = (count[elm] || 0) + 1;
        }

        // 重複が多い順に並び替え
        const array = Object.keys(count).map((k) => ({ key: k, value: count[k] }));

        //値段順
        array.sort((a, b) => b.value - a.value);

        const len3 = array.length;
        const result: T[] = [];
        for (let i = 0; i < len3; i++) {
            const item = array[i];
            result.push(this.docs[item.key]);
        }

        return result;
    }

    static filter(words: string[]): string[] {
        return words.filter((item: string) => !item.match(/^(て|で|に|を|は|が|か|ん|の|や|ばかり|まで|だけ|ほど|も|こそ|でも|ば|と|ても|でも|けれど|けれども|な|とも|さ|よ|から|ぞ|ほど|です|ます|？)$/));
    }
}
