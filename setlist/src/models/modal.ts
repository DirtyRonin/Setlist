import { ISong, ISongActionProps } from ".";

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
    song: ISong
}

export const defaultModal: IModal = {
    show: false,
    type: ModalTypes.None,
    catalogId: "",
    song: {} as ISong,
}

export type songModalActions = Record<keyof typeof ModalTypes, (props: ISongActionProps) => void>
