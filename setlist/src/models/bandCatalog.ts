import { ICatalog, IBand } from ".";

export interface IBandFilter {
    Title: string;
}

export interface IBandSummary{
    Id: string;
    Title: string;
}

export interface IBandCatalogOptions{}

export interface IBandCatalog extends ICatalog<IBand,IBandFilter,IBandCatalogOptions> { }