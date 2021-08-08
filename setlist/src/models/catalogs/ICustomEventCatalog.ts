import { ICustomEvent } from "..";
import { ICatalog } from "./ICatalog";

export interface ICustomEventFilter {
    Title: string;
}

export interface ICustomEventCatalogOptions{}

export interface ICustomEventCatalog extends ICatalog<ICustomEvent,ICustomEventFilter,ICustomEventCatalogOptions> { }