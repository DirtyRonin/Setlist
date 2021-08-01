import { isThisTypeNode } from "typescript";
import { Song } from ".";
import { ISetlistSong, ISong } from "../models";
import { ISetlistSongResource } from "../resource";
import { GUID_EMPTY } from "../Util";

export class SetlistSong implements ISetlistSong {
    Id: string;
    BandSongId: string;
    SongId: string;
    SetlistId: string;
    Song: ISong;

    private constructor({ song, id = GUID_EMPTY, bandSongId = GUID_EMPTY, songId = GUID_EMPTY, setlistId = GUID_EMPTY }: {
        id?: string;
        bandSongId?: string
        songId?: string
        setlistId?: string
        song: ISong;
    }) {
        this.Song = song
        this.Id = id
        this.BandSongId = bandSongId
        this.SongId = songId
        this.SetlistId = setlistId
    }


    public static Create = ({ song, id, bandSongId, songId, setlistId }: {
        id?: string;
        bandSongId?: string
        songId?: string
        setlistId?: string
        song: ISong;
    }): ISetlistSong =>
        new SetlistSong({ id, bandSongId, songId, setlistId, song })

    public static ToResource = (setlistSong: ISetlistSong): ISetlistSongResource => {
        const { Id, BandSongId, SongId, SetlistId } = setlistSong
        return { Id, BandSongId, SongId, SetlistId } as ISetlistSongResource;
    }

    public static FromResource = (setlistSongResource: ISetlistSongResource): ISetlistSong => {
        const { Id, BandSongId, SongId, SetlistId, Song } = setlistSongResource

        return SetlistSong.Create({ id: Id, bandSongId: BandSongId, songId: SongId, setlistId: SetlistId, song: Song })
    }

    public static EmptySetlistSong = (): ISetlistSong =>
        SetlistSong.Create({ song: Song.EmptySong() })

}