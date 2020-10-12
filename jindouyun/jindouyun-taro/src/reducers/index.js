import { combineReducers } from 'redux'
import counter from './counter'
import userInfo from './userInfo'
import cart from './cart'
import zhubajie from './zhubajie';
import search from './search';
import waimai from './waimai';
import detail from "./detail";

export default combineReducers({
  counter,
  userInfo,
  cart,
  zhubajie,
  search,
  waimai,
  detail
})
