import { ILocation } from "models";
import { ICatalog } from "models/catalogs/ICatalog";

export interface ILocationFilter {
    Query: string;
}

export interface ILocationCatalogOptions{}

export interface ILocationCatalog extends ICatalog<ILocation,ILocationFilter,ILocationCatalogOptions> { 
}