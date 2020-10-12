import * as constants from '../constants/counter'
import request from '../utils/request';
import Taro from '@tarojs/taro'

//获取订单列表
 export const fetchOrderList = args => {
     return async dispatch => {
         const res = await request('get', `delivery/manage/list?orderStatusList=${args.orderStatusList}`);
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

 //接单
 export const receiveOrder = args => {
     return async dispatch => {
         const res = await request('post', 'delivery/grab/receive', args);
         if(res.errno === 0) {
             console.log(res)
         }
     }
 }

 //获取当前订单
 export const fetchCurrentOrder = args => {
     return async dispatch => {
         const res = await request('get', `delivery/manage/list?orderStatusList=${args.orderStatusList}&deliveryId=${args.deliveryId}`);
         console.log(res)
         if(res.errno === 0) {
             dispatch({
                 type: constants.FETCH_CURRENT_ORDER,
                 payload: res.data
             })
         } else {
             Taro.showToast({title: res.errmsg})
         }
     }
 }
 //确认送达
 export const confirmArrive = args => {
     return async dispatch => {
         const res = await request('post', 'delivery/manage/arrive', args);
         if(res.errno === 0) {
            Taro.showToast({title: res.errmsg})
         } else {
            Taro.showToast({title: res.errmsg})
         }
     }
 }

 //获取订单详情
 export const fetchOrderDetail = args => {
     return async dispatch => {
         const res = await request('get', `delivery/manage/detail?splitOrderId=${args}`)
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