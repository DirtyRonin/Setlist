import { SetlistSong } from "mapping";
import { ISetlist, ISetlistSong } from "../models";
import { ISetlistResource } from "../resource";
import { GUID_EMPTY } from "../utils";

export class Setlist implements ISetlist {
    id: number;
    title: string;
    comment: string;
    setlistSongs: ISetlistSong[];

    constructor({ title, comment, id = GUID_EMPTY, setlistSongs = [] }: { title: string; comment: string; id?: number; setlistSongs?: ISetlistSong[] }) {
        this.title = title
        this.comment = comment
        this.id = id
        this.setlistSongs = setlistSongs
    }


    public static Create = ({ title, comment, id, setlistSongs }: { title: string; comment: string; id?: number; setlistSongs?: ISetlistSong[] }): ISetlist =>
        new Setlist({ title, comment, id, setlistSongs })


    // public static ToResource = (setlist: ISetlist): ISetlistResource => {
    //     const { Title, Comment, id: Id } = setlist
    //     return { Title, Comment, Id } as ISetlistResource
    // }

    // public static FromResource = (resource: ISetlistResource): ISetlist => {
    //     const { Title, Comment, Id, SetlistSongs } = resource

    //     const setlistSongs = SetlistSongs?.reduce((newMap, _) => {
    //         newMap.set(_.Id, SetlistSong.FromResource(_))
    //         return newMap
    //     }, new Map<string, ISetlistSong>());

    //     return Setlist.Create({ title: Title, comment: Comment, id: Id, setlistSongs })
    // }

    public static CreateEmpty = (): ISetlist =>
        Setlist.Create({ title: '', comment: '' })
}