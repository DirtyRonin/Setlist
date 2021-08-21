import { IModal } from "models/modals";
import { IComponentOrder } from "..";

export interface IComponentOrderActionProps {
    ComponentOrder:IComponentOrder
}

export interface IModalActionsProps{
    modal:IModal,
    routePath:string
}