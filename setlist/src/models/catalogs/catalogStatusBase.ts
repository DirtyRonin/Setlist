import { CatalogType } from "."

export enum CatalogStatusTypes {
    None = "None",
    Open = "Open",
    Close = "Close",
}

export interface ICatalogStatus {
    type: CatalogStatusTypes
    catalogType: CatalogType
    catalogId: string
}

export interface IChildCatalogStatus extends ICatalogStatus {
    parentId: string
}

export const defaultCatalogStatus: ICatalogStatus = {
    type: CatalogStatusTypes.None,
    catalogType: CatalogType.None,
    catalogId: ""
}

export const defaultChildCatalogStatus: IChildCatalogStatus = {
    ...defaultCatalogStatus,
    parentId: ""
}




