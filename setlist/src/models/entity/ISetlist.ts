import { IEntityBase, ISetlistSong } from "models";

export interface ISetlist extends IEntityBase{
    title: string;
    comment:string;
    setlistSongs: ISetlistSong[];
}
