import { Color } from "@material-ui/lab/Alert";
import { IComponentOrder } from "..";

export interface IComponentOrderActionProps {
    ComponentOrder:IComponentOrder
}

export interface IModalActionsProps{
    showModal:boolean
}

export interface ISnackbarActionProps{
    message:string
    severity?:Color
}