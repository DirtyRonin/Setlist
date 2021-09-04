import { ISetlist } from "..";
import { ICatalog } from "./ICatalog";

export interface ISetlistFilter {
    Query: string;
}

export interface ISetlistCatalogOptions{}

export interface ISetlistCatalog extends ICatalog<ISetlist,ISetlistFilter,ISetlistCatalogOptions> { }