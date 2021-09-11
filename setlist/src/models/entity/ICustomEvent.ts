import { ILocation, IBand, ISetlist } from "models";

export interface ICustomEvent {
    Id: string;
    Date: Date | null;
    LocationId: string | null;
    BandId: string | null;
    SetlistId: string | null;
    Title: string;
    Location:ILocation| null
    Band:IBand| null
    Setlist:ISetlist| null
}