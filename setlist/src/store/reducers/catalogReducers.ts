import { combineReducers } from "redux";
import { ActionType, getType } from "typesafe-actions";
import { IModal, defaultModal, IComponentOrder } from "../../models";

import * as catalogActions from "../actions/";

export type CatalogActions = ActionType<typeof catalogActions>;

export interface ICatalogState {
    componentsOrder: IComponentOrder[];
    modal: IModal
}

export type CatalogState = {
    catalogState: ICatalogState;
}

export const defaultCatalog: CatalogState = {
    catalogState: {
        componentsOrder: [] as IComponentOrder[],
        modal: defaultModal,
    }
}

export default combineReducers<CatalogState, CatalogActions>({
    catalogState: (state = defaultCatalog.catalogState, action) => {
        switch (action.type) {
            case getType(catalogActions.pushComponentOrder.success):
                return {
                    ...state, componentsOrder: action.payload
                }
            case getType(catalogActions.pushCatalogComponentOrder.success):
                return {
                    ...state, componentsOrder: action.payload
                }

            case getType(catalogActions.popComponentOrder.success):
                return {
                    ...state, componentsOrder: action.payload
                }

            // case getType(catalogActions.setModal):
            //     return {
            //         ...state, modal: action.payload
            //     }


            default:
                return state;
        }
    }
})