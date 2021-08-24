import { IBand, IBandSong, IBandUser } from "models";
import { IBandResource } from "resource";
import { GUID_EMPTY } from "utils";
import { BandSong } from "./bandSong";
// import { BandSong } from ".";

export class Band implements IBand {

    Id: string;
    Title: string;
    BandSongs: Map<string, IBandSong>;
    BandUsers: Map<string, IBandUser>;

    private constructor({ title, bandSongs = new Map(), bandUsers = new Map(), id = GUID_EMPTY }: { title: string; bandSongs?: Map<string, IBandSong>; bandUsers?: Map<string, IBandUser>; id?: string; }) {
        this.Title = title
        this.Id = id;
        this.BandSongs = bandSongs
        this.BandUsers = bandUsers
    }

    public static Create(title: string, bandSongs?: Map<string, IBandSong>, bandUsers?: Map<string, IBandUser>, id?: string): IBand {
        return new Band({ title, bandUsers, bandSongs, id })
    }

    public static ToResource(song: IBand): IBandResource {
        const { Title, Id } = song;
        return { Title, Id } as IBandResource
    }

    public static FromResource(resource: IBandResource): IBand {
        const { Title, Id, BandSongs } = resource;

        const bandSongs = BandSongs?.reduce((newMap, _) => {
            newMap.set(_.Id, BandSong.FromResource(_))
            return newMap
        }, new Map<string, IBandSong>());

        return new Band({ title: Title, id: Id, bandSongs })
    }

    public static EmptyBand(): IBand {
        return Band.Create("")
    }
}