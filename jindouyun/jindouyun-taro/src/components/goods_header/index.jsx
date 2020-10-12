import React, { Component } from 'react';
import { connect } from 'react-redux'
import {View, Image} from '@tarojs/components';
import './index.scss';
import cart from '../../assets/images/cart_0.png';
import { toCart } from "../../utils/route";


const GoodsHeader = props => {

    const { title } = props;

    return (
        <View className='goods_header_wrap bgc_yellow flex center fontC_white fontS_36'>
            <View>{title}</View>
            <Image onClick={toCart} className='goods_header_cart absolute' src={cart} />
        </View>
    )
}

export default connect(
    state => ({

    }),
    dispatch => ({

    })
)(
    GoodsHeader
);

