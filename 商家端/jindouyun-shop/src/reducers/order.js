import Taro from '@tarojs/taro'
import * as constants from '../constants/counter'

const defaultState = {
    orderList: [],
    totalOrderInfo: {},
    orderDetail: {},
    totalOrderNum: '',
    deliveryId: -1,
    mergeId: 0,
    deliveryInfo: {},
    goodsList: {},
    updateOrderListFlag: '',
    completedOrder: [],
    allGoodsList: [],
    goodsDetail: {}
}

export default function order (state = defaultState, action) {
    switch(action.type) {
        case constants.FETCH_ORDER_LIST:
            return {
                ...state,
                orderList: action.payload.mergeInfo,
                goodsList: action.payload.goodsList
            }
        case constants.SEND_TOTAL_ORDER_INFO:
            return {
                ...state,
                totalOrderInfo: action.payload
            }
        case constants.FETCH_ORDER_DETAIL:
            return {
                ...state,
                orderDetail: action.payload
            }
        case constants.SEND_TOTAL_ORDERZ_NUM:
            return {
                ...state,
                totalOrderNum: action.payload
            }
        case constants.SEND_DELIVERY_ID:
            return {
                ...state,
                deliveryId: action.payload
            }
        case constants.SEND_MERGE_ID:
            return {
                ...state,
                mergeId: action.payload
            }
        case constants.QUERY_DELIVERY:
            return {
                ...state,
                deliveryInfo: action.payload
            }
        //刷新订单列表
        case constants.UPDATE_ORDER_LIST:
            return {
                ...state,
                updateOrderListFlag: new Date()
            }
        case constants.FETCH_COMPELETED_ORDER:
            return {
                ...state,
                completedOrder: action.payload.orderSplits
            }
        //获取所有商品
        case constants.FETCH_ALL_GOODS:
            return {
                ...state,
                allGoodsList: action.payload
            }
        //获取商品详情
        case constants.FETCH_GOODS_DETAIL:
            return {
                ...state,
                goodsDetail: action.payload
            }
        case constants.SEND_GOODS_INFO:
            return {
                ...state,
                goodsDetail: {}
            }
        default:
            return state
    }
}