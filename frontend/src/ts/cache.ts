export class Cache {
    func: Function;
    cache: { [key: string]: any };
    constructor(func: Function) {
        this.cache = new Map();
        this.func = func;
    }

    run(...args: any[]): any {
        console.log(args.toString());
        if (this.cache.has(args.toString())) {
            console.log("result from cache: " + this.cache.get(args.toString()));
            return this.cache.get(args.toString());
        } else {
            const result = this.func(...args);
            this.cache.set(args.toString(), result);
            console.log("result was cached: " + this.cache.get(args.toString()));
            return result;
        }
    }

    clear(key: string): void {
        this.cache.delete(key);
    }

    clearAll(): void {
        this.cache.clear();
    }
}