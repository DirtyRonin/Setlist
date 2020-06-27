import { CatalogType } from "../catalog";

export enum ModalTypes {
    None = "None",
    New = "New",
    Edit = "Edit",
    Remove = "Remove",
    Read = "Read"
}

export interface IModal {
    show: boolean
    type: ModalTypes
    catalogId: string
    catalogType: CatalogType
}

export const defaultModal: IModal = {
    show: false,
    type: ModalTypes.None,
    catalogId: "",
    catalogType: CatalogType.None,
}

