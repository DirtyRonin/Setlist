export interface HashTable<T> {
    [key:string]: T;
}

export type task = {
    id: string
    content: string
}
export type column = {
    id: string
    title: string
    taskIds: string[]
}

export interface dndList {
    tasks: HashTable<task>
    columns: HashTable<column>
    columnOrder: string[]
}