import { IModal, ModalTypes } from ".";
import { IBandEntityActionProps, IBand, IEntityActionProps } from "..";

export interface IModalBand extends IModal {
    value : IBand
}

export type bandModalActions = Record<keyof typeof ModalTypes, (props: IEntityActionProps) => void>