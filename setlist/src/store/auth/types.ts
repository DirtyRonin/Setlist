export const AUTH = 'AUTH'
export const LOGOUT = 'LOGOUT'

export interface IUserInfo {
  name:string
  isAdmin:boolean
}

export interface IAuthState extends IUserInfo {
  isAuth: boolean
}

export interface IAuthCheckAction {
  type: typeof AUTH
  payload: IUserInfo
}
export interface ILogoutAction {
  type: typeof LOGOUT
}