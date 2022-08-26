// import { TinySegmenter } from "tiny-segmenter";
const TinySegmenter = require('tiny-segmenter')

const segmenter = new TinySegmenter();

// TODO 事前にドキュメントのキーワード抽出を行ったほうがいいかもしれない

export class SearchEngine {
    ref: string;
    field: string;
    docs: any[];

    constructor(ref: string, field: string) {
        this.ref = ref;
        this.field = field;
        this.docs = [];
    }

    add(doc: any) {
        this.docs.push(doc);
    }

    search(text: string) {
        if (!text) return [];
        const segments = segmenter.segment(text);
        const filtered = segments.filter((item: string) => !item.match(/^(て|で|に|を|は|が|か|ん|の|や|ばかり|まで|だけ|ほど|も|こそ|でも|ば|と|ても|でも|けれど|けれども|な|とも|さ|よ|から|ぞ|ほど|です|ます|？)$/));
        const filteredRegex = new RegExp(filtered.join("|"));
        console.log(filteredRegex);
        const matchList: any[] = [];
        for (const doc of this.docs) {
            if (doc[this.field].includes(text)) matchList.push(doc);
            else if (doc[this.field].match(filteredRegex)) {
                matchList.push(doc);
            }
        }
        return matchList;
    }
}
