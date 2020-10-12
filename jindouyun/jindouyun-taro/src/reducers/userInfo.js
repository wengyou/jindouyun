import Taro from '@tarojs/taro'
import {
    LOGIN,
    LOGOUT,
    ORDEORDERLIST,
    ORDERLIST,
    FETCH_ADDRESS,
    SEND_ADDRESS_INDEX,
    SEND_ADD_FLAG,
    SUBMIT_ADVICE,
    SEND_CURRENT,
    FETCH_ORDER_DETAIL,
    SAVE_ADDRESS,
    DELETE_ADDRESS,
    SEARCH_ORDER,
    CHECKED_ADDRESS,
    FETCH_CODE,
    SUBMIT_CODE,
    FETCH_ADDRESS_DETAIL,
    SEND_ADDRESS_ID
} from "../constants/actionTypes";

const defaltState = {
    userInfo: {},
    token: '',
    loginFlag: false,
    orderList: [],
    orderPage: '',
    orderPages: '',
    addressList: [],
    addressIndex: 0,
    addAddressFlag: '',
    current: 0,
    orderDetail: {},
    saveAddressFlag: '',
    searchOrderList: [],
    checked_address: {},
    code: {},
    addressDetail: {},
    addressId: ''
}

export default function userInfo (state = defaltState, action) {
    switch(action.type) {
        //登录
        case LOGIN:
            Taro.setStorageSync('token', action.payload.token)
            return {
                ...state,
                userInfo: action.payload.userInfo,
                loginFlag: true
            };
        //退出
        case LOGOUT:
            Taro.setStorageSync('token', '')
            return {
                ...state,
                loginFlag: false,
                userInfo: {}
            }
        //订单列表
        case ORDERLIST:
            return {
                ...state,
                orderList: state.orderList.concat(action.payload.list),
                orderPage: action.payload.page,
                orderPages: action.payload.pages,
                searchOrderList: [] 
            }
        //订单详情
        case FETCH_ORDER_DETAIL:
            return {
                ...state,
                orderDetail: action.payload
            }
        case SEND_CURRENT:
            return {
                ...state,
                current: action.payload
            }
        //订单搜索
        case SEARCH_ORDER:
            return {
                ...state,
                searchOrderList: action.payload
            }
        //获取地址列表
        case FETCH_ADDRESS:
            return {
                ...state,
                addressList: action.payload.list
            }
        //保存地址
        case SAVE_ADDRESS:
            return {
                ...state,
                saveAddressFlag: new Date()
            }
        //删除地址
        case DELETE_ADDRESS:
            return {
                ...state,
                addressList: action.payload.list
            }
        //获取地址详情
        case FETCH_ADDRESS_DETAIL:
            return {
                ...state,
                addressDetail: action.payload
            }
        //传送地址id
        case SEND_ADDRESS_ID:
            return {
                ...state,
                addressId: action.payload
            }
        //传送地址索引
        // case SEND_ADDRESS_INDEX:
        //     return {
        //         ...state,
        //         addressIndex: action.index
        //     }
        //设置选中地址
        case CHECKED_ADDRESS:
            return {
                ...state,
                checked_address: action.payload
            }
        case SEND_ADD_FLAG:
            return{
                ...state,
                addAddressFlag: action.payload
            }
        //获取邀请码
        case FETCH_CODE: 
            return {
                ...state,
                code: action.payload
            }
        default:
            return state
    }
}