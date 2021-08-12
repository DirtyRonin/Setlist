import { CatalogTypes, Catalog, IContainerProps, IBand, ISong, ISetlistSong, ILocation, IBandSong, ISetlist } from "..";

export type ModalTypes = "None" | "New" | "Edit" | "Remove" | "Read" | "Add" | "ShowCatalog"
export const ModalTypes = {
    None: "None",
    New: "New",
    Edit: "Edit",
    Remove: "Remove",
    Read: "Read",
    Add: "Add",
    ShowCatalog: "ShowCatalog"
} as const;

export interface IReferencedCatalog extends IContainerProps {
    catalogType: CatalogTypes
}

export interface IModal {
    show: boolean
    type: ModalTypes
    catalogId: string
    catalogType: CatalogTypes
    catalogInModal: CatalogTypes
    value?: ISong | IBand | ISetlist | ISetlistSong | ILocation | IBandSong
}

export const defaultModal: IModal = {
    show: false,
    type: ModalTypes.None,
    catalogId: "",
    catalogType: CatalogTypes.None,
    catalogInModal: CatalogTypes["None"]
}


