import { ILocation } from "../models";
import { ILocationResource } from "../resource";
import { GUID_EMPTY } from "../utils";

export class Location implements ILocation {
    
    id: number;
    name: string;
    address: string;

    constructor({ name, address, id = GUID_EMPTY }: { name: string; address: string; id?: number; }) {
        this.name = name
        this.address = address
        this.id = id
    }


    public static Create = ({ name, address, id }: { name: string; address: string; id?: number; }): ILocation =>
        new Location({ name, address, id })


    // public static ToResource = (location: ILocation): ILocationResource => {
    //     const { Name, Address, id: Id } = location
    //     return { Name, Address, Id } as ILocationResource
    // }

    // public static FromResource = (resource: ILocationResource): ILocation => {
    //     const { Name, Address, Id } = resource
    //     return { Name, Address, id: Id } as ILocation
    // }

    public static CreateEmpty = (): ILocation =>
        Location.Create({ name: '', address: '' })
}