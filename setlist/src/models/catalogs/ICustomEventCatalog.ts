import { ICustomEvent } from "..";
import { ICatalog } from "./ICatalog";

export interface ICustomEventFilter {
    Query: string;
}

export interface ICustomEventCatalogOptions{}

export interface ICustomEventCatalog extends ICatalog<ICustomEvent,ICustomEventFilter,ICustomEventCatalogOptions> {
 }