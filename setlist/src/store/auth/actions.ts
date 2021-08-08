import { AUTH, IAuthCheckAction, IUserInfo } from './types'

export const checkAuth = (userInfo: IUserInfo): IAuthCheckAction => {
  return {
    type: AUTH,
    payload: userInfo
  }
}