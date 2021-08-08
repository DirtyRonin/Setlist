import { IModal, ModalTypes } from ".";
import { ICustomEvent, ICustomEventEntityActionProps } from "..";

export interface IModalCustomEvent extends IModal {
    value: ICustomEvent
}

export type customEventModalActions = Record<keyof typeof ModalTypes, (props: ICustomEventEntityActionProps) => void>