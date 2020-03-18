import { ISongCatalog, ISong, SongCatalogType } from "../../models";

export abstract class SongCatalogBase implements ISongCatalog {
    readonly Id: string;
    readonly Title: string;
    readonly Songs: ISong[];
    readonly SonglistType: SongCatalogType;

    constructor(id: string, title: string, songlistType: SongCatalogType, songs: ISong[] = []) {
        this.Id = id;
        this.Songs = songs
        this.Title = title
        this.SonglistType = songlistType
    }
}