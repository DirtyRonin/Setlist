import { combineReducers } from "redux";
import { ActionType, getType } from "typesafe-actions";
import * as actions from "../../actions/layoutActions/GlobalBandFilterActions"

export type GlobalBandFilterActions = ActionType<typeof actions>;

export interface IGlobalBandFilterState{
    
}

export type GlobalBandFilterState = {
    GlobalBandFilterState :IGlobalBandFilterState
}

export const defaultMenu: GlobalBandFilterState= {
    GlobalBandFilterState:{ }
}

export default combineReducers<GlobalBandFilterState,GlobalBandFilterActions>({
    GlobalBandFilterState:(state = defaultMenu.GlobalBandFilterState,action)=> {
        switch(action.type){
            case getType(actions.fetchAvailableBands.success):
                return {...state}
            default:
                return state
        }
    }
})