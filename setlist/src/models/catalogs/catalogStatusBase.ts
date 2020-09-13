import {  CatalogTypes } from "."

export enum CatalogStatusTypes {
    None = "None",
    Open = "Open",
    Close = "Close",
}

export interface ICatalogStatus {
    type: CatalogStatusTypes
    catalogType: CatalogTypes
    catalogId: string
}

export interface IChildCatalogStatus extends ICatalogStatus {
    parentId: string
}

export const defaultCatalogStatus: ICatalogStatus = {
    type: CatalogStatusTypes.None,
    catalogType: CatalogTypes.None,
    catalogId: ""
}

export const defaultChildCatalogStatus: IChildCatalogStatus = {
    ...defaultCatalogStatus,
    parentId: ""
}




