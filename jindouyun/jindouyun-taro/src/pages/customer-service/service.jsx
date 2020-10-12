import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Button, Text, Image } from '@tarojs/components'
import { AtAvatar, AtIcon } from 'taro-ui';
import * as user from '../../actions/userInfo';
import './service.scss'
import Right from '../../assets/images/right.png'

const CustomerService = props => {
    return(
        <View className='service-container'>
            <View className='flex-wd after-sale' onClick={() => Taro.navigateTo({url: '../afterSale/afterSale'})}>
                <Text className='item'>客服售后</Text>
                <Image className='right' src={Right} />
            </View>
            <View className='flex-wd advice' onClick={() => Taro.navigateTo({url: '../advice/advice'})}>
                <Text className='item'>建议反馈</Text>
                <Image className='right' src={Right} />
            </View>
        </View>
    )
}

export default connect(
    satte => ({

    }),
    dispatch => ({

    })
)(CustomerService)