import { ILocation, IBand, ISetlist } from "models";
import { IEntityBase } from "./IEntityBase";

export interface ICustomEvent extends IEntityBase {
    date: Date | null;
    locationId: number;
    bandId: number;
    setlistId: number;
    title: string;
    location:ILocation| null
    Band:IBand| null
    setlist:ISetlist| null
}