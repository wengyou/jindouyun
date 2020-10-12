import { combineReducers } from 'redux'
import counter from './counter'
import user from './user'
import order from './order'

export default combineReducers({
  counter,
  user,
  order
})
