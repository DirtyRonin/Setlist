import { IBand, ICustomEvent, ILocation, ISetlist } from "../models";
import { ICustomEventResource } from "../resource";
import { GUID_EMPTY } from "../utils";
import { Location, Band, Setlist } from "mapping";

export class CustomEvent implements ICustomEvent {

    Id: string;
    LocationId: string | null;
    BandId: string | null;
    SetlistId: string | null;
    Title: string;
    Date: Date | null;
    Location: ILocation;
    Band: IBand;
    Setlist: ISetlist;

    constructor({ title, locationId = GUID_EMPTY, bandId = GUID_EMPTY, setlistId = GUID_EMPTY, id = GUID_EMPTY, date = new Date(), location = Location.EmptyLocation(), band = Band.EmptyBand(), setlist = Setlist.EmptySetlist() }: { title: string; locationId?: string; bandId?: string; setlistId?: string; id?: string; date?: Date, location?: ILocation, band?: IBand, setlist?: ISetlist }) {
        this.Id = id
        this.LocationId = locationId
        this.BandId = bandId
        this.SetlistId = setlistId
        this.Title = title
        this.Date = date
        this.Location = location
        this.Band = band
        this.Setlist = setlist
    }

    public static Create = ({ title, locationId, bandId, setlistId, id, date, location, band, setlist }: { title: string; locationId?: string; bandId?: string; setlistId?: string; id?: string; date?: Date; location?: ILocation; band?: IBand; setlist?: ISetlist }): ICustomEvent =>
        new CustomEvent({
            title, locationId, bandId, setlistId, id, date, location, band, setlist
        })


    public static ToResource = ({ Title, LocationId, BandId, SetlistId, Id, Date:date }: ICustomEvent): ICustomEventResource => {
        const dateAsString = date?.toLocaleDateString()
        
        return { Title, LocationId, BandId, SetlistId, Id, Date:dateAsString, Location:null, Band:null, Setlist:null  } 
    }

    public static FromResource = ({ Title, LocationId, BandId, SetlistId, Id, Date : date, Location, Band, Setlist }: ICustomEventResource): ICustomEvent => {
        const newDate = date && new Date(date) ? new Date(date) : null
        
        return { Title, LocationId, BandId, SetlistId, Id, Date : newDate, Location , Band, Setlist  } 
    }

    public static EmptyCustomEvent = (): ICustomEvent =>
        CustomEvent.Create({ title: '' })
}