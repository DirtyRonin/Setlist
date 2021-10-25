import { ICustomEvent } from "..";
import { ICatalog } from "./ICatalog";

export interface ICustomEventFilter {
    query: string;
    bandId: number;
}

export interface ICustomEventCatalogOptions { }

export interface ICustomEventCatalog extends ICatalog<ICustomEvent, ICustomEventFilter, ICustomEventCatalogOptions> {
}