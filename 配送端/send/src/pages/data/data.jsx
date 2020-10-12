import React, { useState, useEffect } from 'react';
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Button, Text, Image, Picker } from '@tarojs/components'
import {AtList, AtListItem } from 'taro-ui';
import * as common from '../../utils/common';
import * as user from '../../actions/user'
import './data.scss'

const Data = props => {
    const {fetchWorkData, loginFlag, workData} = props;
    const [date, setDate] = useState(common.getNowFormatDate());
    useEffect(() => {
        fetchWorkData(date)
    }, [date])
    console.log(workData)
    return(
        <View className='data_container bgColor'>
            <View className='page-section'>
                <View>
                    <Picker mode='date' onChange={e => setDate(e.detail.value)}>
                        <AtList>
                        <AtListItem title='请选择日期' extraText={date} />
                        </AtList>
                    </Picker>
                </View>
            </View>
            {/* 今日工作 */}
            <View>
                <View className='title'>今日工作</View>
                <View className='white_box flexCol_wd'>
                    <View className='item bottom_line time'>
                        <Text>工作时长：</Text>
                        <Text className='fontSize1 fontColor3'>{JSON.stringify(workData) !== '{}' && workData.todayWorkSumMinute}</Text>
                    </View>
                    <View className='flexCol_wd fontSize2 fontColor1 item'>
                        {
                            JSON.stringify(workData) !== '{}' && workData.todayWorkTimeList.length !== 0 && 
                            workData.todayWorkTimeList.map((item, index) => {
                                return (
                                    <Text key={index}>{item}</Text>
                                )
                            })
                        }
                    </View>
                </View>
                <View className='white_box flexCol_wd topRange'>
                    <View className='item bottom_line time'>
                        <Text>配送单数：</Text>
                        <Text className='fontSize1 fontColor3'>{JSON.stringify(workData) !== '{}' && workData.todayWorkDeliveriesSum}单</Text>
                    </View>
                    <View className='flexCol_wd fontSize2 fontColor1 item'>
                        <Text>商品单数：{JSON.stringify(workData) !== '{}' && workData.todayWorkSumMinute}单</Text>
                        <Text>外卖单数：{JSON.stringify(workData) !== '{}' && workData.todayGoodsDeliveriesSum}单</Text>
                        <Text>快递单数：{JSON.stringify(workData) !== '{}' && workData.todayMenuDeliveriesSum}单</Text>
                    </View>
                </View>
            </View>
            {/* 本月工作 */}
            <View>
                <View className='title'>本月工作</View>
                <View className='white_box flexCol_wd'>
                    <View className='item bottom_line time'>
                        <Text>工作时长：</Text>
                        <Text className='fontSize1 fontColor3'>{JSON.stringify(workData) !== '{}' && workData.monthWorkSumMinute}</Text>
                    </View>
                    <View className='flexCol_wd fontSize2 fontColor1 item'>
                        <Text>单日最长时常：{JSON.stringify(workData) !== '{}' && workData.monthWorkMax}</Text>
                        <Text>单日最短时常：{JSON.stringify(workData) !== '{}' && workData.monthWorkMin}</Text>
                    </View>
                </View>
                <View className='white_box flexCol_wd topRange'>
                    <View className='item bottom_line time'>
                        <Text>配送单数：</Text>
                        <Text className='fontSize1 fontColor3'>{JSON.stringify(workData) !== '{}' && workData.monthWorkDeliveriesSum}单</Text>
                    </View>
                    <View className='flexCol_wd fontSize2 fontColor1 item'>
                        <Text>商品单数：{JSON.stringify(workData) !== '{}' && workData.monthGoodsDeliveriesSum}单</Text>
                        <Text>外卖单数：{JSON.stringify(workData) !== '{}' && workData.monthMenuDeliveriesSum}单</Text>
                        <Text>快递单数：{JSON.stringify(workData) !== '{}' && workData.monthExpressDeliveriesSum}单</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default connect(
    state => ({
        workData: state.user.workData
    }),
    dispatch => ({
        fetchWorkData(args) {
            dispatch(user.fetchWorkData(args))
        }
    })
)(Data)