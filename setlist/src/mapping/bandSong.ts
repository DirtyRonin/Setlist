import { IBandSong, ISong } from "../models";
import { GUID_EMPTY } from "../utils";
import { Song } from ".";

export class BandSong implements IBandSong {

    popularity: number;
    songId: number;
    bandId: number;
    song: ISong;

    constructor({ popularity, song, songId = GUID_EMPTY, bandId = GUID_EMPTY }: { popularity: number; song: ISong; songId?: number; bandId?: number; },) {
        this.popularity = popularity;
        this.songId = songId;
        this.bandId = bandId;
        this.song = song;
    }

    public static Create = ({ popularity, song, songId, bandId }: { popularity: number; song: ISong; songId?: number; bandId?: number; }): IBandSong =>
        new BandSong({ popularity, song, songId, bandId })

    public static CreateEmpty = (): IBandSong =>
        BandSong.Create({ popularity: 0, song: Song.CreateEmpty() })



}