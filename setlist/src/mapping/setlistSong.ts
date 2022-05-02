import { Song } from ".";
import { ISetlistSong, ISong } from "../models";
import { GUID_EMPTY } from "../utils";

export class SetlistSong implements ISetlistSong {

    bandSongId: number;
    songId: number;
    setlistId: number;
    order: number;
    song: ISong;
    id: number;

    private constructor({ song, bandSongId = GUID_EMPTY, songId = GUID_EMPTY, setlistId = GUID_EMPTY, order = GUID_EMPTY, id = GUID_EMPTY }: {
        bandSongId?: number
        songId?: number
        setlistId?: number
        order?: number
        song: ISong;
        id?: number;
    }) {
        this.song = song
        this.bandSongId = bandSongId
        this.songId = songId
        this.setlistId = setlistId
        this.order = order
        this.id = id
    }


    public static Create = ({ song, bandSongId, songId, setlistId, order, id }: {
        bandSongId?: number
        songId?: number
        setlistId?: number
        order?: number
        song: ISong;
        id?: number;
    }): ISetlistSong =>
        new SetlistSong({ bandSongId, songId, setlistId, song, order,id })

    public static CreateEmpty = (): ISetlistSong =>
        SetlistSong.Create({ song: Song.CreateEmpty() })

}