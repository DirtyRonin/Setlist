import { ILocation, IBand, ISetlist } from "models";

export interface ICustomEvent {
    Id: string;
    Date: Date;
    LocationId: string;
    BandId: string;
    SetlistId: string;
    Title: string;
    Location:ILocation
    Band:IBand
    Setlist:ISetlist
}