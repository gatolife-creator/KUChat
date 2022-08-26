export class Filter {
    regex: RegExp;
    constructor(list: string[]) {
        this.regex = this.setFilterList(list);
    }

    setFilterList(list: string[]): RegExp {
        const regexStringArray: string[] = [];
        for (let word of list) {
            regexStringArray.push(word);
        }

        return new RegExp(regexStringArray.join('|'), 'igm');
    }

    filtering(sentence: string): string {
        return sentence.replace(this.regex, "[deleted]");
    }

    isPure(sentence: string): boolean {
        if(sentence.match(this.regex)) return false;
        else return true;
    }
}