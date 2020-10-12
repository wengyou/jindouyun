import React, {useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { View, Button, Text, Image } from '@tarojs/components';
import * as cart from '../../actions/cart'
import './index.scss';
import EmptyCart from '../../assets/images/empty-cart.png'
import Checkbox from '../../components/checkbox/checkbox'
import OrderGoods from '../../components/orderDoods/orderGoods'
import Settlement from '../../components/settlement/settlement'

const Shawujing = props => {
    const {fetchcartGoods, cartList, loginFlag, cartFlag} = props;
    const [flag, sendFlag] = useState('manage');
    useEffect(() => {
        loginFlag && fetchcartGoods()
    },[loginFlag, cartFlag])
    return (
        <View className='cart-container'>
            <View className='header'>
                <Text className='item1'>购物车</Text>
                <View 
                    className='item2'
                    onClick={() => {flag === 'delete'? sendFlag('manage') : sendFlag('delete')}}
                >
                    {flag === 'delete' ? '完成' : '管理'}
                </View>
            </View>
            {
                (cartList.length === 0 || !loginFlag ) ? <View className='wrapper1'>
                    <Image className='img' src={EmptyCart} />
                    <Text>你还没有心仪商品~~</Text>
                </View> : <View style={{marginBottom: '150px'}}>
                    {
                        cartList.map(item => {
                            return(
                                <View className='wrapper2' key={item.id}>
                                    <Checkbox data={item} />
                                    <OrderGoods parent={'cart'} data={item} />
                                </View>
                            )
                        })
                    }
                </View>
            }
            <Settlement parent={flag} />
        </View>
    )
}

export default connect(
    state => ({
        loginFlag: state.userInfo.loginFlag,
        cartList: state.cart.cartList,
        cartFlag: state.cart.cartFlag
    }),
    dispatch => ({
        fetchcartGoods() {
            dispatch(cart.fetchCartGoods())
        }
    })
)(
    Shawujing
);


