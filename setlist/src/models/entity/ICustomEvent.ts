import { ILocation, IBand, ISetlist } from "models";
import { IEntityBase } from "./IEntityBase";

export interface ICustomEvent extends IEntityBase {
    date: Date  ;
    locationId: number;
    bandId: number;
    setlistId: number;
    title: string;
    location:ILocation
    band:IBand
    setlist:ISetlist
}