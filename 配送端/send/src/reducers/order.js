import Taro from '@tarojs/taro'
import * as constants from '../constants/counter'

const defaultState = {
    orderList: [],
    currentOrder: [],
    orderDetail: {}
}
export default function order (state = defaultState, action) {
    switch(action.type) {
        case constants.FETCH_ORDER_LIST:
            return {
                ...state,
                orderList: action.payload
            }
        case constants.FETCH_CURRENT_ORDER:
            return {
                ...state,
                currentOrder: action.payload.mergeInfo
            }
        case constants.FETCH_ORDER_DETAIL:
            return {
                ...state,
                orderDetail: action.payload
            }
        default:
            return state
    }
}