export class Indb {
    name: string;
    version: number;
    open: any;
    db: any;

    constructor(dbName: string, version = 1) {
        this.name = dbName;
        this.version = version;
        //this.init();
    }
    private init(tableName: string) {
        const open = indexedDB.open(this.name, this.version);
        open.onupgradeneeded = function () {
            open.result.createObjectStore(tableName, { keyPath: 'id' });
        };

        return open;
    }
    public save(tableName: string, data: Array<{}>) {
        const open = this.init(tableName);
        open.onsuccess = function () {
            const db = open.result;
            const transaction = db.transaction(tableName, 'readwrite');
            const store = transaction.objectStore(tableName);
            data.forEach((el, index) => {
                store.put({ id: index, data: el });
            });
            transaction.oncomplete = function () {
                this.db.close();
            };
        };
    }
    public delete() {
        indexedDB.deleteDatabase(this.name);
    }
    public get(tableName: string, limit: number) {}

    public getAll(tableName: string) {
        return new Promise((res, rej) => {
            const open = this.init(tableName);
            open.onsuccess = function () {
                const db = open.result;
                const transaction = db.transaction(tableName);
                const store = transaction.objectStore(tableName);

                const query = store.getAll();
                query.onsuccess = function () {
                    res(query.result);
                };

                transaction.oncomplete = function () {
                    this.db.close();
                };
            };
        });
    }
}
