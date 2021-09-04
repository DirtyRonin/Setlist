import { ILocation, IBand, ISetlist } from "models";

export interface ICustomEventResource {
    Id: string;
    Date: string;
    LocationId: string;
    BandId: string;
    SetlistId: string;
    Title: string;
    Location:ILocation
    Band:IBand
    Setlist:ISetlist
}