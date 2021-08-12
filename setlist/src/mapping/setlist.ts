import { SetlistSong } from "mapping";
import { ISetlist, ISetlistSong } from "../models";
import { ISetlistResource } from "../resource";
import { GUID_EMPTY } from "../Util";

export class Setlist implements ISetlist {
    Id: string;
    Title: string;
    Comment: string;
    SetlistSongs: Map<string, ISetlistSong>;

    constructor({ title, comment, id = GUID_EMPTY, setlistSongs = new Map() }: { title: string; comment: string; id?: string; setlistSongs?: Map<string, ISetlistSong> }) {
        this.Title = title
        this.Comment = comment
        this.Id = id
        this.SetlistSongs = setlistSongs
    }


    public static Create = ({ title, comment, id, setlistSongs }: { title: string; comment: string; id?: string; setlistSongs?: Map<string, ISetlistSong> }): ISetlist =>
        new Setlist({ title, comment, id, setlistSongs })


    public static ToResource = (setlist: ISetlist): ISetlistResource => {
        const { Title, Comment, Id } = setlist
        return { Title, Comment, Id } as ISetlistResource
    }

    public static FromResource = (resource: ISetlistResource): ISetlist => {
        const { Title, Comment, Id, SetlistSongs } = resource

        const setlistSongs = SetlistSongs?.reduce((newMap, _) => {
            newMap.set(_.Id, SetlistSong.FromResource(_))
            return newMap
        }, new Map<string, ISetlistSong>());

        return Setlist.Create({ title: Title, comment: Comment, id: Id, setlistSongs })
    }

    public static EmptySetlist = (): ISetlist =>
        Setlist.Create({ title: '', comment: '' })
}