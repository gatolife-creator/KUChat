const DOCNAME = "document";

export function connect(dbname, version) {
    const dbp = new Promise((resolve, reject) => {
        const req = window.indexedDB.open(dbname, version);
        req.onsuccess = ev => resolve(ev.target?.result);
        req.onerror = ev => reject('fails to open db');
        req.onupgradeneeded = ev => schemeDef(ev.target?.result);
    });
    dbp.then(d => d.onerror = ev => alert("error: " + ev.target.errorCode));
    return dbp;
}

export function schemeDef(db) {
    db.createObjectStore(DOCNAME, { keyPath: "key", autoIncrement: true });
}

export async function put(db, obj) { // returns obj in IDB
    return new Promise((resolve, reject) => {
        const docs = db.transaction([DOCNAME], 'readwrite').objectStore(DOCNAME);
        const req = docs.put(obj);
        req.onsuccess = () => resolve({ ["key"]: req.result, ...obj });
        req.onerror = reject;
    });
}

export async function get(db, id) { // NOTE: if not found, resolves with undefined.
    return new Promise((resolve, reject) => {
        const docs = db.transaction([DOCNAME,]).objectStore(DOCNAME);
        const req = docs.get(id);
        req.onsuccess = () => resolve(req.result);
        req.onerror = reject;
    });
}

export async function load(db) {
    return new Promise(async (resolve, reject) => {
        const saves = [];
        const req = db.transaction([DOCNAME]).objectStore(DOCNAME).openCursor();
        const onfinished = () => {
            console.log(`${saves.length} saves found.`);
            if (saves.length > 0) {
                resolve(saves[saves.length - 1]);
            }
        };
        req.onerror = reject;
        req.onsuccess = (ev) => {
            const cur = ev.target.result;
            if (cur) {
                saves.push(cur.value);
                cur.continue();
            } else {
                onfinished();
            }
        };
    });
}

export async function test() {
    const db = await connect("database", 1);
    put(db, { val: 20 });
    const result = await get(db, 1);
    console.log(result);
}