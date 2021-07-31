import { ISetlist } from "../models";
import { ISetlistResource } from "../resource";
import { GUID_EMPTY } from "../Util";

export class Setlist implements ISetlist {
    Id: string;
    Title: string;
    Comment: string;

    constructor({ title, comment, id = GUID_EMPTY }: { title: string; comment: string; id?: string; }) {
        this.Title = title
        this.Comment = comment
        this.Id = id
    }


    public static Create = ({ title, comment, id }: { title: string; comment: string; id?: string; }): ISetlist =>
        new Setlist({ title, comment, id })


    public static ToResource = (setlist: ISetlist): ISetlistResource => {
        const { Title, Comment, Id } = setlist
        return { Title, Comment, Id } as ISetlistResource
    }

    public static FromResource = (resource: ISetlistResource): ISetlist => {
        const { Title, Comment, Id } = resource
        return { Title, Comment, Id } as ISetlist
    }

    public static EmptySetlist = (): ISetlist =>
        Setlist.Create({ title: '', comment: '' })
}