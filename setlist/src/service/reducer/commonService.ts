import { IComponentOrderActionProps, IComponentOrder } from "../../models";
import { ICatalogState } from "../../store";

export const pushComponentsOrderService = (props: IComponentOrderActionProps,catalogState : ICatalogState): IComponentOrder[] => {
    const {componentsOrder} = catalogState
    const newComponentsOrder:IComponentOrder[] = [...componentsOrder,props.ComponentOrder]
    
    return newComponentsOrder
}

export const popComponentsOrderService = (catalogState : ICatalogState): IComponentOrder[] => {
    const {componentsOrder} = catalogState
    const newComponentsOrder:IComponentOrder[] = [...componentsOrder]

    newComponentsOrder.pop()
    return newComponentsOrder
}