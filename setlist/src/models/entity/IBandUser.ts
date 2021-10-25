import { IBand } from ".";
import { IEntityBase } from "./IEntityBase";

export interface IBandUser extends IEntityBase { 
    userId :number
    bandId :number
    band : IBand
}