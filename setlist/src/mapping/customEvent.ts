import { IBand, ICustomEvent, ILocation, ISetlist } from "../models";
import { GUID_EMPTY } from "../utils";
import { Location, Band, Setlist } from "mapping";

export class CustomEvent implements ICustomEvent {

    date: Date ;
    locationId: number;
    bandId: number;
    title: string;
    location: ILocation ;
    band: IBand ;
    setlist: ISetlist ;
    id: number;


    constructor({ title, locationId = GUID_EMPTY, bandId = GUID_EMPTY, id = GUID_EMPTY, date = new Date(), location = Location.CreateEmpty(), band = Band.CreateEmpty(), setlist = Setlist.CreateEmpty() }: { title: string; locationId?: number; bandId?: number; id?: number; date?: Date, location?: ILocation, band?: IBand, setlist?: ISetlist }) {
        this.id = id
        this.locationId = locationId
        this.bandId = bandId
        this.title = title
        this.date = date
        this.location = location
        this.band = band
        this.setlist = setlist
    }

    public static Create = ({ title, locationId, bandId,  id, date, location, band, setlist }: { title: string; locationId?: number; bandId?: number; id?: number; date?: Date, location?: ILocation, band?: IBand, setlist?: ISetlist }): ICustomEvent =>
        new CustomEvent({
            title, locationId, bandId, id, date, location, band, setlist
        })

    public static CreateEmpty = (): ICustomEvent =>
        CustomEvent.Create({ title: '' })
}