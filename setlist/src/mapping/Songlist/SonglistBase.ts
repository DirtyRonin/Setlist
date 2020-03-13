import { ISonglist, ISong, SonglistType } from "../../models";

export abstract class SonglistBase implements ISonglist {
    readonly id: string;
    readonly title: string;
    readonly songs: ISong[];
    readonly songlistType: SonglistType;

    constructor(id: string, title: string, songlistType: SonglistType, songs: ISong[] = []) {
        this.id = id;
        this.songs = songs
        this.title = title
        this.songlistType = songlistType
    }
}