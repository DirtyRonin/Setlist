import { IBandSong, IBandUser } from "models";

export interface IBand {
    Id: string;
    Title: string;
    BandSongs: Map<string, IBandSong>;
    BandUsers: Map<string, IBandUser>;
}
