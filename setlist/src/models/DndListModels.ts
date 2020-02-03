export interface HashTable<T> {
    [key:string]: T;
}

export type Song = {
    id: string
    title: string
    artist: string;
    mode: string;
}
export type column = {
    id: string
    title: string
    taskIds: string[]
}

export interface dndList {
    songs: HashTable<Song>
    columns: HashTable<column>
    columnOrder: string[]
}