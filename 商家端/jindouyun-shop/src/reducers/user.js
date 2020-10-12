import Taro from '@tarojs/taro'
import * as constants from '../constants/counter'

const defaultState = {
    loginFlag: false,
    merchantInfo: {},
    income: {},
    todayData: {},
    goodsInfo: {},
    isBuild: false
}

export default function user (state = defaultState, action) {
    switch(action.type) {
        case constants.LOGIN:
            Taro.setStorageSync('token', action.payload.token)
            return {
                ...state,
                loginFlag: true,
                merchantInfo: action.payload.merchant
            }
        case constants.LOGOUT:
            Taro.setStorageSync('token', '')
            return {
                ...state,
                loginFlag: false,
                merchantInfo: {}
            }
        case constants.FETCH_AUTH_INFO:
            return {
                ...state,
                merchantInfo: action.payload
            }
        case constants.FETCH_INCOME:
            return {
                ...state,
                income: action.payload
            }
        case constants.FETCH_INCOME:
            return {
                ...state,
                todayData: action.payload
            }
        case constants.UPDATE_STATUS:
            return {
                ...state,
                merchantInfo: action.payload
            }
        //传送商品信息
        case constants.SEND_GOODS_INFO:
            return {
                ...state,
                goodsInfo: action.payload
            }
        //是否新建商品
        case constants.IS_BUILD:
            return {
                ...state,
                isBuild: action.payload
            }
        default:
            return state;
    }
}