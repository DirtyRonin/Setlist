import { IModal, ModalTypes } from ".";
import { ILocation, ILocationEntityActionProps } from "..";

export interface IModalLocation extends IModal {
    value: ILocation
}

export type locationModalActions = Record<keyof typeof ModalTypes, (props: ILocationEntityActionProps) => void>