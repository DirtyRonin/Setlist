export interface IHashTable<T> {
    [key: string]: T;
}

export class HashTableHelper<T>  {

    private _table: IHashTable<T>

    private constructor(table: IHashTable<T>) {
        this._table = table
    }

    public IsNullOrEmpty = (): boolean =>
        this.internalWorker().isNullOrEmpty

    public FindLastOrDefault = (): T =>
        this.internalWorker().asArray.slice(-1)[0]

    public AsArray = (): T[] =>
        this.internalWorker().asArray

    private internalWorker = () => {
        const isNullOrEmpty = !this._table || Object.values(this._table).length <= 0
        const asArray: T[] = isNullOrEmpty ? [] : Object.values(this._table)

        return { isNullOrEmpty, asArray }
    }

    public static Do<T>(table: IHashTable<T>): HashTableHelper<T> {
        return new HashTableHelper<T>(table)
    }
}
