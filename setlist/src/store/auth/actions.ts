import { AUTH, IAuthCheckAction, ILogoutAction, IUserInfo, LOGOUT } from './types'

export const checkAuth = (userInfo: IUserInfo): IAuthCheckAction => {
  return {
    type: AUTH,
    payload: userInfo
  }
}
export const logout = (): ILogoutAction => {
  return {
    type: LOGOUT,
  }
}