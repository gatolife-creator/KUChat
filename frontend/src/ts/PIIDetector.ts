export class PIIDetector {
    list: string;
    regex: RegExp;

    constructor() {
        const IPv4 = "^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])$";
        const phoneNumber = "^0\\d{1,3}-\\d{2,4}-\\d{3,4}$";
        const email = "^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\\.)+[a-zA-Z]{2,}$";
        const postalCode = "^\\d{3}-\\d{4}$";
        const creditCard = "(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6011[0-9]{12}|3(?:0[0-5]|[68][0-9])[0-9]{11}|3[47]{13}|(?:2131|1800|35[0-9]{3})[0-9]{11})";
        
        this.list = [IPv4, phoneNumber, email, postalCode, creditCard].join("|");
        this.regex = this.setRegex(this.list);
    }

    setRegex(list: string): RegExp {
        return new RegExp(list, 'igm');
    }

    filtering(sentence: string): string {
        return sentence.replace(this.regex, "[deleted]");
    }

    includePII(sentence: string): boolean {
        if (sentence.match(this.regex)) return false;
        else return true;
    }
}