const TinySegmenter = require('tiny-segmenter')

const segmenter = new TinySegmenter();

export class Filter {
    list: Set<string>;
    regex: RegExp;
    constructor(list: string[]) {
        this.list = new Set(list);
        this.regex = this.setFilterList();
    }

    setFilterList() {
        return new RegExp(Array.from(this.list).join('|'), 'igm');
    }

    filtering(sentence: string): string {
        return sentence.replace(this.regex, "[deleted]");
    }

    isPure(sentence: string): boolean {
        const words = segmenter.segment(sentence);
        const len = words.length;
        for (let i = 0; i < len; i++) {
            if (this.list.has(words[i])) return false;
        }
        return true;
    }
}