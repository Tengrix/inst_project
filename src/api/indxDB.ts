export class Indb {
    name: string;
    version: number;
    open: any;
    db: any;

    constructor(dbName: string, tables: string[], version = 1) {
        this.name = dbName;
        this.version = version;
        this.create_tables(tables);
    }

    private create_tables(tableNames: string[]) {
        const open = indexedDB.open(this.name, this.version);
        open.onupgradeneeded = function () {
            for (const tableName of tableNames) {
                open.result.createObjectStore(tableName, { keyPath: 'id' });
            }
        };
    }

    private query(callback: (store: IDBObjectStore) => any, tableName: string, mode: IDBTransactionMode = 'readonly') {
        return new Promise((res, rej) => {
            const open = indexedDB.open(this.name, this.version);
            open.onsuccess = function () {
                const db = open.result;
                const transaction = db.transaction(tableName, mode);
                const store = transaction.objectStore(tableName);
                const q = callback(store);
                if (q) {
                    q.onsuccess = function () {
                        res(q.result);
                    };
                }

                transaction.oncomplete = function () {
                    this.db.close();
                };
            };
        });
    }

    public save(tableName: string, data: Array<{}>) {
        const request = (store: IDBObjectStore) => {
            data.forEach((el, index) => {
                store.put({ id: index, data: el });
            });
        };
        return this.query(request, tableName, 'readwrite');
    }

    public delete() {
        indexedDB.deleteDatabase(this.name);
    }

    public clear(tableName: string) {
        const request = (store: IDBObjectStore) => {
            store.clear();
        };
        this.query(request, tableName, 'readwrite');
    }

    public get(tableName: string, limit: number) {}

    public getAll(tableName: string) {
        const request = (store: IDBObjectStore) => {
            return store.getAll();
        };
        return this.query(request, tableName);
    }
}
