import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Button, Text, Image } from '@tarojs/components'
import { AtAvatar, AtIcon } from 'taro-ui';
import './storeOperate.scss'
import * as common from '../../utils/common'
import * as user from '../../actions/user'

const StoreOperate = props => {
    const {fetchIncome, fetchTodayData, loginFlag, todayData, income, merchantInfo} = props;
    useEffect(() => {
        loginFlag && fetchIncome(common.getNowFormatDate());
        loginFlag && fetchTodayData()
    }, [loginFlag])
    console.log(todayData)
    return(
        <View className='storeOperate_container flexCol_wd bgColor'>
            <View className='balance white_box'>
                <View className='leftRange'>
                    <Text className='fontSize1'>账户余额：</Text>
                    <Text className='fontSize1 fontColor2'>0</Text>
                    <Text className='fontSize4 fontColor1 leftRange'>元</Text>
                </View> 
                <Text className='right' onClick={() => {Taro.navigateTo({url: '../account/account'})}} >›</Text>
            </View>
            <View className='white_box income'>
                <View className='leftRange'>
                    <Text className='fontSize2'>今日收入：</Text>
                    <Text className='fontSize3 fontColor2'>{todayData.todayTurnover || 0}</Text>
                    <Text className='fontSize4 fontColor1 leftRange'>元</Text>
                </View>
                <View className='leftRange'>
                    <Text className='fontSize2'>今日单量：</Text>
                    <Text className='fontSize3 fontColor2'>{todayData.todayOrder || 0}</Text>
                    <Text className='fontSize4 fontColor1 leftRange'>单</Text>
                </View>
            </View>
            <View className='white_box goods'>
                <Text className='leftRange fontSize1'>商品管理</Text>
                <Text 
                    className='right' 
                    onClick={() => {
                        if(JSON.stringify(merchantInfo) !== '{}' && !merchantInfo.auth) {
                            Taro.showToast({title: '您还未认证~'}) 
                        } else if(!loginFlag) {
                            Taro.showToast({title: '您还未登录~'})
                        } else {
                            Taro.navigateTo({url: '../goodsManage/goodsManage'}) 
                        }
                    }} 
                >
                    ›
                </Text>
            </View>
        </View>
    )
}

export default connect(
    state => ({
        loginFlag: state.user.loginFlag,
        income: state.user.income,
        todayData: state.user.todayData,
        merchantInfo: state.user.merchantInfo
    }),
    dispatch => ({
        fetchTodayData() {
            dispatch(user.fetchTodayData())
        },
        fetchIncome(args) {
            dispatch(user.fetchIncome(args))
        }
    })
)(StoreOperate)