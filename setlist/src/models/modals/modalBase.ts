import { CatalogTypes, Catalog, IContainerProps } from "..";
import { IOwnBandCatalogProps } from "../../store/containers/catalogs/BandCatalogContainer";

export type ModalTypes = "None" | "New" | "Edit" | "Remove" | "Read" | "Add"
export const ModalTypes = {
    None: "None",
    New: "New",
    Edit: "Edit",
    Remove: "Remove",
    Read: "Read",
    Add: "Add"
} as const;

export interface IReferencedCatalog extends IContainerProps {
    catalogType: CatalogTypes
}

export interface IModal {
    show: boolean
    type: ModalTypes
    catalogId: string
    catalogType: CatalogTypes
    referencedCatalog?: IOwnBandCatalogProps  /*IReferencedCatalog*/
}

export const defaultModal: IModal = {
    show: false,
    type: ModalTypes.None,
    catalogId: "",
    catalogType: CatalogTypes.None,
    referencedCatalog: undefined
}

