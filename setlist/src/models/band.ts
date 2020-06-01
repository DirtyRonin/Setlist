import { IBandSong } from ".";

export interface IBand {
    Id: string;
    Title: string;
    BandSongs: Map<string, IBandSong>
}