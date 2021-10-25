import { IBandSong, IEntityBase, ISetlistSong } from "models";

export interface ISong extends IEntityBase {
    title: string;
    artist: string;
    originalKey: string;
    evergreen: boolean;
    nineties: boolean;
    // PlayTime: string;
    genre: string;
    comment: string;
    bandSongs:IBandSong[]
    setlistSongs:ISetlistSong[]
 }


   
