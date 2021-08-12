import { ISetlistSong } from "models";

export interface ISetlist {
    Id: string;
    Title: string;
    Comment:string;
    SetlistSongs: Map<string, ISetlistSong>;
}
