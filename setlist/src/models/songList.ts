import { song } from ".";

export type songlist = {
    id: string;
    title: string;
    songs: song[];
    isBandList: boolean;
    isMainList: boolean;
};

export type bandlist = { id: string; title: string; bandsongs: song[]; isBandList: boolean };
