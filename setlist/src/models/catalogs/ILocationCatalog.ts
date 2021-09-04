import { ILocation } from "..";
import { ICatalog } from "./ICatalog";

export interface ILocationFilter {
    Query: string;
}

export interface ILocationCatalogOptions{}

export interface ILocationCatalog extends ICatalog<ILocation,ILocationFilter,ILocationCatalogOptions> { }