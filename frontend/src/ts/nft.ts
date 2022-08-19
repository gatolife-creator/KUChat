import { SHA1, SHA256 } from "crypto-js";

export class NFT {
    title: string;
    creator: string;
    description: string;
    timestamp: number;
    content: Card | Card[];
    price: number;
    movable: boolean;
    id: string;

    constructor(title: string, creator: string, description: string, content: Card | Card[], price: number, movable: boolean) {
        this.title = title;
        this.creator = creator;
        this.description = description;
        this.timestamp = Date.now();
        this.content = content;
        this.price = price;
        this.movable = movable;
        this.id = SHA1(String(this.timestamp + Math.random())).toString();
    }

    calculateHash(): string {
        return SHA256(
            this.title +
            this.creator +
            this.description +
            this.timestamp +
            this.content +
            this.price +
            this.movable +
            this.id
        ).toString();
    }
}

export class Card {
    question: string;
    answer: string;
    hint: string;
    constructor(question: string, answer: string, hint = "") {
        this.question = question;
        this.answer = answer;
        this.hint = hint;
    }
}