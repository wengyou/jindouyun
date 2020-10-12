import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Button, Text, Image } from '@tarojs/components'
import { AtInputNumber } from 'taro-ui'
import * as cart from '../../actions/cart'
import './number.scss'

const Number = props => {
    const {cartList, modifyCartGoodsNum} = props;
    const [value, setValue] = useState(props.data && props.data.number);
    return(
        <View className='number-container-only'>
            <AtInputNumber
                disabledInput
                min={1}
                step={1}
                value={value}
                onChange={value => {
                    setValue(value);
                    modifyCartGoodsNum({
                        "id": props.data.id,
                        "goodsId": props.data.goodsId,
                        "productId": props.data.productId,
                        "number": value
                    })
                }}
                className='number'
                disabled={props.parent === 'to-be-paid' ? true : false}
            />
        </View>
    )
}

export default connect(
    state => ({
        cartList: state.cart.cartList
    }),
    dispatch => ({
        modifyCartGoodsNum(args) {
            dispatch(cart.modifyCartGoodsNum(args))
        }
    })
)(Number)