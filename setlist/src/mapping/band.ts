import { IBand, IBandSong } from "../models";
import { IBandResource } from "../resource";
import { GUID_EMPTY } from "../Util";
import { BandSong } from ".";

export class Band implements IBand {

    Id: string;
    Title: string;
    BandSongs: IBandSong[];

    private constructor(title: string, bandSongs: IBandSong[] = [], id: string = GUID_EMPTY) {
        this.Title = title
        this.Id = id;
        this.BandSongs = bandSongs
    }

    public static Create(title: string, bandSongs? : IBandSong[], id?: string): IBand { 
        return new Band(title, bandSongs, id) 
    }

    public static ToResource(song:IBand): IBandResource {
        const { Title,BandSongs, Id } = song;
        return { Title,BandSongs, Id } as IBandResource
    }

    public static FromResource(resource: IBandResource): IBand {
        const { Title,BandSongs, Id } = resource;
        const bandSongs = BandSongs?.map(bandSong => BandSong.FromResource(bandSong)) 
        return new Band(Title,bandSongs, Id)
    }
}