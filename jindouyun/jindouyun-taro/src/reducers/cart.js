import Taro from '@tarojs/taro'
import {
    FETCH_CART_GOODS,
    GOODS_CHECKED,
    DELETE_CART_GOODS,
    CART_CHECKOUT,
    REFRESH_CART,
    BUY_NOW 
} from "../constants/actionTypes";

const defaltState = {
    cartList: [],
    updateCartList: '',
    cartTotal: {},
    newOrderInfo: {},
    cartFlag: '',
    checkedAddress: {},
    checkedGoodsList: [],
    buyNowFlag: false
}


export default function cart (state = defaltState, action) {
    switch(action.type) {
        //获取购物车商品列表
        case FETCH_CART_GOODS:
            return {
                ...state,
                cartList: action.payload.cartList,
                cartTotal: action.payload.cartTotal
            };
        //添加商品到购物车
        case REFRESH_CART:
            console.log('1')
            return {
                ...state,
                cartFlag: new Date()
            }
        //购物车商品勾选
        case GOODS_CHECKED:
            return {
                ...state,
                cartList: action.payload.cartList,
                cartTotal: action.payload.cartTotal,
                updateCartList: new Date()
            }
        //购物车商品删除
        case DELETE_CART_GOODS:
            return {
                ...state,
                cartList: action.payload.cartList,
                cartTotal: action.payload.cartTotal,
            }
        //购物车下单
        case CART_CHECKOUT:
            return {
                ...state,
                newOrderInfo: action.payload,
            }
        //立即购买
        case BUY_NOW:
            return {
                ...state,
                buyNowFlag: true,
                newOrderInfo: action.payload
            }
        default:
            return state
    }
}