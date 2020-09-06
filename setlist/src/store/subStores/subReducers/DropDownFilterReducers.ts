import { combineReducers } from "redux";
import { ActionType, getType } from "typesafe-actions";
import * as actions from "../subActions/DropDownFilterActions"

export type DropDownFilterActions = ActionType<typeof actions>;

export interface IDropDownFilterState{
    
}

export type DropDownFilterState = {
    DropDownFilterState :IDropDownFilterState
}

export const defaultMenu: DropDownFilterState= {
    DropDownFilterState:{ }
}

export default combineReducers<DropDownFilterState,DropDownFilterActions>({
    DropDownFilterState:(state = defaultMenu.DropDownFilterState,action)=> {
        switch(action.type){
            case getType(actions.fetchAvailableBands.success):
                return {...state}
            default:
                return state
        }
    }
})