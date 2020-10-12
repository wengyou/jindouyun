import React, {useState, useEffect } from 'react';
import { connect } from 'react-redux'
import Taro from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components';
import * as cart from '../../actions/cart'
import './settlement.scss'
import Checkbox from '../../components/checkbox/checkbox'

const Settlement = props => {
    const {deleteCartGoods, cartList, updateCartList, cartTotal, fetchcartGoods, loginFlag, goodsChecked} = props;
    const [checked, setChecked] = useState(false);
    const [productIds, setProductIds] = useState([]);
    const [allIds, setAllIds] = useState()
    useEffect(() => {
        let productIdsList = [];
        cartList.length !== 0 && cartList.map(item => {
            item.checked && productIdsList.push(item.productId);
            productIdsList.length === cartList.length ? setChecked(true) : setChecked(false)
            return setProductIds(productIdsList)
        });
        let allProductsIdList = [];
        cartList.length !== 0 && cartList.map(item => {
            allProductsIdList.push(item.productId);
            return setAllIds(allProductsIdList);
        })
    }, [cartList, updateCartList])
    useEffect(() => {
        fetchcartGoods()
    }, [updateCartList])
    return(
        <View className='settlement-container'>
            <View 
                className={checked ? 'all-select-action' : 'all-select'}
                onClick={() => {
                    goodsChecked({"productIds": allIds, "isChecked": checked ? 0 : 1})
                }}
            >
                 ﹀
            </View>
            <View className='price'>合计：<Text className='num'>￥{JSON.stringify(cartList) !== '{}' && loginFlag && cartTotal.checkedGoodsAmount}</Text></View>
            {
                props.parent === 'delete' ? <View 
                    className='btn'
                    onClick={() => {
                        let checkedGoods = [];
                        cartList.map(item => {
                            item.checked && checkedGoods.push(item.productId);
                        })
                        Taro.showModal({
                            content: '确定将宝贝删除？',
                            cancelText: '我再想想',
                            confirmText: '删除',
                            success: function (res) {
                              if (res.confirm) {
                                deleteCartGoods({"productIds": checkedGoods})
                              } else if (res.cancel) {
                                console.log('用户点击取消')
                              }
                            }
                          })
                    }}
                    >删除</View> : 
                        <View 
                            className='btn'
                            onClick={() => {Taro.navigateTo({url: '../../pages/confirmOrder/confirmOrder'})}}
                        >结算</View>
            }
        </View>
    )
}
export default connect(
    state => ({
        cartList: state.cart.cartList,
        updateCartList: state.cart.updateCartList,
        cartTotal: state.cart.cartTotal,
        loginFlag: state.userInfo.loginFlag
    }),
    dispatch => ({
        deleteCartGoods(args) {
            dispatch(cart.deleteCartGoods(args))
        },
        fetchcartGoods() {
            dispatch(cart.fetchCartGoods())
        },
        goodsChecked(args) {
            dispatch(cart.goodsChecked(args))
        }
    })
)(Settlement)