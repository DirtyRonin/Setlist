import { IModal, ModalTypes } from ".";
import { IEntityActionProps, ISetlist, ISetlistEntityActionProps } from "..";

export interface IModalSetlist extends IModal {
    value: ISetlist
}

export type setlistModalActions = Record<keyof typeof ModalTypes, (props: ISetlistEntityActionProps) => void>