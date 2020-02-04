export interface HashTable<T> {
    [key:string]: T;
}

export type Song = {
    id: string
    title: string
    artist: string;
    mode: string;
}
export type setlist = {
    id: string
    title: string
    songIds: string[]
}

export interface dndList {
    songs: HashTable<Song>
    setlists: HashTable<setlist>
    setlistOrder: string[]
}