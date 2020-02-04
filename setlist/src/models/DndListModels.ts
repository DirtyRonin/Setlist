import { HashTable } from "../Util/HashTable";

export type song = {
    id: string;
    title: string;
    artist: string;
    mode: string;
};

export type setlist = {
    id: string;
    title: string;
    songIds: string[];
};

export interface dndList {
    songs: HashTable<song>;
    setlists: HashTable<setlist>;
    setlistOrder: string[];
}
