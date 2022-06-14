import { combineReducers } from "redux";
import { ActionType, getType } from "typesafe-actions";
import { IUser } from "../../models";
import { GUID_EMPTY } from "../../utils";

import * as userActions  from "../actions/userActions";

export type UserActions = ActionType<typeof userActions>;

export type UserState = {
    user: IUser;
}

export const defaultUser: UserState = {
    user:{
        name:'',
        id:GUID_EMPTY
    }
}

export default combineReducers<UserState,UserActions>({
    user: (state = defaultUser.user,action) => {
        switch(action.type){
            case getType(userActions.getUser.success):{
                return {...state,  name: action.payload.name , id : action.payload.id}
            }

            default: return state
        }
    }
})