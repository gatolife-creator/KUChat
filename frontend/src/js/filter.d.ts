export declare class Filter {
    regex: RegExp;
    constructor(list: string[]);
    setFilterList(list: string[]): RegExp;
    filtering(sentence: string): string;
    isPure(sentence: string): boolean;
}
