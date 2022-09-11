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
        for(const word of this.list) {
            this.list = this.list.add(word);
        }
        return new RegExp(Array.from(this.list).join('|'), 'igm');
    }

    filtering(sentence: string): string {
        return sentence.replace(this.regex, "[deleted]");
    }

    isPure(sentence: string): boolean {
        const words = segmenter.segment(sentence);
        for(const word of words) {
            if(this.list.has(word)) return false;
        }
        return true;
    }
}