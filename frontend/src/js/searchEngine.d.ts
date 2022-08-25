export declare class SearchEngine {
    ref: string;
    field: string;
    docs: any[];
    constructor(ref: string, field: string);
    add(doc: any): void;
    search(text: string): any[];
}
