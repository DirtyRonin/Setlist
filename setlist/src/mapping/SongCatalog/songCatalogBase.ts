import { ISongCatalog, ISong, CatalogType, ISongFilter } from "../../models";

export abstract class SongCatalogBase implements ISongCatalog {
    readonly Id: string;
    readonly Title: string;
    readonly Songs: ISong[];
    readonly SonglistType: CatalogType;
    readonly Filter: ISongFilter;
    readonly ToBeUpdated: boolean;

    constructor(id: string, title: string, songlistType: CatalogType, filter: ISongFilter, toBeUpdated: boolean = false, songs: ISong[] = [], ) {
        this.Id = id;
        this.Songs = songs
        this.Title = title
        this.SonglistType = songlistType
        this.Filter=filter
        this.ToBeUpdated = toBeUpdated
    }

}