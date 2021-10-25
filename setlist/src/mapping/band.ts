import { IBand, IBandSong, IBandUser } from "models";
import { GUID_EMPTY } from "utils";
// import { BandSong } from ".";

export class Band implements IBand {

    title: string;
    bandSongs: IBandSong[];
    bandUsers: IBandUser[];
    id: number;
    

    private constructor({ title, bandSongs = [], bandUsers = [], id = GUID_EMPTY }: { title: string; bandSongs?: IBandSong[]; bandUsers?: IBandUser[]; id?: number; }) {
        this.title = title
        this.id = id;
        this.bandSongs = bandSongs
        this.bandUsers = bandUsers
    }

    public static Create(title: string, bandSongs?: IBandSong[], bandUsers?: IBandUser[], id?: number): IBand {
        return new Band({ title, bandUsers, bandSongs, id })
    }

    // public static ToResource(song: IBand): IBandResource {
    //     const { title: Title, id: Id } = song;
    //     return { Title, Id } as IBandResource
    // }

    // public static FromResource(resource: IBandResource): IBand {
    //     const { Title, Id, BandSongs } = resource;

    //     const bandSongs = BandSongs?.reduce((newMap, _) => {
    //         newMap.set(_.Id, BandSong.FromResource(_))
    //         return newMap
    //     }, new Map<string, IBandSong>());

    //     return new Band({ title: Title, id: Id, bandSongs })
    // }

    public static CreateEmpty(): IBand {
        return Band.Create("")
    }
}