import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Button, Text, Image, Input, Picker  } from '@tarojs/components'
import { AtList, AtListItem, AtSearchBar, AtTabs, AtTabsPane, AtTextarea  } from 'taro-ui'
import * as user from '../../actions/userInfo';
import './orderTotal.scss'

const OrderTotal = props => {
    return(
        <View className='orderTotal-container'>
            <View style={{marginTop: '2vh'}}>合计：<Text className='total'>{props.data && props.data.actualPrice}</Text> </View>
            <View className='cancel-order order'>联系客服</View>
            <View className='confirm-order order'>{props.parent === 'to-be-paid' ? '确认订单' : '确认收货'}</View>
        </View>
    )
}

export default connect(
    state => ({

    }),
    dispatch => ({

    })
)(OrderTotal);