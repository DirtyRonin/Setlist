import { isThisTypeNode } from "typescript";
import { Song } from ".";
import { ISetlistSong, ISong } from "../models";
import { ISetlistSongResource } from "../resource";
import { GUID_EMPTY } from "../utils";

export class SetlistSong implements ISetlistSong {

    bandSongId: number;
    songId: number;
    setlistId: number;
    song: ISong;

    private constructor({ song, bandSongId = GUID_EMPTY, songId = GUID_EMPTY, setlistId = GUID_EMPTY }: {
        bandSongId?: number
        songId?: number
        setlistId?: number
        song: ISong;
    }) {
        this.song = song
        this.bandSongId = bandSongId
        this.songId = songId
        this.setlistId = setlistId
    }


    public static Create = ({ song,  bandSongId, songId, setlistId }: {
        bandSongId?: number
        songId?: number
        setlistId?: number
        song: ISong;
    }): ISetlistSong =>
        new SetlistSong({  bandSongId, songId, setlistId, song })

    public static CreateEmpty = (): ISetlistSong =>
        SetlistSong.Create({ song: Song.CreateEmpty() })

}