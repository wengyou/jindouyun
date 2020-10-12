import request from '../utils/request';
import Taro from '@tarojs/taro'
import {showLoading, showMessage} from "../utils/common";

import {
    GET_BANNER,
    GET_ITEMS,
    ADD_TO_CART,
    FETCH_FIRST_CATEGORY,
    FETCH_SECOND_CATEGORY,
    FETCH_GOODS_LIST, 
    CLEAR_SECOND_CATEGORY, 
    HOT_RECOMMEND,
    REFRESH_CART,
    CART_CHECKOUT,
    BUY_NOW
} from '../constants/actionTypes';
import {message} from "taro-ui";

//获取首页banner图
export const handleFetchBanner = () => {
    return async dispatch => {
        const res = await request('get', 'wx/home/index');
        res.errno === 0 &&
            dispatch({
                type: GET_BANNER,
                payload: res.data.banner
            });
    }
}

//获取首页商品
export const handleFetchItems = args => {
    return async dispatch => {
        const res = await request('post', '', args);
        showLoading(false);
        res.errno === 0 &&
        dispatch({
            type: GET_ITEMS,
            payload: res.data
        });
    }
}

//添加到购物车
export const handleAddToCart = args => {
    return async dispatch => {
        const res = await request('post', 'wx/cart/add', args);
        showLoading(false);
        res.errno === 0 &&
        showMessage('添加成功！', 'none');
    }
}

//获取一级目录
export const handleFetchFirstCategory = () => {
    return async dispatch => {
        const res = await request('get', 'wx/catalog/getfirstcategory');
        showLoading(false);
        res.errno === 0 &&
        dispatch({
            type: FETCH_FIRST_CATEGORY,
            payload: res.data
        })
    }
}
//获取二级目录
export const handleFetchSecondCategory = (args) => {
    const { id } = args;
    return async dispatch => {
        const res = await request('get', `wx/catalog/getsecondcategory?id=${id}`);
        showLoading(false);
        if(res.errno === 0){
            dispatch({
                type: FETCH_SECOND_CATEGORY,
                payload: res.data
            });
            dispatch(handleFetchGoodsList({
                id: res.data[0].id,
                page: 1,
                type: 'goods',
                callback: (e) => {return e;}
            }))
        }
    }
}

export const clearSecondCategory = () => {
    return dispatch => {
        dispatch({
            type: CLEAR_SECOND_CATEGORY
        })
    }
}

//获取二级目录下面的商品列表，外卖店家的商品列表也是这个
export const handleFetchGoodsList = (args) => {
    let url = '';
    const { type, id, page, callback } = args;
    type === 'waimai'?
        url = `wx/goods/list?brandId=${id}&page=${page}`
        :
        url = `wx/goods/list?categoryId=${id}&page=${page}`
    return async dispatch => {
        const res = await request('get', url);
        callback(false);
        showLoading(false);
        res.errno === 0 &&
        dispatch({
            type: FETCH_GOODS_LIST,
            payload: res.data
        })
    }
}

//获取首页推荐商品列表
export const handleFetchRecommendList = args => {
    const { page, callback } = args;
    return async dispatch => {
        const res = await request('get', `wx/goods/list?page=${page}`);
        callback(false);
        showLoading(false);
        res.errno === 0 &&
        dispatch({
            type: HOT_RECOMMEND,
            payload: res.data
        })
    }
}

//加入购物车或者购买
export const handleCartOrPurchase = args => {
    let url = '';
    const { type, number, goodsId, productId, closeFloatCallback } = args;
    const data = {number, goodsId, productId};
    url = type === 'cart' ? 'wx/cart/add' : '/wx/cart/fastadd';
    return async dispatch => {
        const res = await request('post', url, data);
        console.log(res)
        if(res.errno === 0 && type === 'cart'){
            closeFloatCallback();
            showMessage('加入购物车成功～', 'none');
            dispatch({
                type: REFRESH_CART
            })
        } else if(res.errno === 0 && type === 'purchase'){
            closeFloatCallback();
            dispatch({
                type: CART_CHECKOUT,
                payload: res.data
            })
            dispatch({
                type: BUY_NOW,
                payload: res.data
            })
            Taro.navigateTo({url: '../../pages/confirmOrder/confirmOrder'})
        } else{
            showMessage(res.errmsg, 'none');
        }
        showLoading(false);
    }
}

