import { ILocation, IBand, ISetlist } from "models";

export interface ICustomEventResource {
    Id: string;
    Date: string | undefined;
    LocationId: string | null;
    BandId: string | null;
    SetlistId: string | null;
    Title: string;
    Location:ILocation| null
    Band:IBand| null
    Setlist:ISetlist| null
}