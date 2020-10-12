import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Button, Text, Image } from '@tarojs/components'
import { AtAvatar, AtIcon } from 'taro-ui';
import OrderItem from '../../components/orderItem/orderItem'
import * as order from '../../actions/order'
import None from '../../assets/images/none.png'

const OrderPick = props => {
    const {fetchOrderList, loginFlag, orderList, deliveryInfo} = props;
    useEffect(() => {
        loginFlag && fetchOrderList({
            'orderStatusList':[31, 32, 33], 
            // 'deliveryId': deliveryInfo.deliveryStaff && deliveryInfo.deliveryStaff.userId
        })
    }, [loginFlag])
    return(
        <View className='bgColor orderPick_container'>
            {
                orderList.mergeInfo ? orderList.mergeInfo.map(item => {
                    return <OrderItem key={item.id} data={item} />
                }) : <View className='none_order'>
                        <Image className='none_img' src={None} />
                        <View className='none_content fontColor1'>无订单可接取</View>
                    </View>
            }
            
        </View>
    )
}

export default connect(
    state => ({
        loginFlag: state.user.loginFlag,
        orderList: state.order.orderList,
        deliveryInfo: state.user.deliveryInfo
    }),
    dispatch => ({
        fetchOrderList(args) {
            dispatch(order.fetchOrderList(args))
        }
    })
)(OrderPick)