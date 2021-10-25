import { IBand, ICustomEvent, ILocation, ISetlist } from "../models";
import { GUID_EMPTY } from "../utils";
import { Location, Band, Setlist } from "mapping";

export class CustomEvent implements ICustomEvent {

    date: Date | null;
    locationId: number;
    bandId: number;
    setlistId: number;
    title: string;
    location: ILocation | null;
    Band: IBand | null;
    setlist: ISetlist | null;
    id: number;


    constructor({ title, locationId = GUID_EMPTY, bandId = GUID_EMPTY, setlistId = GUID_EMPTY, id = GUID_EMPTY, date = new Date(), location = Location.CreateEmpty(), band = Band.CreateEmpty(), setlist = Setlist.CreateEmpty() }: { title: string; locationId?: number; bandId?: number; setlistId?: number; id?: number; date?: Date, location?: ILocation, band?: IBand, setlist?: ISetlist }) {
        this.id = id
        this.locationId = locationId
        this.bandId = bandId
        this.setlistId = setlistId
        this.title = title
        this.date = date
        this.location = location
        this.Band = band
        this.setlist = setlist
    }

    public static Create = ({ title, locationId, bandId, setlistId, id, date, location, band, setlist }: { title: string; locationId?: number; bandId?: number; setlistId?: number; id?: number; date?: Date, location?: ILocation, band?: IBand, setlist?: ISetlist }): ICustomEvent =>
        new CustomEvent({
            title, locationId, bandId, setlistId, id, date, location, band, setlist
        })


    // public static ToResource = ({ Title, LocationId, BandId, SetlistId, id: Id, Date:date }: ICustomEvent): ICustomEventResource => {
    //     const dateAsString = date?.toLocaleDateString()
        
    //     return { Title, LocationId, BandId, SetlistId, Id, Date:dateAsString, Location:null, Band:null, Setlist:null  } 
    // }

    // public static FromResource = ({ Title, LocationId, BandId, SetlistId, Id, Date : date, Location, Band, Setlist }: ICustomEventResource): ICustomEvent => {
    //     const newDate = date && new Date(date) ? new Date(date) : null
        
    //     return { Title, LocationId, BandId, SetlistId, id: Id, Date : newDate, Location , Band, Setlist  } 
    // }

    public static CreateEmpty = (): ICustomEvent =>
        CustomEvent.Create({ title: '' })
}