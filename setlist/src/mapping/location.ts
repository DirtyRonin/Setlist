import { ILocation } from "../models";
import { ILocationResource } from "../resource";
import { GUID_EMPTY } from "../Util";

export class Location implements ILocation {
    
    Id: string;
    Name: string;
    Address: string;

    constructor({ name, address, id = GUID_EMPTY }: { name: string; address: string; id?: string; }) {
        this.Name = name
        this.Address = address
        this.Id = id
    }


    public static Create = ({ name, address, id }: { name: string; address: string; id?: string; }): ILocation =>
        new Location({ name, address, id })


    public static ToResource = (location: ILocation): ILocationResource => {
        const { Name, Address, Id } = location
        return { Name, Address, Id } as ILocationResource
    }

    public static FromResource = (resource: ILocationResource): ILocation => {
        const { Name, Address, Id } = resource
        return { Name, Address, Id } as ILocation
    }

    public static EmptyLocation = (): ILocation =>
        Location.Create({ name: '', address: '' })
}