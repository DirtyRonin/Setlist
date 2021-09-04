import { ICatalog } from "./ICatalog";
import { IBand } from "..";

export interface IBandFilter {
    Query: string;
    
}

export interface IBandCatalogOptions{}

export interface IBandCatalog extends ICatalog<IBand,IBandFilter,IBandCatalogOptions> { }