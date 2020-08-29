import { IModal, ModalTypes } from ".";
import { IEntityActionProps } from "..";
import { IBand } from "../entity/IBand";

export interface IModalBand extends IModal {
    value : IBand
}

export type bandModalActions = Record<keyof typeof ModalTypes, (props: IEntityActionProps) => void>