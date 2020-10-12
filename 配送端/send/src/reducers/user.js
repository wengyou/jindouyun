import Taro from '@tarojs/taro'
import * as constants from '../constants/counter'

const defaultState = {
    deliveryInfo: {},
    loginFlag: false,
    isApply: false,
    workData: {}
}

export default function user (state = defaultState, action) {
    switch(action.type) {
        //登录
        case constants.LOGIN:
            Taro.setStorageSync('token', action.payload.token)
            return {
                ...state,
                deliveryInfo: action.payload.deliveryInfo,
                loginFlag: true
            }
        //退出
        case constants.LOGOUT:
            Taro.setStorageSync('token', '')
            return {
                ...state,
                loginFlag: false
            }
        //申请注册骑手
        case constants.APPLY_RIDER:
            return {
                ...state,
                isApply: true
            }
        //修改骑手信息
        case constants.MODIFY_INFO:
            return {
                ...state,
                deliveryInfo: action.payload
            }
        //获取骑手工作信息
        case constants.FETCH_WORK_DATA:
            return {
                ...state,
                workData: action.payload
            }
        default:
            return state;
    }
}