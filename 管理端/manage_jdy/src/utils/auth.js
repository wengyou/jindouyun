/*
请求头的设置
*/

import Cookies from 'js-cookie'

const TokenKey = 'X-Jindouyun-Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
