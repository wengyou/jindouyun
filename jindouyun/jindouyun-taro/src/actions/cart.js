import request from '../utils/request';
import Taro from '@tarojs/taro'

import {
    FETCH_CART_GOODS,
    GOODS_CHECKED,
    DELETE_CART_GOODS,
    CART_CHECKOUT
} from '../constants/actionTypes';

//获取购物车商品列表
export const fetchCartGoods = () => {
    return async dispatch => {
        const res = await request('get', 'wx/cart/index');
        if(res.errno === 0) {
            dispatch({
                type: FETCH_CART_GOODS,
                payload: res.data
            })
        } else {
            Taro.showToast({title: '您还没有登录，购物车空空如也'})
        }
    }
}

//修改购物车商品数量
export const modifyCartGoodsNum = args => {
    return async dispatch => {
        const res = await request('post', 'wx/cart/update', args);
        if(res.errno === 0) {

        } else {
            Taro.showToast({title: '修改商品数量失败'})
        }
    }
}
//购物车商品勾选状态
export const goodsChecked = args => {
    return async dispatch => {
        const res = await request('post', 'wx/cart/checked', args);
        if(res.errno === 0) {
            dispatch({
                type: GOODS_CHECKED,
                payload: res.data
            })
        }
    }
}
//删除购物车商品
export const deleteCartGoods = args => {
    return async dispatch => {
        const res = await request('post', 'wx/cart/delete', args);
        if(res.errno === 0) {
            dispatch({
                type: DELETE_CART_GOODS,
                payload: res.data
            })    
        } else {
            Taro.showToast({title: "删除商品失败"})
        }
    }
}
//购物车下单
export const fetchCartCheckout = args => {
    return async dispatch => {
        const res = await request('get', `wx/cart/checkout?"cartId"=${[args.cartId]}&"addressId"=${args.addressId}&"couponId"=''&"userCouponId"=''`)
        if(res.errno === 0) {
            dispatch({
                type: CART_CHECKOUT,
                payload: res.data
            })
        } else {
            Taro.showToast({title: res.errmsg})
        }
    }
}