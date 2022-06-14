import { AUTH, IAuthState, IAuthCheckAction, LOGOUT, ILogoutAction } from './types'

const initialState: IAuthState = {
    isAuth: false,
    name: '',
    isAdmin: false
}

export function auth(state = initialState, action: IAuthCheckAction | ILogoutAction): IAuthState {
    switch (action.type) {
        case AUTH:
            return Object.assign(
                {},
                {
                    isAuth: true,
                    name: action.payload.name,
                    isAdmin: action.payload.isAdmin
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