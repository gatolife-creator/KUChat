// import { TinySegmenter } from "tiny-segmenter";
const TinySegmenter = require('tiny-segmenter')

const segmenter = new TinySegmenter();

// TODO 事前にドキュメントのキーワード抽出を行ったほうがいいかもしれない

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
        const filtered = segments.filter((item: string) => !item.match(/^(て|で|に|を|は|が|か|ん|の|や|ばかり|まで|だけ|ほど|も|こそ|でも|ば|と|ても|でも|けれど|けれども|な|とも|さ|よ|から|ぞ|ほど|です|ます|？)$/));
        for (const item of filtered) {
            if (this.database[item]) {
                this.database[item].push(id);
            } else {
                this.database[item] = [id];
            }
        }
    }

    search(text: string) {
        if (!text) return [];
        const segments = segmenter.segment(text);
        const filtered = segments.filter((item: string) => !item.match(/^(て|で|に|を|は|が|か|ん|の|や|ばかり|まで|だけ|ほど|も|こそ|でも|ば|と|ても|でも|けれど|けれども|な|とも|さ|よ|から|ぞ|ほど|です|ます|？)$/));
        let matchList: any[] = [];

        for (const item of filtered) {
            if (this.database[item]) {
                matchList = matchList.concat(this.database[item]);
            }
        }


        let count: any = {};

        // 重複しているIDのカウント
        for (let i = 0; i < matchList.length; i++) {
            let elm = matchList[i];
            count[elm] = (count[elm] || 0) + 1;
        }

        // 重複が多い順に並び替え
        const array = Object.keys(count).map((k) => ({ key: k, value: count[k] }));

        //値段順
        array.sort((a, b) => b.value - a.value);

        const result: object[] = [];
        for (const item of array) {
            result.push(this.docs[item.key]);
        }

        return result;
    }
}
