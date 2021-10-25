import { IEntityBase } from "./IEntityBase";

export interface ILocation extends IEntityBase {
    name: string;
    address:string;
}