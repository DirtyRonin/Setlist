import { combineReducers } from "redux";
import { ActionType, getType } from "typesafe-actions";

import ModalActions from "../actions/modalActions";
import { IModal } from "models";

export type ModalActions = ActionType<typeof ModalActions>;

export interface IModelState {
    modals: Map<string, IModal>
}

export type ModalState = {
    modalState: IModelState;
}


export const InitialModals: IModelState = {
    modals: new Map<string, IModal>()
}

export default combineReducers<ModalState, ModalActions>(
    {
        modalState: (state = InitialModals, action) => {
            switch (action.type) {
                case getType(ModalActions.setModals):
                    return {
                        ...state,
                        modals: state.modals.set(action.payload.routePath, action.payload.modal)
                    }

                default:
                    return state
            }
        }
    }
)


