import { combineReducers } from "redux";
import { AUTH, IAuthState, IAuthCheckAction, LOGOUT, ILogoutAction } from './types'

const initialState: IAuthState = {
    isAuth: false,
    user: {
        name: '',
        email: '',
        id: 0
    },
    token: ''
}

export function auth(state = initialState, action: IAuthCheckAction |ILogoutAction): IAuthState {
    switch (action.type) {
        case AUTH:
            return Object.assign(
                {},
                {
                    isAuth: true,
                    user: action.payload.user,
                    token: action.payload.token
                }
            )
            case LOGOUT:
            return Object.assign(
                {},
                initialState
            )
        default:
            return state
    }
}
// function logout(state = initialState, action: ILogoutAction): IAuthState {
//     switch (action.type) {
//         case LOGOUT:
//             return Object.assign(
//                 {},
//                 initialState
//             )
//         default:
//             return state
//     }
// }
