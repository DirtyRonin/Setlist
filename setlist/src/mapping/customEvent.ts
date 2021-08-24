import { ICustomEvent } from "../models";
import { ICustomEventResource } from "../resource";
import { GUID_EMPTY } from "../utils";

export class CustomEvent implements ICustomEvent {

    Id: string;
    LocationId: string;
    BandId: string;
    SetlistId: string;
    Title: string;

    constructor({ title, locationId = GUID_EMPTY, bandId = GUID_EMPTY, setlistId = GUID_EMPTY, id = GUID_EMPTY }: { title: string; locationId?: string; bandId?: string; setlistId?: string; id?: string; }) {
        this.Id = id
        this.LocationId = locationId
        this.BandId = bandId
        this.SetlistId = setlistId
        this.Title = title
    }

    public static Create = ({ title, locationId, bandId, setlistId, id }: { title: string; locationId?: string; bandId?: string; setlistId?: string; id?: string; }): ICustomEvent =>
        new CustomEvent({ title, locationId, bandId, setlistId, id })


    public static ToResource = (customEvent: ICustomEvent): ICustomEventResource => {
        const { Title, LocationId, BandId, SetlistId, Id } = customEvent
        return { Title, LocationId, BandId, SetlistId, Id } as ICustomEventResource
    }

    public static FromResource = (resource: ICustomEventResource): ICustomEvent => {
        const { Title, LocationId, BandId, SetlistId, Id } = resource
        return { Title, LocationId, BandId, SetlistId, Id } as ICustomEvent
    }

    public static EmptyCustomEvent = (): ICustomEvent =>
        CustomEvent.Create({ title: '' })
}