import { combineReducers } from "redux";
import { ActionType, getType } from "typesafe-actions";

import ModalActions from "../actions/modalActions";
import { IModal } from "models";

export type ModalActions = ActionType<typeof ModalActions>;

export interface IModelState {
    showModal:boolean
}

export type ModalState = {
    modalState: IModelState;
}


export const InitialModals: IModelState = {
    showModal: false
}

export default combineReducers<ModalState, ModalActions>(
    {
        modalState: (state = InitialModals, action) => {
            switch (action.type) {
                case getType(ModalActions.setModal):
                    return {
                        ...state,
                        showModal: action.payload.showModal
                    }

                default:
                    return state
            }
        }
    }
)


