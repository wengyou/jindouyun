import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Button, Text } from '@tarojs/components'
import { AtList } from 'taro-ui'
import * as user from '../../actions/userInfo';
import './contact.scss'

const Contact = props => {
    const {submitExpress} = props;
    // console.log(props.data.orderStatusText)
    return(
        <View className='contact-container'>
            <View 
                className='contact-server'
                onClick={() => Taro.navigateTo({url: '../../pages/afterSale/afterSale'})}
            >联系客服</View>
            {
                props.data && props.data.orderStatusText === ("已发货" || "已付款" || "未付款") &&
                <View className='wrapper'>
                    <Text>合计：</Text>
                    <Text className='price'>￥{props.data && props.data.actualPrice}</Text>
                    {
                        props.data && props.data.orderStatusText === '未付款' && <View className='confirm'>付款</View> 
                    }
                    {
                        props.data && props.data.orderStatusText === ("已发货" || "已付款") && <View className='confirm'>确认收货</View> 
                    }
                </View> 
            }
            {
                props.parent === 'confirmOrder' &&
                <View className='wrapper'>
                    <Text>合计：</Text>
                    <Text className='price'>￥{(props.data && props.data.actualPrice) ||( props.price)}</Text>
                    <View 
                        className='confirm'
                        onClick={() => {
                            if(props.flag && props.flag === 'express') {
                                submitExpress(props.express)
                            }
                        }}
                    >
                        确认订单
                    </View>
                </View> 
            }
        </View>
    )
}

export default connect(
    state => ({

    }),
    dispatch => ({
        submitExpress(args) {
            dispatch(user.submitExpress(args))
        }
    })
)(Contact)