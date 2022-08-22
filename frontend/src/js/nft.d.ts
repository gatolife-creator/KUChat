export declare class NFT {
    title: string;
    creator: string;
    description: string;
    timestamp: number;
    content: Card | Card[];
    price: number;
    movable: boolean;
    id: string;
    constructor(title: string, creator: string, description: string, content: Card | Card[], price: number, movable: boolean);
    calculateHash(): string;
}
export declare class Card {
    question: string;
    answer: string;
    hint: string;
    constructor(question: string, answer: string, hint?: string);
}
