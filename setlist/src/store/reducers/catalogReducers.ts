import { combineReducers } from "redux";
import { ActionType, getType } from "typesafe-actions";
import { IHashTable } from "../../Util";
import { Catalog, IModal, defaultModal, IUser, IComponentOrder, DisplayIn } from "../../models";

import * as catalogActions from "../actions/";

export type CatalogActions = ActionType<typeof catalogActions>;

export interface ICatalogState {
    catalogs: IHashTable<Catalog>;
    catalogsOrder: string[];
    componentsOrder: IComponentOrder[];
    modal: IModal
    user: IUser
    openCatalog: Catalog;
}

export type CatalogState = {
    catalogState: ICatalogState;
}

export const defaultCatalog: CatalogState = {
    catalogState: {
        componentsOrder: [] as IComponentOrder[],
        catalogsOrder: [] as string[],
        catalogs: {} as IHashTable<Catalog>,
        modal: defaultModal,
        user: { userId: "Admin" } as IUser,
        openCatalog: {} as Catalog
    }
}

export default combineReducers<CatalogState, CatalogActions>({
    catalogState: (state = defaultCatalog.catalogState, action) => {
        switch (action.type) {
            case getType(catalogActions.setCatalogState): return setCatalogState(state, action.payload)

            case getType(catalogActions.addBandToCatalog.success): return updateCatalogByModal(state, action.payload)
            case getType(catalogActions.deleteBandInCatalog.success): return updateCatalogByModal(state, action.payload)
            case getType(catalogActions.editBandInCatalog.success): return updateCatalogByModal(state, action.payload)
            case getType(catalogActions.readBandInCatalog): return setModal(state, defaultModal)
            case getType(catalogActions.closeBandsCatalog.success): return setCatalogState(state, action.payload)
           
            case getType(catalogActions.readSongInCatalog): return setModal(state, defaultModal)

            case getType(catalogActions.fetchBandSongCatalog.success): {
                const { componentsOrder } = state
                if (componentsOrder && componentsOrder.length > 0) {
                    componentsOrder.filter(order => order.id === action.payload.Id && order.displayIn === DisplayIn.Main).forEach(
                        order => order.value = action.payload
                    )
                    return { ...state, componentsOrder }
                } else {
                    return state
                }

            }
            case getType(catalogActions.fetchBandSongCatalogNextLink.success): return updateCatalog(state, action.payload)
            // case getType(catalogActions.addBandSongToCatalog.success): return updateCatalogByModal(state, action.payload)
            case getType(catalogActions.openBandSongsCatalog.success): return setCatalogState(state, action.payload)
            case getType(catalogActions.closeBandSongsCatalog.success): return setCatalogState(state, action.payload)


            case getType(catalogActions.setModal): return setModal(state, action.payload)


            case getType(catalogActions.pushComponentOrder.success):
                return {
                    ...state, componentsOrder: action.payload
                }

            case getType(catalogActions.popComponentOrder.success):
                return {
                    ...state, componentsOrder: action.payload
                }


            default:
                return state;
        }
    }
})

const updateCatalog = (state: ICatalogState, payload: Catalog): ICatalogState => {

    return {
        ...state, catalogs: {
            ...state.catalogs, [payload.Id]: payload
        }
    }
}

const updateCatalogByModal = (state: ICatalogState, payload: Catalog): ICatalogState => {
    return {
        ...state, catalogs: {
            ...state.catalogs, [payload.Id]: payload
        },
        modal: defaultModal
    }
}

const setModal = (state: ICatalogState, modal: IModal): ICatalogState => {
    return {
        ...state,
        modal
    }
}

const setCatalogState = (currentCatalogState: ICatalogState, newCatalogState: ICatalogState): ICatalogState => {
    return {
        ...currentCatalogState,
        catalogs: newCatalogState.catalogs,
        catalogsOrder: newCatalogState.catalogsOrder,
        componentsOrder: newCatalogState.componentsOrder
    }
}

