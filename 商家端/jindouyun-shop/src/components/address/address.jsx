import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Button, Text, Image } from '@tarojs/components'
import { AtAvatar, AtIcon } from 'taro-ui';
import AddressImg from '../../assets/images/address.png'
import '../../assets/style/components.scss'

const Address = props => {
    const {orderDetail} = props
    return(
        <View className='address_container'>
            <Image className='address_icon' src={AddressImg} />
            <View className='address_info'>
                <Text className='name'>{orderDetail.orderSplit && orderDetail.orderSplit.consignee}</Text>
                <View>
                    <Text className='phone'>{orderDetail.orderSplit && orderDetail.orderSplit.mobile}</Text>
                    <Text className='address'>{orderDetail.orderSplit && orderDetail.orderSplit.address}</Text>
                </View>
            </View>
        </View>
    )
}
export default connect(
    state => ({
        orderDetail: state.order.orderDetail
    }),
    dispatch => ({

    })
)(Address)