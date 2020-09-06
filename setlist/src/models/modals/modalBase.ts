import { CatalogType } from "..";
import { checkServerIdentity } from "tls";

export type ModalTypes = "None" | "New" | "Edit" | "Remove" | "Read" | "Add"
export const ModalTypes = {
    None: "None",
    New: "New",
    Edit: "Edit",
    Remove: "Remove",
    Read: "Read",
    Add: "Add"
} as const;

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

