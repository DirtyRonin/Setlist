import { IBandSong, IBandUser } from "models";
import { IEntityBase } from "./IEntityBase";

export interface IBand extends IEntityBase{
    title: string;
    bandSongs: IBandSong[];
    bandUsers: IBandUser[];
}
