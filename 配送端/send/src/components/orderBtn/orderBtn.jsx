import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Button, Text, Image } from '@tarojs/components'
import { AtAvatar, AtIcon } from 'taro-ui';
import '../../assets/style/components.scss'

const OrderBtn = props => {
    return(
        <View className='orderBtn_container'>
            <View className='cancel font_wd'>取消订单</View>
            <View className='print font_wd'>打印订单</View>
        </View>
    )
}
export default connect(
    state => ({

    }),
    dispatch => ({

    })
)(OrderBtn)