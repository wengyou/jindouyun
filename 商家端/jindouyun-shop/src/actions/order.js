import * as constants from '../constants/counter'
import request from '../utils/request';
import Taro from '@tarojs/taro'

//获取订单列表
export const fetchOrderList = args => {
    return async dispatch => {
        const res = await request('get', `merchant/order/list?orderStatusList=${args.orderStatusList}&brandId=${args.brandId}`);
        if(res.errno === 0) {
            dispatch({
                type: constants.FETCH_ORDER_LIST,
                payload: res.data
            })
        } else {
            Taro.showToast({title: res.errmsg})
        }
    }
}

//传送合单信息
export const sendTotalOrderInfo = args => {
    return dispatch => {
        dispatch({
            type: constants.SEND_TOTAL_ORDER_INFO,
            payload: args
        })
    }
}

//获取子订单详情
export const fetchOrderDetail = args => {
    return async dispatch => {
        const res = await request('get', `merchant/order/detail?splitOrderId=${args}`)
        if(res.errno === 0) {
            dispatch({
                type: constants.FETCH_ORDER_DETAIL,
                payload: res.data
            })
        } else {
            Taro.showToast({title: res.errmsg})
        }
    }
}
//传送合单单号
export const sendTotalOrderNum = args => {
    return dispatch => {
        dispatch({
            type: constants.SEND_TOTAL_ORDERZ_NUM,
            payload: args
        })
    }
}
//传送配送员id
export const sendDeliveryId = args => {
    return dispatch => {
        dispatch({
            type: constants.SEND_DELIVERY_ID,
            payload: args
        })
    }
}
//传送合单id
export const sendMergeId = args => {
    return dispatch => {
        dispatch({
            type: constants.SEND_MERGE_ID,
            payload: args
        })
    }
}
//查询配送员
export const queryDelivery = args => {
    return async dispatch => {
        const res = await request('get', `merchant/order/queryDelivery?mergeId=${args}`)
        if(res.errno === 0) {
            dispatch({
                type: constants.QUERY_DELIVERY,
                payload: res.data
            })
        }
    }
}
//接单
export const receiveOrder = args => {
    return async dispatch => {
        const res = await request('post', 'merchant/order/receive', args);
        if(res.errno === 0) {
            Taro.showToast({title: '接单成功'})
            dispatch({
                type: constants.UPDATE_ORDER_LIST
            })
        } else {
            Taro.showToast({title: res.errmsg})
        }
    }
}

//获取是否完成的订单
export const fetchCompletedOrder = args => {
    return async dispatch => {
        const res = await request('get', `merchant/order/completed?completed=${args.completed}`);
        if(res.errno === 0) {
            dispatch({
                type: constants.FETCH_COMPELETED_ORDER,
                payload: res.data
            })
        } else {
            Taro.showToast({title: res.errmsg})
        }
    }
}
//取消订单
export const cancelOrder = args => {
    return async dispatch => {
        const res = await request('post', 'merchant/order/cancel', args);
        if(res.errno === 0) {
            Taro.showToast({title: '取消订单成功'})
            dispatch({
                type: constants.UPDATE_ORDER_LIST
            })
            Taro.navigateBack()
        } else {
            Taro.showToast({title: res.errmsg})
        }
    }
}

//获取所有商品
export const fetchAllGoods = args => {
    return async dispatch => {
        const res = await request('get', 'merchant/goods/list');
        if(res.errno === 0) {
            dispatch({
                type: constants.FETCH_ALL_GOODS,
                payload: res.data
            })
        } else {
            Taro.showToast({title: res.errmsg})
        }
    }
}

//获取商品详情
export const fetchGoodsDetail = args => {
    return async dispatch => {
        const res = await request('get', `merchant/goods/detail?goodId=${args.goodId}`);
        if(res.errno === 0) {
            dispatch({
                type: constants.FETCH_GOODS_DETAIL,
                payload: res.data
            })
        } else {
            Taro.showToast({title: res.errmsg})
        }
    }
}

//更新商品信息
export const updateGoods = args => {
    return async dispatch => {
        const res = await request('post', 'merchant/goods/update', args);
        if(res.errno === 0) {
            dispatch({
                type: constants.UPDATE_GOODS,
                payload: res.data
            })
            Taro.showToast({title: '更新商品成功'})
        } else {
            Taro.showToast({title: res.errmsg})
        }
    }
}