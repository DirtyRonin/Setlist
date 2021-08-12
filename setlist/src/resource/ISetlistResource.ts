import { ISetlistSongResource } from "resource";

export interface ISetlistResource {
    Id: string;
    Title: string;
    Comment: string;
    SetlistSongs?: ISetlistSongResource[]
}