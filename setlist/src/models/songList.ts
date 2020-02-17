import { song } from ".";

export type songlist = {
    id: string;
    title: string;
    songs: song[];
    isLibrary: boolean;
    isMajorLibrary: boolean;
};